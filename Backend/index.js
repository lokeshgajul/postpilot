import express from "express";
import cors from "cors";
import {
  generateImage,
  getPrompt,
  savePost,
} from "./Controller/PostController.js";
import DbConnect from "./Db/Db.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
const app = express();
dotenv.config();

(async function () {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
DbConnect();

app.post("/getPrompt", getPrompt);

app.post("/generate-image", generateImage);

app.post("/uploadPost", savePost);

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
