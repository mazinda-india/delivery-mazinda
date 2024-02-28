import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const middleware = (req) => {
  const token = cookies().get("access_token")?.value || "";

  const path = req.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup";

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: ["/", "/login", "/signup"],
};
