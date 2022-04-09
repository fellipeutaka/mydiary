import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies["MyDiary-token"];
  const response = await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/ensureAuthenticated"
      : "https://my-diary-online.vercel.app/api/ensureAuthenticated",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (token && response.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    const { pathname } = req.nextUrl;
    if (pathname === "/signIn") {
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
