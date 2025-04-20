import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';
import { db } from '@/app/lib/db';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const duration = formData.get("duration")?.toString();
    const file = formData.get("image") as File;

    if (!name || !price || !duration || !file) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Ensure upload dir exists
    await fs.mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);
    const imagePath = `/uploads/${fileName}`;

    await db.query(
      "INSERT INTO beauty_service (name, price, duration, image) VALUES (?, ?, ?, ?)",
      [name, price, duration, imagePath]
    );

    return NextResponse.json({ message: "Beauty service added!" }, { status: 200 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM beauty_service");
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
