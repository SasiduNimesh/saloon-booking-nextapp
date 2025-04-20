import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET() {
  try {
    const [rows]: any = await db.query('SELECT * FROM appointments ORDER BY bookingId ASC');
    return NextResponse.json({ bookings: rows });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ bookings: [] }, { status: 500 });
  }
}
