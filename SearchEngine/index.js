import weaviate from "weaviate-ts-client";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8383",
});

const schemaRes = await client.schema.getter().do();

console.log(schemaRes);

const schemaConfig = {
  class: "Meme",
  vectorizer: "img2vec-neural",
  vectorIndexType: "hnsw",
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};

//await client.schema.classCreator().withClass(schemaConfig).do();

import fs, { read, readFile, readFileSync, writeFileSync } from "fs";
import path from "path";

const saveImage = async (file) => {
  const directoryPath = "./memes/memes";
  const filePath = path.join(directoryPath, file);
  const img = readFileSync(filePath);
  const b64 = Buffer.from(img).toString("base64");

  await client.data
    .creator()
    .withClassName("Meme")
    .withProperties({
      image: b64,
      text: file,
    })
    .do();
};

const addMemes = async () => {
  const directoryPath = "./memes/memes";
  const files = fs.readdirSync(directoryPath);
  let i = 0;
  for (const file of files) {
    console.log(`${i++}/${files.length} ${file}`);
    if (file.endsWith(".mp4") || file.endsWith(".svg")) {
      continue;
    }
    await saveImage(file);
  }
};

//await addMemes();

const test = Buffer.from(readFileSync("./test2.jpg")).toString("base64");
//console.log(test);
const resImage = await client.graphql
  .get()
  .withClassName("Meme")
  .withFields(["image"])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

const result = resImage.data.Get.Meme[0].image;
//console.log(result);
writeFileSync("./result.jpg", result, "base64");
