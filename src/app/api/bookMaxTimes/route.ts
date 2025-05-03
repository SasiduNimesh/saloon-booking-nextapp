import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import { RowDataPacket } from 'mysql2';
interface TimeSlotRow extends RowDataPacket {
  app_date: string;       
  app_time: string;       
  count: number;
}

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT app_date, app_time, COUNT(*) AS count
      FROM appointments
      GROUP BY app_date, app_time
      HAVING count >= 2
    `) as unknown as [TimeSlotRow[]];

    const bookedTimes = rows.map(row => {
      const date = row.app_date;
      const time = row.app_time.slice(0, 5); // "HH:MM"
      return `${date}T${time}`;
    });

    return NextResponse.json({ bookedTimes });
  } catch (error) {
    console.error("Error in /api/bookMaxTimes:", error);
    return NextResponse.json({ bookedTimes: [] }, { status: 500 });
  }
}
