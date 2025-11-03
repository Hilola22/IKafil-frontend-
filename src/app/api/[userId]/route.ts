import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  const target = new URL(
    `/api/payments/${encodeURIComponent(userId)}`,
    req.url
  );
  return NextResponse.redirect(target);
}
