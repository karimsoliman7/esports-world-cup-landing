import { NextRequest, NextResponse } from "next/server";

// Arabic is the default locale — bare requests land on /ar
export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/ar", req.url));
}

export const config = {
  matcher: ["/"],
};
