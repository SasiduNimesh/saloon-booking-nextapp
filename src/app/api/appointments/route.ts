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

    // Check if this time slot already has 2 bookings
    const [existingBookings] = await db.query(
      `SELECT COUNT(*) as count FROM appointments 
       WHERE app_date = ? AND app_time = ?`,
      [app_date, app_time]
    );
    
    // @ts-ignore - Assuming existingBookings is an array with at least one item having a count property
    if (existingBookings[0].count >= 2) {
      return NextResponse.json(
        { message: 'This time slot is already fully booked', success: false }, 
        { status: 409 } // Conflict status code
      );
    }

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
