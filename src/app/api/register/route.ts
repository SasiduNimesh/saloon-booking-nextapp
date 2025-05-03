import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import bcrypt from "bcrypt";

interface User {
  id: number;
  email: string;
  password: string;
  role: "owner" | "customer";
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const { email, password, rePassword, role } = await req.json();

    // Validate inputs
    if (!email || !password || !rePassword || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== rePassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // Check if user already exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const users = rows as User[];

    if (users.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, hashedPassword, role]
    );

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
