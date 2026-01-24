import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 },
    );
  }

  // Forward to backend server on port 5000
  const backendUrl = `http://localhost:5000/api/v1/auth/oauth2callback?code=${code}`;

  return NextResponse.redirect(backendUrl);
}
