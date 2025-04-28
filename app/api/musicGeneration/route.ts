import { NextRequest, NextResponse } from "next/server";
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICA_KEY!
})

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        const {prompt} = await body
        if(!prompt){
            return new NextResponse('prompt required',{status:200})
        }
        return new Response(JSON.stringify(''), { // here I have to give response which I havent yet
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