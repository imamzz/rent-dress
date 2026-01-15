import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const AUTH_ROUTES = ["/auth"];
const PROTECTED_ROUTES = ["/dashboard", "/orders", "/products", "/reports", "/users"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
