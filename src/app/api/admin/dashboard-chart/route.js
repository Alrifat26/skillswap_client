import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const users = await db.collection("user").countDocuments();

    const tasks = await db.collection("tasks").countDocuments();

    const activeTasks = await db.collection("tasks").countDocuments({
      status: "in-progress",
    });

    const payments = await db
      .collection("payments")
      .find({})
      .toArray();

    const revenue = payments.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    return NextResponse.json([
      {
        name: "Users",
        value: users,
      },
      {
        name: "Tasks",
        value: tasks,
      },
      {
        name: "Active",
        value: activeTasks,
      },
      {
        name: "Revenue",
        value: revenue,
      },
    ]);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}