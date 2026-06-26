import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
try {
await client.connect();


const db = client.db("skill_swap_db");

const totalTasks = await db
  .collection("tasks")
  .countDocuments();

const totalProposals = await db
  .collection("proposals")
  .countDocuments();

const acceptedJobs = await db
  .collection("proposals")
  .countDocuments({
    status: "accepted",
  });

const acceptedProposals = await db
  .collection("proposals")
  .find({
    status: "accepted",
  })
  .toArray();

const earnings = acceptedProposals.reduce(
  (total, proposal) =>
    total + Number(proposal.bidAmount || 0),
  0
);

return NextResponse.json({
  totalTasks,
  totalProposals,
  acceptedJobs,
  earnings,
});


} catch (error) {
console.error(error);

return NextResponse.json(
  {
    message: "Failed to load dashboard data",
  },
  {
    status: 500,
  }
);


}
}
