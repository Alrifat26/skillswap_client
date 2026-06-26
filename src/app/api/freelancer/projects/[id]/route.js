import { NextResponse } from "next/server";

import client from "@/lib/mongodb";

import { ObjectId } from "mongodb";

export async function PATCH(request, { params }) {

try {

await client.connect();

const db = client.db("skill_swap_db");

const body = await request.json();

const result = await db

.collection("tasks")

.updateOne(

{ _id: new ObjectId(params.id) },

{

$set: {

deliverable_url:

body.deliverable_url,

status: body.status || "completed",

},

}

);

if (result.modifiedCount > 0) {

return NextResponse.json({

success: true,

message: "Project completed successfully",

});

}

return NextResponse.json(

{

success: false,

message: "Project update failed",

},

{ status: 400 }

);

} catch (error) {

console.error(error);

return NextResponse.json(

{

success: false,

message: error.message,

},

{ status: 500 }

);

}

}