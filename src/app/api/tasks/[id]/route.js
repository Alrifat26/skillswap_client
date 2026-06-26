import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, context) {
try {
await client.connect();


const db = client.db("skill_swap_db");

const params = await context.params;

const task = await db.collection("tasks").findOne({
  _id: new ObjectId(params.id),
});

return NextResponse.json(task);


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

export async function DELETE(request, context) {
try {
await client.connect();


const db = client.db("skill_swap_db");

const params = await context.params;

const result = await db.collection("tasks").deleteOne({
  _id: new ObjectId(params.id),
});

return NextResponse.json({
  success: true,
  deletedCount: result.deletedCount,
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

export async function PATCH(request, context) {
try {
await client.connect();


const db = client.db("skill_swap_db");

const params = await context.params;

const { status } = await request.json();

console.log("TASK ID:", params.id);
console.log("STATUS:", status);

const result = await db.collection("tasks").updateOne(
  {
    _id: new ObjectId(params.id),
  },
  {
    $set: {
      status,
    },
  }
);

console.log("UPDATE RESULT:", result);

return NextResponse.json({
  success: true,
  matchedCount: result.matchedCount,
  modifiedCount: result.modifiedCount,
  message: "Task updated successfully",
});


} catch (error) {
console.error("PATCH ERROR:", error);


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
