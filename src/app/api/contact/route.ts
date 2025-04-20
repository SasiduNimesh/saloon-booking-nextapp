import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: email,
      to: 'sasindunimeshsnb99@gmail.com',
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    await resend.emails.send({
      from: 'sasindunimeshsnb99@gmail.com',
      to: email,
      subject: 'Thanks for contacting Lucky Salon!',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Lucky Salon. We've received your message and will reply shortly.</p>
        <p>Have a beautiful day!</p>
        <p>Lucky Salon Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Email sending failed' }, { status: 500 });
  }
}
