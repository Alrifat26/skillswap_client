import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({
        created_at: -1,
      })
      .toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load reviews",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const body = await request.json();

    const review = {
      task_id: body.task_id,
      reviewer_email: body.reviewer_email,
      reviewee_email: body.reviewee_email,
      rating: Number(body.rating),
      comment: body.comment,
      created_at: new Date(),
    };

    const result = await db
      .collection("reviews")
      .insertOne(review);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit review",
      },
      {
        status: 500,
      }
    );
  }
}