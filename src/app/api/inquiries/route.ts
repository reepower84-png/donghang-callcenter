import { NextRequest, NextResponse } from "next/server";
import { getInquiries, markAsRead, deleteInquiry } from "@/lib/db";

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "문의 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json(
        { error: "ID와 액션을 지정해주세요." },
        { status: 400 }
      );
    }

    if (action === "markAsRead") {
      const success = await markAsRead(id);
      if (!success) {
        return NextResponse.json(
          { error: "문의를 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "읽음 처리되었습니다." });
    }

    return NextResponse.json(
      { error: "알 수 없는 액션입니다." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "문의 업데이트에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "삭제할 문의 ID를 지정해주세요." },
        { status: 400 }
      );
    }

    const success = await deleteInquiry(id);
    if (!success) {
      return NextResponse.json(
        { error: "문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "문의가 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "문의 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
