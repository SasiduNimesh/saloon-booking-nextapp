import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

interface Appointment {
  bookingId: number;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;

}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM appointments ORDER BY bookingId ASC');
    const appointments = rows as Appointment[];

    return NextResponse.json({ bookings: appointments });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ bookings: [] }, { status: 500 });
  }
}
