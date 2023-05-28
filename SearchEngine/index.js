import weaviate from "weaviate-ts-client";
import express from "express";
import bodyParser from "body-parser";
import formData from "express-form-data";
import { readFileSync } from "fs";
import request from "request";
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

app.get("/meme", async (req, res) => {
  const imageURL = req.query.image;
  const image = await new Promise((resolve, reject) => {
    request(
      {
        url: imageURL,
        encoding: null,
      },
      (err, res, body) => {
        if (err) reject(err);
        else resolve(body);
      }
    );
  });

  const b64 = Buffer.from(image).toString("base64");
  const resImage = await client.graphql
    .get()
    .withClassName("Meme")
    .withFields(["image", "text"])
    .withNearImage({ image: b64 })
    .withLimit(1)
    .do();

  const result = resImage.data.Get.Meme[0].text;
  const response = {
    id: result,
    image_url: `https://storage.googleapis.com/memes_bucket_1/${encodeURIComponent(
      result
    )}`,
  };
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
