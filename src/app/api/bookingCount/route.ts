import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db'; 
import { RowDataPacket } from 'mysql2';

interface CountRow extends RowDataPacket {
  count: number;
}

export async function GET() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM appointments') as unknown as [CountRow[]];
    const totalCount = rows[0].count;

    return NextResponse.json({ bookingCount: totalCount });
  } catch (error) {
    console.error('Error fetching booking count:', error);
    return NextResponse.json({ bookingCount: 0 }, { status: 500 });
  }
}  