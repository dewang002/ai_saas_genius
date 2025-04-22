import { auth } from "@clerk/nextjs/server"
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server"

const googleai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_KEY });

const POST = async (req: Request) => {
    try {
        const { userId } = await auth() // coming form clerk
        const body = await req.json()
        const { prompt, amount = 1, resolution = '512 * 512' } = body

        if (!userId) {
            return new NextResponse('UnAuthorized', { status: 401 })
        }
        if (!prompt) {
            return new NextResponse('empty prompt', { status: 500 })
        }
        if (!amount) {
            return new NextResponse('amount required', { status: 500 })
        }
        if (!resolution) {
            return new NextResponse('resolution required', { status: 500 })
        }
        const res = await googleai.models.generateImages({
            prompt,
            n: parseInt(amount, 10), // here I have to check for google studio
            size: resolution
        });
    } catch {

    }
}