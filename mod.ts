import path from "https://deno.land/std@0.152.0/node/path.ts";

export async function fileOrDirectoryHandler(input: string, handler: (fullPath: string) => void) {
  const entrypoint = path.isAbsolute(input) ? input : path.join(Deno.cwd(), input) 
  const stat = await Deno.stat(entrypoint);
  if (stat.isFile) {
    await handler(entrypoint)
  } else if (stat.isDirectory) {
    for await (const file of Deno.readDir(entrypoint)) {
      const isImage =
        file.name.endsWith('.png') ||
        file.name.endsWith('.jpg') ||
        file.name.endsWith('.jpeg')
      if (file.isFile && isImage) {
        await handler(path.join(Deno.cwd(), input, file.name))
      }
    }
  }
}

export async function getJson(input: string) {
  const entrypoint = path.isAbsolute(input) ? input : path.join(Deno.cwd(), input)
  try {
    return JSON.parse(await Deno.readTextFile(entrypoint));
  } catch (_e) {
    return {}
  }
}

/** gets a json file and appends to it for use with cli tools  */
export async function appendJSONFileOrPrint (input: string, data: any) {
  if (input) {
    const results = await getJson(input)
    await Deno.writeTextFile(input, JSON.stringify({ ...results, ...data }, null, 2))
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
}