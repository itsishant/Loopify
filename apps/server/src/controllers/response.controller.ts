import { type Request, type Response } from "express";
import ai from "../integrations/geminiClient.js";
const createPromptResponse = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // llm call =>

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No repsonse from AI model found!",
      });
    }

    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "No text found";

    return res.status(200).json({
      success: true,
      prompt: prompt,
      aiResponse: text,
    });
  } catch (error) {
    console.log(`Error in creating prompt respone ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export { createPromptResponse };
