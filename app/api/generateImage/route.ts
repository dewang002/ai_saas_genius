import { auth } from "@clerk/nextjs/server"
import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server"
import * as fs from "node:fs"

const googleai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_KEY });

export const POST = async (req: Request) => {
  try {
    const { userId } = await auth() // coming from clerk
    const body = await req.json()
    const { values } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!values) {
      return new NextResponse('Empty prompt', { status: 500 })
    }

    const contents =
      "Hi, can you create a 3d rendered image of a pig " +
      "with wings and a top hat flying over a happy " +
      "futuristic scifi city with lots of greenery?" + values;

    const response = await googleai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    // @ts-ignore
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        // @ts-ignore
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync("gemini-native-image.png", buffer);
        console.log("Image saved as gemini-native-image.png");
      }
    }
    return NextResponse.json(response, { status: 200 })
  } catch (err) {
    console.log("[IMAGE_ERROR]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}