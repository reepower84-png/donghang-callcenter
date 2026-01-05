import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/db";

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(name: string, phone: string, inquiry: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("DISCORD_WEBHOOK_URL이 설정되지 않았습니다.");
    return;
  }

  const now = new Date();
  const timestamp = now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  const embed = {
    embeds: [
      {
        title: "📋 새로운 상담 신청",
        color: 0x3b82f6, // 파란색
        fields: [
          {
            name: "👤 이름",
            value: name,
            inline: true,
          },
          {
            name: "📞 연락처",
            value: phone,
            inline: true,
          },
          {
            name: "💬 문의 내용",
            value: inquiry,
            inline: false,
          },
        ],
        footer: {
          text: "동행콜센터 | https://donghang-callcenter-reepower84-pngs-projects.vercel.app",
        },
        timestamp: now.toISOString(),
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embed),
    });

    if (!response.ok) {
      console.error("Discord 웹훅 전송 실패:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Discord 웹훅 전송 오류:", error);
  }
}

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

    // Discord로 알림 전송
    await sendDiscordNotification(name, phone, inquiry);

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
