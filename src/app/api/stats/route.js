import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const totalUsers = await db
      .collection("user")
      .countDocuments();

    const totalTasks = await db
      .collection("tasks")
      .countDocuments();

    const payments = await db
      .collection("payments")
      .find({
        payment_status: "paid",
      })
      .toArray();

    const totalPayout = payments.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    return NextResponse.json({
      totalUsers,
      totalTasks,
      totalPayout,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}