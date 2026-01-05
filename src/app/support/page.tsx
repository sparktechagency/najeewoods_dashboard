import React from "react";
import logo from "@/assets/logo.svg";
import SupportBox from "@/components/common/home/support-box";

export default function Support() {
  return (
    <div className="min-h-screen">
      <div className="container relative z-10 max-w-4xl mx-auto px-6 mt-12 mb-14">
        <div className="flex flex-col items-center text-center animate-slide-up">
          <div className="inline-block backdrop-blur-2xl bg-[#202020] border rounded-2xl py-2 px-6 mb-4">
            <picture>
              <img src={logo.src} alt="Logo" className="p-3" />
            </picture>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl  font-bold mb-4">
            <span className="gradient-text">Support</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed">
            Your support is important to us, and so is your privacy. This
            document outlines how we collect, use, and protect your personal
            information
          </p>
        </div>
      </div>
      <SupportBox />
    </div>
  );
}
