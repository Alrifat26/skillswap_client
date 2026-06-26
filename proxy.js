import { NextResponse } from "next/server";

export function proxy(_request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};