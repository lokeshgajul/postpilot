import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("api_key");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const getPrompt = async (req, res) => {
  try {
    const prompt =
      "Explain how AI works. Provide the answer in well-structured points and paragraphs and bold the points";

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Format the response into bullet points and paragraphs
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
