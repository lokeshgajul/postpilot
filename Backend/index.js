import express from "express";
import cors from "cors";
import { getPrompt } from "./Controller/PostController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getPrompt", getPrompt);

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
