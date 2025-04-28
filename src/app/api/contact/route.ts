import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,       
      pass: process.env.ADMIN_EMAIL_PASS,  
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New message from ${name}`,
      html: 
        `<p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>`,
    });

    await transporter.sendMail({
      from: `Lucky Salon <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Thanks for contacting Lucky Salon!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your message! We have received it and will get back to you soon.</p>
        <p>Lucky Salon</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
