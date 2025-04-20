import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/db'; // adjust if path is different

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const bookingId = params.id;

  try {
    await db.query('DELETE FROM appointments WHERE bookingId = ?', [bookingId]);
    return NextResponse.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Cancel failed:', error);
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
  }
}
