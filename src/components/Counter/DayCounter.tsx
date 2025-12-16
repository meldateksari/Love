"use client";

import React, { useEffect, useState, useMemo } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility: ClassName Birleştirici (Önerilir) ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Hook: Zaman Hesaplayıcı (Mantık aynı kaldı) ---
function useTimeElapsed(startDateISO: string) {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const elapsed = useMemo(() => {
        if (!now) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const start = new Date(startDateISO).getTime();
        const current = now.getTime();
        const diff = current - start;

        if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }, [now, startDateISO]);

    return { elapsed, isMounted: !!now };
}

// --- Sub-Component: Tekil Zaman Birimi ---
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center rounded-lg bg-rose-50/50 p-2 sm:p-3 border border-rose-100/50 min-w-[60px] sm:min-w-[72px]">
        <span className="font-mono text-xl sm:text-2xl font-bold text-rose-600 tabular-nums leading-none">
            {String(value).padStart(2, "0")}
        </span>
        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-rose-400 mt-1">
            {label}
        </span>
    </div>
);

// --- Main Component ---
type DayCounterProps = {
    startDateISO?: string;
    title?: string;
    footerText?: string;
    className?: string;
};

export const DayCounter: React.FC<DayCounterProps> = ({
    startDateISO = "2025-07-09T00:00:00",
    title = "Birlikte geçen zamanımız <3",
    footerText = "Zaman akıyor, biz aynı yerdeyiz.",
    className,
}) => {
    const { elapsed, isMounted } = useTimeElapsed(startDateISO);

    // Skeleton Loading
    if (!isMounted) {
        return (
            <div className={cn("animate-pulse h-32 w-full rounded-2xl bg-rose-50/30", className)} />
        );
    }

    return (
        <section
            aria-label="Sayaç"
            className={cn(
                "relative w-full overflow-hidden rounded-2xl border border-rose-100",
                "bg-white/80 backdrop-blur-md shadow-sm transition-all hover:shadow-md",
                "px-6 py-6 sm:px-8",
                className
            )}
        >
            {/* Başlık ve Kalp İkonu */}
            <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-rose-800/70 truncate">
                    {title}
                </h3>

                {/* İstenilen Değişiklik: Kalp Şeklinde SVG İkonu */}
                <svg
                    className="h-4 w-4 text-rose-400 fill-current animate-pulse flex-shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path d="M11.645 20.91l-.007-.003c-.125-.063-.239-.122-.381-.199a19.861 19.861 0 01-2.54-1.636c-1.312-.96-2.614-2.08-3.692-3.469C3.954 14.21 3 12.417 3 10.42c0-2.454 1.958-4.42 4.35-4.42 1.45 0 2.737.73 3.65 1.822C11.913 6.73 13.2 6 14.65 6c2.392 0 4.35 1.966 4.35 4.42 0 1.997-.954 3.79-2.025 5.183-1.078 1.388-2.38 2.508-3.693 3.469a19.828 19.828 0 01-2.539 1.636 3.215 3.215 0 01-.382.199l-.007-.003c-.188.097-.431.146-.667.146a1 1 0 01-.667-.146h.002z" />
                </svg>
            </div>

            {/* Zaman Grid Yapısı */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                <TimeUnit value={elapsed.days} label="Gün" />
                <TimeUnit value={elapsed.hours} label="Saat" />
                <TimeUnit value={elapsed.minutes} label="Dk" />
                <TimeUnit value={elapsed.seconds} label="Sn" />
            </div>

            {/* Alt Metin */}
            {footerText && (
                <div className="mt-5 border-t border-rose-100 pt-3 text-center">
                    <p className="text-sm italic text-rose-700/60 font-medium">
                        "{footerText}"
                    </p>
                </div>
            )}
        </section>
    );
};