import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, name, imageUrl } = await req.json();

    // Check if user already exists
    const existingUser = await db.select().from(Users)
      .where(eq(Users.email, email));

    if (existingUser.length === 0) {
      // Insert new user
      await db.insert(Users).values({
        name: name,
        email: email,
        imageUrl: imageUrl,
      });

      return NextResponse.json({ 
        success: true, 
        message: 'User created successfully' 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'User already exists' 
    });

  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}


