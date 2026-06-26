import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET(request) {
try {
await client.connect();


const db = client.db("skill_swap_db");

const { searchParams } = new URL(request.url);

const search =
  searchParams.get("search") || "";

const category =
  searchParams.get("category") || "All";

let query = {};

if (search) {
  query.title = {
    $regex: search,
    $options: "i",
  };
}

if (category !== "All") {
  query.category = category;
}

const tasks = await db
  .collection("tasks")
  .find(query)
  .sort({ createdAt: -1 })
  .toArray();

return NextResponse.json(tasks);


} catch (error) {
console.error("GET Error:", error);


return NextResponse.json(
  {
    message: "Failed to fetch tasks",
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

const taskData = {
  ...body,
  createdAt: new Date(),
};

const result = await db
  .collection("tasks")
  .insertOne(taskData);

return NextResponse.json(
  {
    success: true,
    message:
      "Task posted successfully!",
    taskId: result.insertedId,
  },
  {
    status: 201,
  }
);


} catch (error) {
console.error("POST Error:", error);


return NextResponse.json(
  {
    message:
      error.message ||
      "Failed to create task",
  },
  {
    status: 500,
  }
);


}
}
