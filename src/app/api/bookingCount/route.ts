import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db'; // your DB connection file

export async function GET() {
  try {
    const [rows]: any = await db.query('SELECT COUNT(*) AS count FROM appointments');
    return NextResponse.json({ bookingCount: rows[0].count });
  } catch (error) {
    console.error('Error fetching booking count:', error);
    return NextResponse.json({ bookingCount: 0 });
  }
}
