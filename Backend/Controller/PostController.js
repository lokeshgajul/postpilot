import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import FormData from "form-data";

const genAI = new GoogleGenerativeAI("AIzaSyBDwnmh0jTwKk1gUyYOYncvgC-BOOz4IKk");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const stability_api_key = "sk-0w88ComiG6Sf8XzBgW187LT8DI8xYRIXXFYkNRTpjyl6YBPT";

export const getPrompt = async (req, res) => {
  const { prompt } = req.body;
  try {
    // const prompt =
    //   "Explain how AI works. Provide the answer in well-structured points and paragraphs and bold the points";
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

// response = requests.post(
//   f"https://api.stability.ai/v2beta/stable-image/generate/core",
//   headers={
//       "authorization": f"Bearer sk-MYAPIKEY",
//       "accept": "image/*"
//   },
//   files={"none": ''},
//   data={
//       "prompt": "Lighthouse on a cliff overlooking the ocean",
//       "output_format": "webp",
//   },
// )

// export const generateImage = async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const formData = new FormData();
//     formData.append("prompt", prompt);
//     formData.append("width", "512");
//     formData.append("height", "512");
//     formData.append("steps", "30");
//     formData.append("cfg_scale", "7.5");

//     const response = await axios.post(
//       "https://api.stability.ai/v2beta/stable-image/generate/core",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//           Authorization: `Bearer ${stability_api_key}`,
//           Accept: "application/json",
//         },
//       }
//     );
//     // Extract image URL from API response
//     const imageUrl = response.data.image;

//     res.status(200).json({ image_url: imageUrl });
//   } catch (error) {
//     console.error(
//       "Error generating image:",
//       error.response ? error.response.data : error.message
//     );

//     res.status(500).json({ error: error.response?.data || "Server Error" });
//   }
// };

const options = {
  method: "POST",
  headers: {
    "x-freepik-api-key": "<api-key>",
    "Content-Type": "application/json",
  },
  body: '{"prompt":"<string>","structure_reference":"aSDinaTvuI8gbWludGxpZnk=","structure_strength":50,"style_reference":"aSDinaTvuI8gbWludGxpZnk=","adherence":50,"hdr":50,"resolution":"2k","aspect_ratio":"square_1_1","realism":true,"creative_detailing":33,"engine":"automatic","fixed_generation":false,"webhook_url":"https://httpbin.org/post","filter_nsfw":true,"styling":{"styles":[{"name":"<string>","strength":100}],"characters":[{"id":"<string>","strength":100}]}}',
};

fetch("https://api.freepik.com/v1/ai/mystic", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

const FREEPIK_API_KEY = "FPSXdeb3d8aa454445d791900c58548a0925";

export const generateImage = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await fetch(
      "https://api.freepik.com/v1/ai/text-to-image",
      {
        method: "POST",
        headers: {
          "x-freepik-api-key": "FPSXdeb3d8aa454445d791900c58548a0925",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          negative_prompt: "b&w, earth, cartoon, ugly",
          guidance_scale: 2,
          seed: 42,
          num_images: 1,
          image: { size: "square_1_1" },
          styling: {
            style: "anime",
            color: "pastel",
            lightning: "warm",
            framing: "portrait",
          },
        }),
      }
    );

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      // Return the first image
      const image = `data:image/png;base64,${data.data[0].base64}`;
      return res.json({ image });
    }

    res.status(500).json({ error: "No image generated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
