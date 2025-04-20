import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const [hairRows] = await db.query(
      `SELECT COUNT(*) as count FROM hair_service`
    );
    const [beautyRows] = await db.query(
      `SELECT COUNT(*) as count FROM beauty_service`
    );

    return NextResponse.json({
      hairCount: hairRows[0].count,
      beautyCount: beautyRows[0].count,
    });
  } catch (error) {
    console.error("Error fetching service counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}
