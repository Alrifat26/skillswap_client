import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request, context) {
try {
await client.connect();

const db = client.db("skill_swap_db");

const { id } = await context.params;

const body = await request.json();

const { status, taskId } = body;

console.log("Proposal ID:", id);
console.log("Task ID:", taskId);
console.log("Status:", status);

const proposalResult = await db
  .collection("proposals")
  .updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        status,
      },
    }
  );

console.log(
  "Proposal Update:",
  proposalResult
);

if (
  status === "accepted" &&
  taskId
) {
  const taskResult = await db
    .collection("tasks")
    .updateOne(
      {
        _id: new ObjectId(taskId),
      },
      {
        $set: {
          status: "in-progress",
        },
      }
    );

  console.log(
    "Task Update:",
    taskResult
  );
}

return NextResponse.json({
  success: true,
});


} catch (error) {
console.error(error);

return NextResponse.json(
  {
    success: false,
    error: error.message,
  },
  {
    status: 500,
  }
);


}
}
