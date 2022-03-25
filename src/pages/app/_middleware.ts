import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies["MyDiary-token"];

  if (!token /*|| !(await jwt.verify(token, JWT_SECRET_KEY))*/) {
    const url = req.nextUrl.clone();
    url.pathname = "/signIn";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
