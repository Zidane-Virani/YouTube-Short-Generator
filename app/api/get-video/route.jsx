import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { videoId } = await req.json();
    
    const result = await db.select().from(VideoData)
      .where(eq(VideoData.id, videoId));
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    
    const data = result[0];
    
    return NextResponse.json({
      script: data.script,
      audioFileUrl: data.audioFileUrl,
      captions: data.captions,
      imageList: Array.isArray(data.imageList) ? data.imageList : JSON.parse(data.imageList || '[]'),
    });
  } catch (error) {
    console.error('Error fetching video data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

