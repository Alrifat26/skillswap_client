import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const payments = await db
      .collection("payments")
      .find({})
      .sort({ paid_at: -1 })
      .toArray();

    return NextResponse.json(payments);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch transactions",
      },
      {
        status: 500,
      }
    );
  }
}