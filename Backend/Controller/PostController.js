/* eslint-disable no-undef */
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import PostModel from "../schema/Post.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Buffer } from "buffer";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const invokeUrl =
  "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl";

const apikey = process.env.nvidia_Image;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export const getPrompt = async (req, res) => {
  const { prompt } = req.body;
  try {
    const input = prompt;
    const result = await model.generateContent(input);
    const responseText = result.response.text();

    let formattedText = responseText
      .replace(/\n/g, "<br>") // Convert new lines to HTML line breaks
      .replace(/•/g, "<li>") // Convert bullet points
      .replace(/(\d+\.)/g, "<br><strong>$1</strong>") // Bold numbers in ordered lists
      .replace(/\n\n/g, "<br><br>"); // Ensure paragraph breaks

    res.status(200).json({ message: formattedText });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating content" });
  }
};

export const savePost = async (req, res) => {
  try {
    const { prompt, text } = req.body;

    const newPost = new PostModel({ prompt, text });
    const savePost = await newPost.save();
    res.status(200).json({ messge: "saved successfully", response: savePost });
    // console.log("Post saved", savePost);
  } catch (error) {
    console.log(error);
  }
};

export const generateImage = async (req, res) => {
  const { text_prompts, cfg_scale, sampler, seed, steps } = req.body;
  try {
    if (!text_prompts || !text_prompts[0]?.text) {
      return res
        .status(400)
        .json({ error: "text_prompts with valid text is required." });
    }

    const Payloadbody = {
      text_prompts,
      cfg_scale,
      sampler,
      seed,
      steps,
    };
    const response = await axios.post(invokeUrl, Payloadbody, {
      headers: {
        Authorization: `Bearer ${apikey}`,
        Accept: "application/json",
      },
    });
    const base64Data = await response.data.artifacts[0].base64;
    const filename = `generated_image_${Date.now()}.jpg`;
    const filePath = path.join(uploadDir, filename);
    saveImage(base64Data, filePath);

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64Data}`,
      {
        folder: "postpilot",
      }
    );

    res.status(200).json({
      message: "File uploaded successfully to Cloudinary",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Error occurred:", error?.response?.data || error.message);
    res
      .status(500)
      .json({ error: error?.response?.data || "An unknown error occurred" });
  }
};

const saveImage = (base64Data, filename = "generated_image.jpg") => {
  try {
    const cleanedBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");

    const imageBuffer = Buffer.from(cleanedBase64, "base64");

    // Save Image to File
    fs.writeFile(filename, imageBuffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
      } else {
        console.log(`Image saved successfully as ${filename}`);
      }
    });
  } catch (error) {
    console.error("Error converting base64 to image:", error);
  }
};
