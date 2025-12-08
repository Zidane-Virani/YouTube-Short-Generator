import { NextResponse } from 'next/server';
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_AI_API_KEY || "d368cdc6972a455fb9a655524f5c4016",
});

export async function POST(req) {
  try {
    const { audioUrl } = await req.json();

    const params = {
      audio: audioUrl,
    };

    const transcript = await client.transcripts.transcribe(params);

    console.log(transcript.words);
    return NextResponse.json({ result: transcript.text });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}