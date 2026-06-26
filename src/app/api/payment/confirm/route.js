import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const { proposalId, taskId } =
      await req.json();

    await db.collection("proposals").updateOne(
      {
        _id: new ObjectId(proposalId),
      },
      {
        $set: {
          status: "accepted",
        },
      }
    );

    await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
      },
      {
        $set: {
          status: "in-progress",
        },
      }
    );

    await db.collection("payments").insertOne({
      proposalId,
      taskId,
      payment_status: "paid",
      paid_at: new Date(),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}