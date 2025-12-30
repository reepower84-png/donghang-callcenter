"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Smooth scroll function
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// CTA Button Component
const CTAButton = ({ className = "" }: { className?: string }) => (
  <button
    onClick={() => scrollToSection("contact")}
    className={`btn-primary text-white font-bold py-4 px-8 rounded-full text-lg cursor-pointer ${className}`}
  >
    무료 상담 신청하기
  </button>
);

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
        >
          <Image
            src="/동행콜센터_로고_가로_1-removebg-preview.png"
            alt="동행콜센터 로고"
            width={180}
            height={50}
            className={`h-10 w-auto transition-all ${
              isScrolled ? "" : "brightness-0 invert"
            }`}
            priority
          />
        </button>
        <div className="flex items-center gap-6">
          <a
            href="tel:1600-7398"
            className={`font-bold text-lg ${
              isScrolled ? "text-[var(--primary)]" : "text-white"
            }`}
          >
            1600-7398
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-secondary text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
          >
            문의하기
          </button>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[#2563eb] to-[var(--primary-dark)] overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
      {/* Award Badge */}
      <div className="inline-block mb-8 animate-fade-in-up">
        <div className="bg-[var(--secondary)] text-white px-6 py-3 rounded-full font-bold text-sm md:text-base badge-glow animate-pulse-gentle">
          <span className="mr-2">&#127942;</span>
          대한검경연합신문 2년 연속 브랜드대상
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        대리운전 · 탁송 콜위탁
        <br />
        <span className="text-[var(--secondary)]">동행콜센터</span>와 함께
      </h1>

      <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        24시간 전문 상담, 업계 최고 수익 보장
        <br />
        경력 상담사가 함께합니다
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        <CTAButton />
        <a
          href="tel:1600-7398"
          className="bg-white text-[var(--primary)] font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all"
        >
          <span className="mr-2">&#128222;</span>
          1600-7398
        </a>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[var(--secondary)]">24h</div>
          <div className="text-sm md:text-base mt-2 opacity-80">연중무휴 운영</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[var(--secondary)]">LOW</div>
          <div className="text-sm md:text-base mt-2 opacity-80">최저 취소율</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-[var(--secondary)]">TOP</div>
          <div className="text-sm md:text-base mt-2 opacity-80">합리적 수수료</div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
        <div className="w-1 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  </section>
);

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: "&#128337;",
      title: "24시간 운영",
      description: "연중무휴 24시간 전문 상담사가 대기하고 있습니다. 언제든 문의 가능합니다.",
    },
    {
      icon: "&#128200;",
      title: "업계 최저 취소율",
      description: "철저한 콜 관리 시스템으로 취소율을 최소화하여 안정적인 운영을 보장합니다.",
    },
    {
      icon: "&#128176;",
      title: "합리적인 수수료",
      description: "업계 최고 수준의 합리적인 수수료 정산으로 수익을 극대화하세요.",
    },
    {
      icon: "&#128100;",
      title: "경력 상담사 다수",
      description: "대리운전·탁송 업계 경력 5년 이상의 전문 상담사들이 함께합니다.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--gray-50)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-800)] section-title">
            왜 동행콜센터인가요?
          </h2>
          <p className="mt-6 text-[var(--gray-600)] text-lg">
            수년간의 노하우로 최고의 서비스를 제공합니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg service-card text-center"
            >
              <div
                className="w-16 h-16 mx-auto mb-6 bg-[var(--primary)] rounded-2xl flex items-center justify-center feature-icon"
                dangerouslySetInnerHTML={{ __html: `<span class="text-3xl">${feature.icon}</span>` }}
              />
              <h3 className="text-xl font-bold text-[var(--gray-800)] mb-3">
                {feature.title}
              </h3>
              <p className="text-[var(--gray-600)]">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <CTAButton />
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "대리운전 콜위탁",
      description: "안정적인 콜 공급으로 수익 극대화",
      icon: "&#128663;",
    },
    {
      title: "탁송 콜위탁",
      description: "전국 네트워크 탁송 콜 연결",
      icon: "&#128666;",
    },
    {
      title: "기사 모집",
      description: "우수 기사 모집 및 관리 대행",
      icon: "&#128101;",
    },
    {
      title: "법인대리",
      description: "기업 전용 대리운전 서비스",
      icon: "&#127970;",
    },
    {
      title: "일일기사",
      description: "필요할 때 언제든 기사 배정",
      icon: "&#128197;",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-800)] section-title">
            서비스 분야
          </h2>
          <p className="mt-6 text-[var(--gray-600)] text-lg">
            다양한 분야에서 전문 서비스를 제공합니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border-2 border-[var(--gray-200)] hover:border-[var(--primary)] transition-all cursor-pointer service-card"
            >
              <div
                className="text-4xl mb-4 group-hover:scale-110 transition-transform"
                dangerouslySetInnerHTML={{ __html: service.icon }}
              />
              <h3 className="text-lg font-bold text-[var(--gray-800)] mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--gray-600)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Award Section
