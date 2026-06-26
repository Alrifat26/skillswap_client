import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const projects = await db
      .collection("tasks")
      .find({
        status: {
          $in: [
            "in-progress",
            "completed",
          ],
        },
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    return NextResponse.json(
      projects
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load projects",
      },
      {
        status: 500,
      }
    );
  }
}