import { NextResponse } from 'next/server';
import { generateContent } from '@/configs/AiModel';


export async function POST(req) {
  try {
    const { contents } = await req.json();
    const response = await generateContent(contents);
    console.log(response.text);

    return NextResponse.json({ response: JSON.parse(response.text) });


  } catch (error) {
    console.error('Error generating video script:', error);
    return NextResponse.json({ error: 'Failed to generate video script' }, { status: 500 });
  }
}