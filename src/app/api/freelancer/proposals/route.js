import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const proposals = await db
      .collection("proposals")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(proposals);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch proposals",
      },
      {
        status: 500,
      }
    );
  }
}