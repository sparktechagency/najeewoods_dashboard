import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { authKey } from "./lib";

const authRoutes = [
  "/forgot-password",
  "/reset-password",
  "/new-password",
  "/verify-otp",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const token = cookiesStore.get(authKey)?.value;
  const decoded: any = token && jwtDecode(token as string);
  const roleKey = decoded?.user?.role as string;

  


  if (!roleKey) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (roleKey == "admin") {
    if (/^\/dashboard\/*/.test(pathname)) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/forgot-password",
    "/reset-password",
    "/new-password",
    "/verify-otp",
  ],
};
