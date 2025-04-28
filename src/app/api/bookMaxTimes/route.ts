import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';

interface AppointmentRow extends RowDataPacket {
  app_date: Date | string;
  app_time: string;
}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT app_date, app_time FROM appointments') as unknown as [AppointmentRow[]];

    const times = rows.map((row) => {
      const date =
        typeof row.app_date === 'string'
          ? row.app_date
          : row.app_date.toISOString().split('T')[0];

      const time = row.app_time.slice(0, 5); // assumes format HH:MM:SS or similar

      return `${date}T${time}`;
    });

    return NextResponse.json({ bookedTimes: times });
  } catch (error) {
    console.error('Error in booked-times route:', error);
    return NextResponse.json({ bookedTimes: [] }, { status: 500 });
  }
}
