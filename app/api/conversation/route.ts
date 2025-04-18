    'use server'
    import { auth } from "@clerk/nextjs/server";
    import { NextResponse } from "next/server";


    export const POST = async (req: Request) => {
        try {
            const { userId } =await auth() // coming form clerk
            const body = await req.json()
            const { message } = body

            if (!userId) {
                return new NextResponse("unAuthenticated", { status: 401 })
            }

            if(!message) {
                return new  NextResponse("Message are required", { status: 500 })
            }
            const jsonString = message.replace(/^```json\n/, '').replace(/\n```$/, '');
            return NextResponse.json(jsonString, { status: 200 })

        } catch (err) {
            console.log("[conversation error]", err)
            return new NextResponse("internal error", { status: 500 })
        }
    }