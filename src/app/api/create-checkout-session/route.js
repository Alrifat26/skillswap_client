import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      taskId,
      title,
      amount,
      clientEmail,
      freelancerEmail,
    } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: title,
            },

            unit_amount: Number(amount) * 100,
          },

          quantity: 1,
        },
      ],

      success_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/payment/cancel`,

      metadata: {
        taskId,
        clientEmail,
        freelancerEmail,
        amount,
      },
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}