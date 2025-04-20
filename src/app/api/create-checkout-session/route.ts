import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: NextRequest) {
  const {
    name,
    email,
    mobile,
    serviceName,
    price,
    date,
    time
  } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: serviceName,
            description: `Booking for ${date} at ${time}`,
          },
          unit_amount: parseFloat(price) * 100, // in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/cancel`,
  });

  return NextResponse.json({ id: session.id });
}
