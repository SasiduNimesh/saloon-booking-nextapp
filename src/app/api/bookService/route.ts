import { db } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [hairRows]: any = await db.query('SELECT name, price FROM hair_service');
    const [beautyRows]: any = await db.query('SELECT name, price FROM beauty_service');

    const services = [...hairRows, ...beautyRows];

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
