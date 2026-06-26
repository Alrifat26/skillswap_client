import client from "@/lib/mongodb";

export async function GET() {
  try {
    await client.connect();

    const db = client.db("skill_swap_db");

    const tasksCollection = db.collection("tasks");

    const totalTasks = await tasksCollection.countDocuments();

    const openTasks = await tasksCollection.countDocuments({
      status: "open",
    });

    const inProgress = await tasksCollection.countDocuments({
      status: "in-progress",
    });

    return Response.json({
      totalTasks,
      openTasks,
      inProgress,
      totalSpent: 0,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}