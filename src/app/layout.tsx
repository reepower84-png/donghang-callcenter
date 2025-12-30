import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "동행콜센터 | 대리운전 탁송 콜위탁 전문",
  description: "24시간 운영, 업계 최고 합리적인 수수료, 경력 상담사 다수. 대리운전, 탁송, 콜위탁, 기사모집, 법인대리, 일일기사 전문 콜센터",
  keywords: "대리운전, 탁송, 콜위탁, 콜센터, 기사모집, 법인대리, 일일기사, 동행콜센터",
  openGraph: {
    title: "동행콜센터 | 대리운전 탁송 콜위탁 전문",
    description: "24시간 운영, 업계 최고 합리적인 수수료, 경력 상담사 다수",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
