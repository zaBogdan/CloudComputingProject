import weaviate from "weaviate-ts-client";
import express from "express";
import bodyParser from "body-parser";
import formData from "express-form-data";
import { readFileSync } from "fs";
console.log(process.env.WEAVIATE_HOST);
const client = weaviate.client({
  scheme: "http",
  host: process.env.WEAVIATE_HOST || "localhost:8080",
});

const schemaRes = await client.schema.getter().do();

console.log(schemaRes);

// web server
const app = express();
const port = 9200;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formData.parse());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/meme", async (req, res) => {
  //read file from form-data named image
  const imgPath = req.files.image.path;
  const image = readFileSync(imgPath);
  const b64 = Buffer.from(image).toString("base64");
  const resImage = await client.graphql
    .get()
    .withClassName("Meme")
    .withFields(["image"])
    .withNearImage({ image: b64 })
    .withLimit(1)
    .do();

  const result = resImage.data.Get.Meme[0].image;
  //transform base64 to image
  const img = Buffer.from(result, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": img.length,
    "Content-Disposition": "attachment; filename=download.png",
  });

  res.end(img);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
