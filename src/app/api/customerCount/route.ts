import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET() {
  try {
    const [custrows]: any = await db.query(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE role = 'customer'
    `);

    const customerCount = custrows[0]?.count || 0;

    return NextResponse.json({ customerCount });
  } catch (error) {
    console.error('Error fetching customer count:', error);
    return NextResponse.json({ error: 'Failed to fetch customer count' }, { status: 500 });
  }
}
