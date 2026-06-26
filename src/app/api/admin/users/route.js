import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const users = await db
      .collection("user")
      .find({})
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch users",
      },
      {
        status: 500,
      }
    );
  }
}