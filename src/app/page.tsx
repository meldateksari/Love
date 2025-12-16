"use client";

import React from "react";
import { DayCounter } from "@/components/Counter/DayCounter";
import { Timeline } from "@/components/Timeline/Timeline";
import { timelineData } from "@/data/timelineData";
import { HeartAnimation } from "@/components/UI/HeartAnimation";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent font-[family-name:var(--font-crimson)]">

      {/* 1) Arka Plan Animasyonu */}

      {/* 2) Tüm sayfayı kaplayan hafif bir sis perdesi (Yazıların okunması için) */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-white/40 backdrop-blur-md" />

      {/* 3) ANA İÇERİK KUTUSU */}
      <div className="relative z-10 mx-auto min-h-screen flex flex-col items-center justify-center p-4 py-12 sm:py-20">

        {/* Kalpler */}

        {/* --- CAM KART BAŞLANGICI --- */}
        {/* Bu div, tüm içeriği beyaz, yarı saydam bir kutuya alır */}
        <div className="relative z-10 w-full max-w-2xl bg-white/90 shadow-2xl rounded-3xl border border-rose-100 p-6 sm:p-10">

          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-5xl font-bold text-rose-950 tracking-tight drop-shadow-sm">
              <span className="text-rose-700">♡ Sana Sürprizim</span>{" "}
              <span className="text-rose-600">♡</span>
            </h1>
            <p className="mt-4 text-lg text-rose-900/80 italic">
              "İyi ki varsın..."
            </p>
          </header>

          {/* Sayaç Bölümü */}
          <section className="mb-12">
            {/* DayCounter bileşenine stil geçmiyor olabilir, onu bir div ile sarmalıyoruz */}
            <div className="bg-white/50 rounded-2xl p-6 shadow-sm border border-rose-100/50">
              <DayCounter startDateISO="2025-07-09" />
            </div>
          </section>

          {/* Timeline Bölümü */}
          <section className="space-y-8">
            <Timeline items={timelineData} />
          </section>

          <footer className="mt-16 pt-6 border-t border-rose-200 text-center text-sm text-rose-800/70">
            <p>
              İyi ki demenin en sakin hâli:{" "}
              <span className="text-rose-700 font-bold">sen</span>.
            </p>
          </footer>

        </div>
        {/* --- CAM KART BİTİŞİ --- */}

      </div>
    </main>
  );
}