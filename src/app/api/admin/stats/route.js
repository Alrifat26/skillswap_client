import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const usersCollection =
      db.collection("user");

    const tasksCollection =
      db.collection("tasks");

    const paymentsCollection =
      db.collection("payments");

    const totalUsers =
      await usersCollection.countDocuments();

    const freelancerCount =
      await usersCollection.countDocuments({
        role: {
          $regex: /^freelancer$/i,
        },
      });

    const adminCount =
      await usersCollection.countDocuments({
        role: {
          $regex: /^admin$/i,
        },
      });

    const totalTasks =
      await tasksCollection.countDocuments();

    const activeTasks =
      await tasksCollection.countDocuments({
        status: {
          $in: [
            "open",
            "in-progress",
            "active",
          ],
        },
      });

    const payments =
      await paymentsCollection
        .find({})
        .toArray();

    const totalRevenue =
      payments.reduce(
        (sum, payment) =>
          sum +
          Number(
            payment.amount || 0
          ),
        0
      );

    return NextResponse.json({
      totalUsers,
      freelancerCount,
      adminCount,
      totalTasks,
      activeTasks,
      totalRevenue,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load stats",
      },
      {
        status: 500,
      }
    );
  }
}