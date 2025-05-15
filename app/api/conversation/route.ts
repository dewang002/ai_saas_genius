'use server'

import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
const googleai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

export const POST = async (req: Request) => {
    try {
        const { userId } = await auth() // coming form clerk
        const body = await req.json()
        const { message } = body

        if (!userId) {
            return new NextResponse("unAuthenticated", { status: 401 })
        }

        if (!message) {
            return new NextResponse("Message are required", { status: 500 })
        }
        const freeTrial = await checkApiLimit()
        if (!freeTrial) {
            return new NextResponse("free trial is ended, to continue check out or plan", { status: 403 })
        }
        
        const userPrompt = await googleai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `You are a helpful assistant dont give to much line of words just to the point no sandbagging real talk. Please answer the following user prompt in a clean and organized way using bullet points if suitable. Ensure the output is well-formatted and doesn't include any markdown artifacts like stray asterisks or broken formatting.
            Prompt: ${message}`,
        });

        //@ts-ignore
        const aiResMessage = userPrompt.candidates[0].content.parts[0].text
        await increaseApiLimit()
        return NextResponse.json(aiResMessage, { status: 200 })

    } catch (err) {
        console.log("[conversation error]", err)
        return new NextResponse("internal error", { status: 500 })
    }
}