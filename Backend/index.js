import express from "express";
import cors from "cors";
import { generateImage, getPrompt } from "./Controller/PostController.js";
import axios from "axios";

const app = express();
const invokeUrl =
  "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl";

const apikey =
  "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";

app.use(cors());
app.use(express.json());

app.post("/getPrompt", getPrompt);
// app.post("/generateImage", generateImage);

app.post("/generate-image", async (req, res) => {
  try {
    const repsonse = await axios.post(invokeUrl, req.body, {
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: "application/json",
      },
    });
    res.json(repsonse.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
