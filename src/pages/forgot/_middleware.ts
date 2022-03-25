import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies["MyDiary-token"];

  if (token /*|| !(await jwt.verify(token, JWT_SECRET_KEY))*/) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    const { pathname } = req.nextUrl;
    if (pathname === "/signUp") {
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
