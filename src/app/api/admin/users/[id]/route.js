import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request, context) {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const params = await context.params;

    const { isBlocked } = await request.json();

    const result = await db.collection("user").updateOne(
      {
        _id: new ObjectId(params.id),
      },
      {
        $set: {
          isBlocked,
        },
      }
    );

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
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