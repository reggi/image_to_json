import path from "https://deno.land/std@0.152.0/node/path.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import { appendJSONFileOrPrint, fileOrDirectoryHandler } from "./main.ts";

const imageOrDirectory = Deno.args[0]
const jsonFile = Deno.args[1]

const images: {[key: string]: { mime: string, data: string }} = {}
await fileOrDirectoryHandler(imageOrDirectory, (fullPath: string) => {
  const [mime, data] = Base64.fromFile(fullPath).toStringWithMime().split(',')
  const fileName = path.basename(fullPath)
  images[fileName] = { mime, data }
})

await appendJSONFileOrPrint(jsonFile, images)