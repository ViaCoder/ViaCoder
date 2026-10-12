#!/usr/bin/env python3
"""Extract exact Bun module bytes from an official Mach-O/ELF/PE executable.

No strings scanning, execution, renaming, or rewriting of the input. The output
manifest is the bridge between original offsets and separate analysis views.
"""
import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import struct

TRAILER = b"\n---- Bun! ----\n"


def u32(data, offset):
    region(data, offset, 4)
    return struct.unpack_from("<I", data, offset)[0]


def u64(data, offset):
    region(data, offset, 8)
    return struct.unpack_from("<Q", data, offset)[0]


def region(data, offset, size):
    if offset < 0 or size < 0 or offset + size > len(data):
        raise ValueError(f"Out-of-bounds region: {offset}+{size}/{len(data)}")
    return data[offset:offset + size]


def bun_section(data):
    if data[:4] == b"\xcf\xfa\xed\xfe":  # little-endian 64-bit Mach-O
        region(data, 0, 32)
        pos = 32
        command_count = u32(data, 16)
        found = []
        for _ in range(command_count):
            region(data, pos, 8)
            command, size = struct.unpack_from("<II", data, pos)
            region(data, pos, size)
            if size < 8:
                raise ValueError("Invalid Mach-O load command")
            if command == 0x19:
                if size < 72:
                    raise ValueError("Truncated Mach-O 64-bit segment command")
                count = u32(data, pos + 64)
                if count > (size - 72) // 80:
                    raise ValueError("Mach-O section table exceeds load command")
                for i in range(count):
                    sec = pos + 72 + i * 80
                    if (data[sec:sec + 16].rstrip(b"\0") == b"__bun"
                            and data[sec + 16:sec + 32].rstrip(b"\0") == b"__BUN"):
                        found.append((u32(data, sec + 48), u64(data, sec + 40)))
            pos += size
        if pos > len(data):
            raise ValueError("Mach-O load commands exceed file")
        if len(found) > 1:
            raise ValueError("Multiple Bun sections found")
        if found:
            return found[0]
    elif data[:6] == b"\x7fELF\x02\x01":
        region(data, 0, 64)
        table, width, count, names_id = u64(data, 40), *struct.unpack_from("<HHH", data, 58)
        if width != 64 or count == 0 or names_id >= count:
            raise ValueError("Unsupported ELF64 section header table")
        region(data, table, width * count)
        names_header = table + names_id * width
        names = region(data, u64(data, names_header + 24), u64(data, names_header + 32))
        found = []
        for i in range(count):
            sec = table + i * width
            name_offset = u32(data, sec)
            if name_offset >= len(names):
                raise ValueError("ELF section name offset out of bounds")
            name = names[name_offset:].split(b"\0", 1)[0]
            if name == b".bun":
                found.append((u64(data, sec + 24), u64(data, sec + 32)))
        if len(found) > 1:
            raise ValueError("Multiple Bun sections found")
        if found:
            return found[0]
    elif data[:2] == b"MZ":
        return pe_bun_section(data)
    else:
        raise ValueError("Expected a thin 64-bit little-endian Mach-O, ELF, or PE32+ executable")
    raise ValueError("Bun section not found")


def pe_bun_section(data):
    """Return the raw file range of the single Bun section in a PE32+ image."""
    pe_machine(data)
    pe_offset = u32(data, 0x3C)
    region(data, pe_offset, 24)
    section_count = struct.unpack_from("<H", data, pe_offset + 6)[0]
    if not 1 <= section_count <= 96:
        raise ValueError("Invalid PE section count")
    optional_size = struct.unpack_from("<H", data, pe_offset + 20)[0]
    optional = pe_offset + 24
    if optional_size < 112:
        raise ValueError("Truncated PE32+ optional header")
    region(data, optional, optional_size)
    if struct.unpack_from("<H", data, optional)[0] != 0x20B:
        raise ValueError("Expected a PE32+ optional header")
    size_of_image, size_of_headers = struct.unpack_from("<II", data, optional + 56)
    if size_of_image == 0 or size_of_headers == 0 or size_of_headers > len(data):
        raise ValueError("Invalid PE image/header size")

    section_table = optional + optional_size
    section_table_size = section_count * 40
    region(data, section_table, section_table_size)
    if section_table + section_table_size > size_of_headers:
        raise ValueError("PE section table exceeds SizeOfHeaders")

    found = []
    for index in range(section_count):
        header = section_table + index * 40
        name_field = region(data, header, 8)
        name = name_field.split(b"\0", 1)[0]
        virtual_size, virtual_address, raw_size, raw_offset = struct.unpack_from("<IIII", data, header + 8)
        if raw_size:
            if raw_offset < size_of_headers:
                raise ValueError("PE section data overlaps headers")
            region(data, raw_offset, raw_size)
        if name == b".bun":
            if not virtual_size or not virtual_address or not raw_size:
                raise ValueError("Empty PE Bun section")
            found.append((raw_offset, raw_size))
    if len(found) > 1:
        raise ValueError("Multiple PE Bun sections found")
    if not found:
        raise ValueError("Bun section not found")
    return found[0]


