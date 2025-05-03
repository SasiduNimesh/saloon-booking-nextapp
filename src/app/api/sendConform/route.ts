import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, service, date, time } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Lucky Salon" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Appointment is Confirmed!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for booking your <strong>${service}</strong> service at Lucky Salon.</p>
        <p>Your appointment is scheduled for: <strong>${date} at ${time}</strong>.</p>
        <p>We look forward to seeing you!</p>
        <p>Lucky Salon</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
