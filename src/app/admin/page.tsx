"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Inquiry } from "@/lib/types";

// Login Component
const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin();
      } else {
        setError(data.error || "로그인에 실패했습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary)] via-[#2563eb] to-[var(--primary-dark)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-4">
            <Image
              src="/동행콜센터_로고_가로_1-removebg-preview.png"
              alt="동행콜센터 로고"
              width={180}
              height={50}
              className="h-12 w-auto mx-auto"
              priority
            />
          </a>
          <p className="text-gray-500 mt-2">관리자 로그인</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors"
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--primary)] text-white font-bold py-3 rounded-xl hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-[var(--primary)] hover:underline text-sm"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiries");
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      onLogout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "markAsRead" }),
      });

      if (response.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, isRead: true } : i))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, isRead: true });
        }
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  };

  const filteredInquiries = inquiries.filter((i) => {
    if (filter === "unread") return !i.isRead;
    if (filter === "read") return i.isRead;
    return true;
  });

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[var(--primary)] text-white py-3 md:py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 md:px-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 md:gap-3">
            <Image
              src="/동행콜센터_로고_가로_1-removebg-preview.png"
              alt="동행콜센터 로고"
              width={150}
              height={40}
              className="h-6 md:h-8 w-auto brightness-0 invert"
            />
            <div className="border-l border-white/30 pl-2 md:pl-3 hidden sm:block">
              <span className="text-sm font-semibold">관리자</span>
            </div>
          </a>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="/"
              className="bg-white/20 px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-white/30 transition-colors text-sm md:text-base"
            >
              홈
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer text-sm md:text-base"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
          <div className="bg-white p-3 md:p-6 rounded-xl shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-[var(--primary)]">
              {inquiries.length}
            </div>
            <div className="text-gray-600 text-xs md:text-base">전체 문의</div>
          </div>
          <div className="bg-white p-3 md:p-6 rounded-xl shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-[var(--secondary)]">
              {unreadCount}
            </div>
            <div className="text-gray-600 text-xs md:text-base">미확인 문의</div>
          </div>
          <div className="bg-white p-3 md:p-6 rounded-xl shadow text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600">
              {inquiries.length - unreadCount}
            </div>
            <div className="text-gray-600 text-xs md:text-base">확인 완료</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
          {/* Inquiry List */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-3 md:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base md:text-lg font-bold">문의 목록</h2>
              <div className="flex gap-1 md:gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm cursor-pointer ${
                    filter === "all"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setFilter("unread")}
                  className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm cursor-pointer ${
                    filter === "unread"
                      ? "bg-[var(--secondary)] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  미확인
                </button>
                <button
                  onClick={() => setFilter("read")}
                  className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm cursor-pointer ${
                    filter === "read"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  확인완료
                </button>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500">
                  로딩 중...
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  문의가 없습니다.
                </div>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedInquiry?.id === inquiry.id ? "bg-blue-50" : ""
                    } ${!inquiry.isRead ? "bg-yellow-50" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {!inquiry.isRead && (
                          <span className="w-2 h-2 bg-[var(--secondary)] rounded-full"></span>
                        )}
                        <span className="font-semibold">{inquiry.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(inquiry.createdAt)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {inquiry.phone}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {inquiry.inquiry}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inquiry Detail */}
          <div className="bg-white rounded-xl shadow">
            <div className="p-3 md:p-4 border-b">
              <h2 className="text-base md:text-lg font-bold">문의 상세</h2>
            </div>

            {selectedInquiry ? (
              <div className="p-4 md:p-6">
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                        selectedInquiry.isRead
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedInquiry.isRead ? "확인완료" : "미확인"}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      {formatDate(selectedInquiry.createdAt)}
                    </span>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <label className="text-xs md:text-sm text-gray-500 block mb-1">
                        이름
                      </label>
                      <div className="text-base md:text-lg font-semibold">
                        {selectedInquiry.name}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs md:text-sm text-gray-500 block mb-1">
                        연락처
                      </label>
                      <div className="text-base md:text-lg">
                        <a
                          href={`tel:${selectedInquiry.phone}`}
                          className="text-[var(--primary)] hover:underline"
                        >
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs md:text-sm text-gray-500 block mb-1">
                        문의 내용
                      </label>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-lg whitespace-pre-wrap text-sm md:text-base">
                        {selectedInquiry.inquiry}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {!selectedInquiry.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(selectedInquiry.id)}
                      className="flex-1 min-w-[100px] bg-green-600 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer text-sm md:text-base"
                    >
                      확인 완료
                    </button>
                  )}
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="flex-1 min-w-[100px] bg-[var(--primary)] text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors text-center text-sm md:text-base"
                  >
                    전화하기
                  </a>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="px-3 md:px-4 bg-red-600 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer text-sm md:text-base"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8 text-center text-gray-500 text-sm md:text-base">
                문의를 선택해주세요
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Main Admin Page
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/auth");
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}
