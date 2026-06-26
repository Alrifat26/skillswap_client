import { NextResponse } from "next/server";
import client from "@/lib/mongodb";

export async function GET() {
try {
await client.connect();


const db = client.db("skill_swap_db");

const earnings = await db
  .collection("payments")
  .find({
    payment_status: "paid",
  })
  .sort({
    paid_at: -1,
  })
  .toArray();

return NextResponse.json(earnings);


} catch (error) {
console.error("Earnings API Error:", error);


return NextResponse.json(
  {
    success: false,
    message: "Failed to load earnings",
  },
  {
    status: 500,
  }
);


}
}
