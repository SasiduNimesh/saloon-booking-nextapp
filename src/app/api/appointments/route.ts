// /app/api/appointments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function POST(req: NextRequest) {
  try {
    const {
      cname,
      cemail,
      mobileno,
      service_name,
      price,
      app_date,
      app_time,
      pay_method,
      pay_status
    } = await req.json();

    await db.query(
      `INSERT INTO appointments 
        (cname, cemail, mobileno, service_name, price, app_date, app_time, pay_method, pay_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cname,
        cemail,
        mobileno,
        service_name,
        price,
        app_date,
        app_time,
        pay_method,
        pay_status,
      ]
    );

    return NextResponse.json({ message: 'Appointment saved successfully', success: true }, { status: 201 });
  } catch (err) {
    console.error('Error saving appointment:', err);
    return NextResponse.json({ message: 'Error saving appointment', error: err }, { status: 500 });
  }
}