def pe_machine(data):
    """Read and validate the PE COFF machine field without executing the image."""
    region(data, 0, 0x40)
    if data[:2] != b"MZ":
        raise ValueError("Invalid PE DOS signature")
    pe_offset = u32(data, 0x3C)
    if pe_offset < 0x40:
        raise ValueError("Invalid PE header offset")
    region(data, pe_offset, 6)
    if data[pe_offset:pe_offset + 4] != b"PE\0\0":
        raise ValueError("Invalid PE signature")
    machine = struct.unpack_from("<H", data, pe_offset + 4)[0]
    if machine not in (0x8664, 0xAA64):
        raise ValueError(f"Unsupported PE machine: 0x{machine:04x}")
    return machine


def modules_from_binary(data):
    section_offset, section_size = bun_section(data)
    section = region(data, section_offset, section_size)
    if len(section) < 8:
        raise ValueError("Truncated Bun section header")
    payload = region(section, 8, u64(section, 0))
    if not payload.endswith(TRAILER):
        raise ValueError("Bun trailer mismatch")
    footer = len(payload) - len(TRAILER) - 32
    if footer < 0:
        raise ValueError("Truncated Bun module footer")
    table, size, entry = struct.unpack_from("<III", region(payload, footer + 8, 12))
    if size % 52:
        raise ValueError("Unsupported Bun module record size")
    if table > footer or size > footer - table:
        raise ValueError("Bun module table overlaps footer or exceeds payload")
    table_end = table + size
    region(payload, table, size)
    records = []
    for index in range(size // 52):
        pos = table + index * 52
        name_off, name_len, content_off, content_len = struct.unpack_from("<IIII", payload, pos)
        for offset, length, label in ((name_off, name_len, "name"), (content_off, content_len, "content")):
            if offset > footer or length > footer - offset:
                raise ValueError(f"Bun module {label} exceeds payload footer")
            if length and offset < table_end and table < offset + length:
                raise ValueError(f"Bun module {label} overlaps module table")
        raw_name = region(payload, name_off, name_len).rstrip(b"\0")
        if not raw_name or b"\0" in raw_name:
            raise ValueError("Invalid Bun module name")
        try:
            name = raw_name.decode("utf-8")
        except UnicodeDecodeError as error:
            raise ValueError("Bun module name is not UTF-8") from error
        if name.startswith("/$bunfs/root/"):
            relative_name = name[len("/$bunfs/root/"):]
        elif name.startswith("B:/~BUN/root/"):
            relative_name = name[len("B:/~BUN/root/"):]
        else:
            relative_name = name
        if (not relative_name or "\\" in relative_name or ":" in relative_name
                or any(ord(char) < 32 or ord(char) == 127 for char in relative_name)):
            raise ValueError(f"Unexpected module path: {name!r}")
        parts = relative_name.split("/")
        relative = PurePosixPath(relative_name)
        if (relative.is_absolute() or any(part in ("", ".", "..") for part in parts)
                or not relative.parts or relative.as_posix() != relative_name):
            raise ValueError(f"Unexpected module path: {name!r}")
        content = region(payload, content_off, content_len)
        records.append({
            "index": index, "name": name, "path": str(relative),
            "encoding": payload[pos + 48],
            "loader": payload[pos + 49], "offset": section_offset + 8 + content_off,
            "length": content_len, "sha256": hashlib.sha256(content).hexdigest(),
        })
    if not 0 <= entry < len(records):
        raise ValueError("Invalid entry point")
    if len({r["path"] for r in records}) != len(records):
        raise ValueError("Duplicate module output paths")
    return records, entry


def extract(binary, output, platform, version):
    data = binary.read_bytes()
    if data[:2] == b"MZ":
        expected_machine = {"win32-x64": 0x8664, "win32-arm64": 0xAA64}.get(platform)
        if expected_machine is None or pe_machine(data) != expected_machine:
            raise ValueError(f"PE machine does not match platform {platform}")
    elif platform in ("win32-x64", "win32-arm64"):
        raise ValueError(f"Expected PE input for platform {platform}")
    records, entry = modules_from_binary(data)
    # Refuse an existing destination: no stale chunks or accidental overwrites.
    output.mkdir(parents=True, exist_ok=False)
    for r in records:
        target = output / "raw" / r["path"]
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(region(data, r["offset"], r["length"]))
    manifest = {
        "schemaVersion": 1, "version": version, "platform": platform,
        "binarySha256": hashlib.sha256(data).hexdigest(),
        "entryPoint": records[entry]["path"], "modules": records,
    }
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    return manifest


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("binary", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--platform", required=True, choices=["darwin-arm64", "darwin-x64", "linux-arm64", "linux-x64", "win32-arm64", "win32-x64"])
    parser.add_argument("--version", default="2.1.283")
    args = parser.parse_args()
    result = extract(args.binary, args.output, args.platform, args.version)
    print(json.dumps({"platform": args.platform, "modules": len(result["modules"]), "entryPoint": result["entryPoint"]}))
