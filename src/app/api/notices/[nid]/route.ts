import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { nid: string } }) {
  const { nid } = params;

  try {
    await db.query('DELETE FROM notices WHERE nid = ?', [nid]);
    return NextResponse.json({ message: "Notice deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete notice" }, { status: 500 });
  }
}

