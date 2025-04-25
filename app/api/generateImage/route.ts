import { GoogleGenAI, Modality } from "@google/genai";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {prompt} = await body
        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

        const contents = prompt;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp-image-generation",
            contents: contents,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        const result = { text: '', image: '' };

        //@ts-ignore
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                result.text = part.text;
            } else if (part.inlineData) {
                //@ts-ignore
                result.image = part.inlineData.data;
            }
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
      //@ts-ignore
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}