import { db } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const [notices] = await db.query('SELECT * FROM notices ORDER BY created_at DESC');
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 });
    }

    await db.query('INSERT INTO notices (message) VALUES (?)', [message]);
    return NextResponse.json({ message: "Notice added successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to add notice" }, { status: 500 });
  }
}
