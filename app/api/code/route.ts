'use server'
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscripton } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const googleai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

export const POST = async (req: Request) => {
    try {
        const { userId } = await auth() // coming form clerk
        const body = await req.json()
        const { message } = body
        const isPro = await checkSubscripton()

        if (!userId) {
            return new NextResponse("unAuthenticated", { status: 401 })
        }

        if (!message) {
            return new NextResponse("Message are required", { status: 500 })
        }

        const freeTrial = await checkApiLimit()
        if (!freeTrial && isPro) {
            return new NextResponse("your free trial is ended, to continue check out our plan.")
        }

        const response = await googleai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `you are a code generator. dont write to much just to the point talk and to the point code very accurate. who generate code for me : ${message}`,
        });

        //@ts-ignore
        const aiResMessage = response.candidates[0].content.parts[0].text
        if(!isPro){
            await increaseApiLimit()
        }
        return NextResponse.json(aiResMessage, { status: 200 })

    } catch (err) {
        console.log("[code error]", err)
        return new NextResponse("internal error", { status: 500 })
    }
}