const AwardSection = () => (
  <section className="py-20 bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-dark)]">
    <div className="max-w-7xl mx-auto px-4 text-center text-white">
      <div className="inline-block mb-6">
        <span className="text-6xl">&#127942;</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        대한검경연합신문
      </h2>
      <p className="text-5xl md:text-7xl font-extrabold mb-4">
        2년 연속 브랜드대상
      </p>
      <p className="text-xl opacity-90 mb-8">
        신뢰와 품질로 인정받은 동행콜센터
      </p>
      <CTAButton className="bg-white !text-[var(--secondary)] hover:bg-gray-100" />
    </div>
  </section>
);

// Contact Form Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    inquiry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
        });
        setFormData({ name: "", phone: "", inquiry: "" });
      } else {
        setSubmitResult({
          success: false,
          message: result.error || "문의 접수에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[var(--gray-50)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-800)] section-title">
            무료 상담 신청
          </h2>
          <p className="mt-6 text-[var(--gray-600)] text-lg">
            문의 주시면 빠르게 연락드리겠습니다
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="mb-6">
              <label className="block text-[var(--gray-800)] font-semibold mb-2">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="이름을 입력해주세요"
                className="w-full px-4 py-3 border-2 border-[var(--gray-200)] rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[var(--gray-800)] font-semibold mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="010-0000-0000"
                className="w-full px-4 py-3 border-2 border-[var(--gray-200)] rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>

            <div className="mb-6">
              <label className="block text-[var(--gray-800)] font-semibold mb-2">
                문의 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                required
                rows={4}
                placeholder="문의 내용을 입력해주세요"
                className="w-full px-4 py-3 border-2 border-[var(--gray-200)] rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors resize-none"
              />
            </div>

            {submitResult && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  submitResult.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {submitResult.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-white font-bold py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "접수 중..." : "상담 신청하기"}
            </button>
          </form>

          {/* Direct Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-[var(--gray-600)] mb-4">
              또는 직접 연락주세요
            </p>
            <a
              href="tel:1600-7398"
              className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--primary)]"
            >
              <span>&#128222;</span>
              1600-7398
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-[var(--gray-800)] text-white py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <a href="/" className="inline-block mb-4">
            <Image
              src="/동행콜센터_로고_가로_1-removebg-preview.png"
              alt="동행콜센터 로고"
              width={150}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
          </a>
          <p className="text-gray-400">
            대리운전 · 탁송 콜위탁 전문
            <br />
            24시간 연중무휴 운영
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">연락처</h4>
          <p className="text-gray-400 mb-2">
            <span className="mr-2">&#128222;</span>
            대표전화: 1600-7398
          </p>
          <p className="text-gray-400">
            <span className="mr-2">&#127968;</span>
            인천광역시 계양구 장제로1009번길 4-1, 2층(박촌동)
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">서비스</h4>
          <ul className="text-gray-400 space-y-2">
            <li>대리운전 콜위탁</li>
            <li>탁송 콜위탁</li>
            <li>기사 모집</li>
            <li>법인대리 / 일일기사</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} 동행콜센터. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Floating CTA Button
const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="tel:1600-7398"
        className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <span className="text-2xl text-white">&#128222;</span>
      </a>
      <button
        onClick={() => scrollToSection("contact")}
        className="w-14 h-14 bg-[var(--secondary)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
      >
        <span className="text-2xl text-white">&#9993;</span>
      </button>
    </div>
  );
};

// Main Page Component
export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <AwardSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
