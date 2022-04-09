import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies["MyDiary-token"];
  const response = await fetch(
    "http://localhost:3000/api/ensureAuthenticated",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!token || !response.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/signIn";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
