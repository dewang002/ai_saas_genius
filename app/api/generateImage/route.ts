import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscripton } from "@/lib/subscription";
import { GoogleGenAI, Modality } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { prompt } = await body
        const isPro = await checkSubscripton()
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

        const freeTrial = await checkApiLimit()
        if (!freeTrial&&!isPro) {
            return new NextResponse("free trial is ended, to continue check out or plan", { status: 403 })
        }

        if (
            !response.candidates ||
            !response.candidates[0]?.content?.parts
          ) {
            return new Response("Invalid response from AI", { status: 500 });
          }

        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                result.text = part.text;
            } else if (part.inlineData?.data) {
                result.image = part.inlineData.data;
            }
        }

        if(!isPro){
            await increaseApiLimit()
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        let errorMessage = 'Something went wrong';

        if (error instanceof Error) {
          errorMessage = error.message;
        }
      
        return new Response(JSON.stringify({ error: errorMessage }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
    }
}