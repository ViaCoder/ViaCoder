"""Local C, Windows-MCP 0.8.7 extension in its SAME FastMCP process.

No network, install, model, PowerShell action, second Desktop or MCP server.
Original input.register supplies the live get_desktop accessor. Ordinary
upstream tools remain registered for clients that don't speak this protocol.
"""
import hashlib
import importlib.metadata
import importlib
import inspect
import json
import runpy
import sys

PROTOCOL = "cclaude-cu-executor/1"
PIN = {
    "windows_mcp.tools.input": "feb2a360b543690fd40be7e5c68fcfd87a0ac42dce46ee2b38abf48c54120480",
    "windows_mcp.desktop.service": "0f5f82e1cb93244a9495141f176fe0b5b4789dfe076a63e1853e626cfc3d452c",
}
METHODS = ["apps", "displays", "foreground", "underPoint", "cursor", "capture",
           "zoom", "click", "move", "drag", "scroll", "key", "type",
           "readClipboard", "writeClipboard", "openApp", "holdKey", "mouseDown", "mouseUp", "releaseInput"]


def register_bridge(mcp, get_desktop):
    # Imports are native-host-only, after platform/version/source verification.
    import os
    import hmac
    import io
    import base64
    import asyncio
    import math
    from contextlib import asynccontextmanager
    from pathlib import Path
    import anyio
    import win32gui
    import win32process
    import win32clipboard
    import win32con
    import win32security
    import win32api
    from psutil import Process
    from windows_mcp.desktop.service import _escape_text_for_sendkeys
    from windows_mcp.tools.app import _launch_executable, _resolve_executable
    import windows_mcp.uia as uia
    from PIL import Image

    # Only native resources are tracked here. Original Mac H/Y and the caller's
    # live grants remain their existing owners; no Python permission cache.
    held_keys = []
    mouse_held = False

    def caller_capability(host_token):
        token = os.environ.get("CCLAUDE_CU_HOST_TOKEN")
        if not token or not host_token or not hmac.compare_digest(token, host_token):
            raise PermissionError("Computer use executor requires the connected caller capability")

    def release_keys():
        failures = []
        for key in reversed(held_keys[:]):
            try:
                uia.ReleaseKey(key, waitTime=0)
                held_keys.remove(key)
            except BaseException as error:
                failures.append(error)
        if failures:
            raise failures[0]

    def release_input():
        nonlocal mouse_held
        try:
            if mouse_held:
                uia.ReleaseMouse(waitTime=0)
                mouse_held = False
        finally:
            release_keys()

    # Compose with the SAME original main lifespan, before it starts. Original
    # Desktop/watchdog/analytics initialization and finally stay unchanged.
    original_lifespan = mcp._lifespan
    @asynccontextmanager
    async def lifespan(server):
        async with original_lifespan(server) as state:
            try:
                yield state
            finally:
                release_input()
    mcp._lifespan = lifespan

    def app(hwnd):
        if not hwnd:
            return None
        _, pid = win32process.GetWindowThreadProcessId(hwnd)
        if not pid:
            return None
        executable = os.path.normcase(os.path.realpath(Process(pid).exe()))
        return {"bundleId": executable, "displayName": os.path.basename(executable)}

    def foreground():
        return app(win32gui.GetForegroundWindow())

    def under_point(x, y):
        hwnd = win32gui.WindowFromPoint((int(x), int(y)))
        return app(win32gui.GetAncestor(hwnd, 2) or hwnd)

    def integrity(pid):
        handle = win32api.OpenProcess(win32con.PROCESS_QUERY_LIMITED_INFORMATION, False, pid)
        try:
            token = win32security.OpenProcessToken(handle, win32con.TOKEN_QUERY)
            try:
                sid, _ = win32security.GetTokenInformation(token, win32security.TokenIntegrityLevel)
                return sid.GetSubAuthority(sid.GetSubAuthorityCount() - 1)
            finally:
                token.Close()
        finally:
            handle.Close()

    def check_target(target, allowed):
        if target is None or target["bundleId"] not in allowed:
            raise PermissionError("Computer use target is not in the approved application allowlist")
        return target

    def check_foreground(allowed):
        target = check_target(foreground(), allowed)
        _, pid = win32process.GetWindowThreadProcessId(win32gui.GetForegroundWindow())
        if integrity(pid) > integrity(os.getpid()):
            raise PermissionError("Windows UIPI: target has higher integrity; handle it manually")
        return target

    def displays(desktop):
        return [{"displayId": d.index, "name": d.device_name, "isPrimary": d.primary,
                 "width": d.rect.right - d.rect.left, "height": d.rect.bottom - d.rect.top,
                 # Physical-pixel contract, not a fabricated logical DPI scale.
                 "scaleFactor": 1, "originX": d.rect.left, "originY": d.rect.top}
                for d in desktop.get_displays()]

    def clipboard_read():
        win32clipboard.OpenClipboard()
        try:
            return win32clipboard.GetClipboardData(win32clipboard.CF_UNICODETEXT) \
                if win32clipboard.IsClipboardFormatAvailable(win32clipboard.CF_UNICODETEXT) else ""
        finally:
            win32clipboard.CloseClipboard()

    def computer_host_sync(method: str, args: dict | None = None,
                      allowedApps: list[str] | None = None, grantFlags: dict | None = None,
                      hostToken: str | None = None) -> str:
        desktop = get_desktop()
        args, allowed, flags = args or {}, set(allowedApps or []), grantFlags or {}
        if method == "describe":
            return json.dumps({"protocol": PROTOCOL, "platform": "win32", "upstream": "CursorTouch/Windows-MCP",
                               "version": "0.8.7", "ready": bool(displays(desktop)) and foreground() is not None,
                               "screenshotFiltering": "none", "appIndexIncomplete": True, "methods": METHODS})
        caller_capability(hostToken)
        if method == "apps":
            # PID -> executable identity. Titles/HWNDs are never app grants.
            unique = {}
            windows, _ = desktop.get_windows()
            for window in windows:
                identity = app(window.handle)
                if identity:
                    unique[identity["bundleId"]] = identity
            # Recover the complete mature Start Menu resolver, but only expose
            # real absolute .exe targets. AppIDs/.lnk are NOT executable grants.
            for label, target in desktop.get_apps_from_start_menu().items():
                if os.path.isabs(target) and target.lower().endswith(".exe") and os.path.isfile(target):
                    executable = os.path.normcase(os.path.realpath(target))
                    unique.setdefault(executable, {"bundleId": executable, "displayName": label})
            return json.dumps(list(unique.values()))
        if method == "displays":
            return json.dumps(displays(desktop))
        if method == "foreground":
            return json.dumps(foreground())
        if method == "underPoint":
            return json.dumps(under_point(args["x"], args["y"]))
        if method == "cursor":
            x, y = desktop.get_cursor_location()
            return json.dumps({"x": x, "y": y})
        if method in ("readClipboard", "writeClipboard"):
            if flags.get("clipboardRead" if method == "readClipboard" else "clipboardWrite") is not True:
                raise PermissionError("Computer use clipboard grant is required")
            if method == "readClipboard":
                return json.dumps(clipboard_read())
            win32clipboard.OpenClipboard()
            try:
                win32clipboard.EmptyClipboard()
                win32clipboard.SetClipboardText(args["text"], win32clipboard.CF_UNICODETEXT)
            finally:
                win32clipboard.CloseClipboard()
            return json.dumps(None)
        if method in ("capture", "zoom"):
            if not allowed:
                raise PermissionError("Computer use screenshot requires an application grant")
            available = displays(desktop)
            display = next((d for d in available if d["displayId"] == args.get("displayId")), None) \
                if args.get("displayId") is not None else next((d for d in available if d["isPrimary"]), None)
            if display is None:
                raise ValueError("Requested display is unavailable")
            region = None
            if method == "zoom":
                r = args["region"]
                # The shared executor maps original display-local sr region
                # to virtual-desktop pixels once. Do not add display origin
                # again here (negative-origin secondary monitors included).
                region = [round(r["x"]), round(r["y"]),
                          round(r["x"] + r["w"]), round(r["y"] + r["h"])]
            state = desktop.get_state(use_vision=True, use_ui_tree=False, use_annotation=False,
                                      as_bytes=True, scale=1.0, display_indices=[display["displayId"]], region=region)
            raw = state.screenshot
            if raw is None:
                raise RuntimeError("Windows-MCP returned no screenshot")
            image = Image.open(io.BytesIO(raw)) if isinstance(raw, bytes) else raw
            stream = io.BytesIO()
            image.convert("RGB").save(stream, format="JPEG", quality=85)
            original = state.screenshot_original_size
            if original is None:
                raise RuntimeError("Windows-MCP returned no capture coordinate dimensions")
            return json.dumps({"base64": base64.b64encode(stream.getvalue()).decode("ascii"),
                               "width": image.width, "height": image.height,
                               "displayWidth": display["width"], "displayHeight": display["height"],
                               "displayId": display["displayId"], "originX": display["originX"], "originY": display["originY"]})
        # Same approved identities are checked immediately before native input.
        # Do not keep a second permission/session owner in the Python host.
        approved = check_foreground(allowed)
        if method in ("click", "move", "scroll"):
            check_target(under_point(args["x"], args["y"]), allowed)
        if method == "click":
            desktop.click((round(args["x"]), round(args["y"])), args["button"], args["clicks"])
        elif method == "move":
            desktop.move((round(args["x"]), round(args["y"])))
        elif method == "drag":
            start, end = args.get("start"), args["end"]
            if start is None:
                x, y = desktop.get_cursor_location()
                start = {"x": x, "y": y}
            check_target(under_point(start["x"], start["y"]), allowed)
            check_target(under_point(end["x"], end["y"]), allowed)
            desktop.drag([round(end["x"]), round(end["y"])], from_loc=[round(start["x"]), round(start["y"])])
        elif method == "scroll":
            if args["dy"]:
                desktop.scroll((round(args["x"]), round(args["y"])), "vertical", "down" if args["dy"] > 0 else "up", abs(args["dy"]))
            if args["dx"]:
                desktop.scroll((round(args["x"]), round(args["y"])), "horizontal", "right" if args["dx"] > 0 else "left", abs(args["dx"]))
        elif method == "type":
            # Unlike original Type this neither clicks/refocuses nor silently
            # pastes long text through an unapproved clipboard.
            if foreground() != approved:
                raise PermissionError("Keyboard focus changed before delivery")
            uia.SendKeys(_escape_text_for_sendkeys(args["text"]), interval=0.04, waitTime=0.05)
        elif method == "key":
            key = {"return": "Enter", "super": "Win", "command": "Win"}
            chord = "+".join(key.get(k.lower(), k) for k in args["text"].split("+"))
            for _ in range(args.get("repeat", 1)):
                if foreground() != approved:
                    raise PermissionError("Keyboard focus changed before delivery")
                desktop.shortcut(chord)
        else:
            raise ValueError("Computer use host capability is unavailable: " + method)
        return json.dumps(None)

    @mcp.tool(name="CClaudeCUHost", description="CClaude platform executor protocol; metadata and explicitly granted actions.")
    async def computer_host(method: str, args: dict | None = None,
                            allowedApps: list[str] | None = None, grantFlags: dict | None = None,
                            hostToken: str | None = None) -> str:
        nonlocal mouse_held
        if method not in ("openApp", "holdKey", "mouseDown", "mouseUp", "releaseInput"):
            # Same synchronous upstream Desktop calls, same FastMCP worker
            # mechanism; the new cancel-aware holds run on its actual loop.
            return await anyio.to_thread.run_sync(computer_host_sync, method, args, allowedApps, grantFlags, hostToken)
        caller_capability(hostToken)
        args, allowed = args or {}, set(allowedApps or [])
        if method == "releaseInput":
            release_input()
            return json.dumps(None)
        if method == "mouseUp":
            if mouse_held:
                uia.ReleaseMouse(waitTime=0)
                mouse_held = False
            return json.dumps(None)
        desktop = get_desktop()
        if method == "openApp":
            target = args.get("app")
            if not isinstance(target, str) or target not in allowed or not os.path.isabs(target) or not target.lower().endswith(".exe"):
                raise PermissionError("Application must be an approved canonical executable")
            resolved = os.path.normcase(str(_resolve_executable(target)))
            if resolved != target:
                raise PermissionError("Executable identity changed before launch")
            def target_window():
                windows, _ = desktop.get_windows()
                return next((w for w in windows if app(w.handle) == {"bundleId": target, "displayName": os.path.basename(target)}), None)
            window = target_window()
            if window is None:
                # Exact original separated-argv launcher. No AppID/fuzzy
                # substitution, shell command, or new platform driver.
                _launch_executable(target, [], None)
                deadline = asyncio.get_running_loop().time() + 10
                while window is None:
                    if asyncio.get_running_loop().time() >= deadline:
                        raise RuntimeError("Launched executable did not expose a matching window")
                    await asyncio.sleep(.05)
                    window = target_window()
            # Check identity/UIPI before the mature original activation call.
            _, pid = win32process.GetWindowThreadProcessId(window.handle)
            if integrity(pid) > integrity(os.getpid()):
                raise PermissionError("Windows UIPI: target has higher integrity; handle it manually")
            if os.path.normcase(str(_resolve_executable(target))) != target:
                raise PermissionError("Executable identity changed before activation")
            desktop.bring_window_to_top(window.handle)
            deadline = asyncio.get_running_loop().time() + 1
            while foreground() is None or foreground()["bundleId"] != target:
                if asyncio.get_running_loop().time() >= deadline:
                    raise RuntimeError("Windows did not activate the approved executable")
                await asyncio.sleep(.01)
            check_foreground(allowed)
            return json.dumps(None)
        approved = check_foreground(allowed)
        if method == "mouseDown":
            if mouse_held:
                raise RuntimeError("Mouse button already held")
            x, y = desktop.get_cursor_location()
            check_target(under_point(x, y), allowed)
            # Record before pressing so partial native failures still release.
            mouse_held = True
            try:
                uia.PressMouse(x, y, waitTime=0)
            except BaseException:
                release_input()
                raise
            return json.dumps(None)
        keys, duration = args.get("keys"), args.get("durationMs")
        if not isinstance(keys, list) or not keys or not all(isinstance(k, str) for k in keys):
            raise ValueError("Hold requires a nonempty key chord")
        if isinstance(duration, bool) or not isinstance(duration, (int, float)) or not math.isfinite(duration) or duration < 0 or duration > 100000:
            raise ValueError("Hold duration must be finite milliseconds in 0..100000")
        # The pinned UIA's original special-name/VK table, not a second key
        # parser/driver. Ordinary printable keys use their native VK code.
        aliases = {"return": "ENTER", "super": "WIN", "command": "WIN", "cmd": "WIN", "control": "CTRL", "space": "SPACE"}
        names = uia.SpecialKeyNames
        resolved_keys = []
        for key in keys:
            name = aliases.get(key.lower(), key.upper())
            code = names.get(name)
            if code is None and len(key) == 1 and key.isascii() and key.isalnum():
                code = ord(key.upper())
            if code is None:
                raise ValueError("Unsupported native hold key: " + key)
            if code not in resolved_keys:
                resolved_keys.append(code)
        if held_keys:
            raise RuntimeError("A key chord is already held")
        try:
            for code in resolved_keys:
                if foreground() != approved:
                    raise PermissionError("Keyboard focus changed before hold delivery")
                held_keys.append(code)
                uia.PressKey(code, waitTime=0)
            deadline = asyncio.get_running_loop().time() + duration / 1000
            while asyncio.get_running_loop().time() < deadline:
                if foreground() != approved:
                    raise PermissionError("Keyboard focus changed during key hold")
                await asyncio.sleep(min(.01, max(0, deadline - asyncio.get_running_loop().time())))
        finally:
            release_keys()
        return json.dumps(None)


