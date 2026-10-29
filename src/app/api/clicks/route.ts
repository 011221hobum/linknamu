import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getClickCounts());
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const linkId = body?.linkId;

  // 등록된 링크의 클릭만 기록합니다.
  if (!profile.links.some((link) => link.id === linkId)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const saved = await incrementClick(linkId);
    if (!saved) {
      return NextResponse.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수 저장에 실패했습니다." }, { status: 500 });
  }
}
