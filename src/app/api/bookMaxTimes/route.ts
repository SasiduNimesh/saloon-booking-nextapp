import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT app_date, app_time FROM appointments
    `);

    // Combine date and time into ISO-style strings
    const times = rows.map((row: any) => {
      const date = row.app_date?.toISOString?.().split('T')[0] || row.app_date;
      const time =
        typeof row.app_time === 'string'
          ? row.app_time.slice(0, 5)
          : row.app_time?.toISOString?.().split('T')[1]?.substring(0, 5);

      if (date && time) {
        return `${date}T${time}`;
      }
    }).filter(Boolean); // remove undefined/null entries

    return NextResponse.json({ bookedTimes: times });
  } catch (error) {
    console.error('Error in booked-times route:', error);
    return NextResponse.json({ bookedTimes: [] }, { status: 500 });
  }
}
