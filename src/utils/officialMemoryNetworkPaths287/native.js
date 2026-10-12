// Generated facade: one original filesystem/network runtime owns both consumers.
import {filesystemPathRuntime287} from "../filesystemPathRuntime287.js";
import {createFilesystemPathRuntime287} from "../officialFilesystemPaths287/native.js";
import * as path from "node:path";
import * as fs from "node:fs";
import * as os from "node:os";
export function createNetworkPathRuntime287(){return createFilesystemPathRuntime287(`${process.platform}-${process.arch}`,{path,fs,os});}
export const isNetworkReference287=filesystemPathRuntime287.isNetworkReference;
