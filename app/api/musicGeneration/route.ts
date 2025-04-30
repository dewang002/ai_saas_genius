"use server"
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICA_KEY
});


export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return new NextResponse('Prompt required', { status: 400 });
        }
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const response = await replicate.run(
            "suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787",
            {
                input: {
                    prompt_a: prompt
                }
            });

        // Return the audio data in a structured way
        return NextResponse.json( response );
    } catch (error) {
        console.error("[Replicate Error]", error);
        return new NextResponse(JSON.stringify({
            error: "Failed to generate music"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}