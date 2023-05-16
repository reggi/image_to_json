# image-to-json

> 🎆🔐 Convert an image (or folder of images) into a json file uses base64 

It is nice to be able to easily save a JSON file and use the Deno module import to add images to a static site without hosting or uploading the images themselves. I am not sure how I feel about hosting very large images like this and serving them through the page. I have only tested it with small thumbnail and profile images. I have been using GitHub Gist to host JSON files and then including them into projects using Deno Deploy. All you need to do is use an `<img>` tag and set the `src` to the base64 string in the JSON file.

```bash
deno run --allow-read --allow-write ./bin.ts <imageOrDirectory> [<jsonFile>]
```

Script is available `https://raw.githubusercontent.com/reggi/image-to-json/main/cmd.ts`.
Requires `--allow-read --allow-write`.

```bash
deno run --allow-read --allow-write https://raw.githubusercontent.com/reggi/image-to-json/main/cmd.ts /Users/thomasreggi/Desktop/download.jpg data.json
```