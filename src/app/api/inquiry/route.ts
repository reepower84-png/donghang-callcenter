import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, inquiry } = body;

    // Validation
    if (!name || !phone || !inquiry) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: "이름은 2자 이상 입력해주세요." },
        { status: 400 }
      );
    }

    // Phone validation (Korean phone number format)
    const phoneRegex = /^(01[0-9]|02|0[3-9][0-9])-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/-/g, ""))) {
      return NextResponse.json(
        { error: "올바른 전화번호 형식을 입력해주세요." },
        { status: 400 }
      );
    }

    if (inquiry.length < 5) {
      return NextResponse.json(
        { error: "문의 내용은 5자 이상 입력해주세요." },
        { status: 400 }
      );
    }

    // Save to database
    const newInquiry = await saveInquiry({ name, phone, inquiry });

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다.", id: newInquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