def main():
    if sys.platform != "win32":
        raise RuntimeError("Windows-MCP bridge requires an actual Windows host")
    if sys.version_info < (3, 14):
        raise RuntimeError("Windows-MCP 0.8.7 requires Python >= 3.14")
    from pathlib import Path
    # Use the complete unchanged fixed-commit package, including its real
    # __main__/register_all/lifespan and native transitive modules. The
    # discovered interpreter supplies dependencies; it is not a second host.
    upstream = Path(__file__).resolve().parent / "upstream"
    manifest = json.loads((upstream / "source-manifest.json").read_text(encoding="utf-8"))
    if manifest["commit"] != "6885dc1fc44b4fbe591d0c2a656e5b8face6901c":
        raise RuntimeError("Windows-MCP complete source commit mismatch")
    for item in manifest["files"]:
        if hashlib.sha256((upstream / item["path"]).read_bytes()).hexdigest() != item["sha256"]:
            raise RuntimeError("Windows-MCP complete source pin mismatch: " + item["path"])
    source_path = str(upstream / "src")
    sys.path.insert(0, source_path)
    try:
        _run_upstream()
    finally:
        sys.path.remove(source_path)


def _run_upstream():
    from pathlib import Path
    if importlib.metadata.version("windows-mcp") != "0.8.7":
        raise RuntimeError("Windows-MCP bridge requires pinned version 0.8.7")
    from packaging.version import Version
    if Version(importlib.metadata.version("dxcam")) < Version("0.3.0"):
        raise RuntimeError("Windows-MCP bridge requires dxcam >= 0.3.0")
    for name, expected in PIN.items():
        module = importlib.import_module(name)
        if hashlib.sha256(Path(inspect.getsourcefile(module)).read_bytes()).hexdigest() != expected:
            raise RuntimeError("Windows-MCP source pin mismatch: " + name)
    from windows_mcp.tools import input as input_tools
    original = input_tools.register

    def register(mcp, *, get_desktop, get_analytics):
        original(mcp, get_desktop=get_desktop, get_analytics=get_analytics)
        register_bridge(mcp, get_desktop)

    input_tools.register = register
    try:
        # Existing upstream __main__ owns FastMCP, lifespan, cancellation,
        # cleanup, its one Desktop and stdio transport. No second actor here.
        runpy.run_module("windows_mcp", run_name="__main__")
    finally:
        # A failed startup/cancelled dispatcher must not leave a registration
        # wrapper attached to a later lifecycle in the same interpreter.
        input_tools.register = original


if __name__ == "__main__":
    main()
