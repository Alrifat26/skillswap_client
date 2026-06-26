import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET(request) {
  try {
    await client.connect();
    const db = client.db("skill_swap_db");

    // ১. URL থেকে freelancerEmail কুয়েরি প্যারামিটারটি সংগ্রহ করা
    const { searchParams } = new URL(request.url);
    const freelancerEmail = searchParams.get("freelancerEmail");

    // ২. যদি ইমেইল থাকে তবে শুধু সেই ইমেইলের প্রপোজাল খুঁজবে, না থাকলে সব খুঁজবে
    let query = {};
    if (freelancerEmail) {
      query = { freelancerEmail: freelancerEmail }; // আপনার ডাটাবেজের ফিল্ডের নামের সাথে মিলিয়ে নিবেন
    }

    const proposals = await db
      .collection("proposals")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(proposals);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch proposals" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await client.connect();
    const db = client.db("skill_swap_db");

    const proposalData = await request.json();

    proposalData.status = "pending";
    proposalData.createdAt = new Date();

    const result = await db
      .collection("proposals")
      .insertOne(proposalData);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit proposal" },
      { status: 500 }
    );
  }
}