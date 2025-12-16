"use client";

import React, { useEffect, useState } from "react";

type Heart = {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
    opacity: number;
};

type HeartAnimationProps = {
    density?: number;
    className?: string;
};

export const HeartAnimation: React.FC<HeartAnimationProps> = ({
    density = 10,
    className = "",
}) => {
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const generated: Heart[] = Array.from({ length: density }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 6,
            duration: 8 + Math.random() * 8,
            size: 10 + Math.random() * 14,
            opacity: 0.12 + Math.random() * 0.18,
        }));

        setHearts(generated);
        setMounted(true);
    }, [density]);

    // ⛔ Server + first render'da hiçbir şey çizme
    if (!mounted) return null;

    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(16px) scale(1); opacity: 0; }
          10%  { opacity: var(--o); }
          100% { transform: translateY(-120px) scale(1.08); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .heart-float { animation: none !important; }
        }
      `}</style>

            {hearts.map((h) => (
                <div
                    key={h.id}
                    className="heart-float absolute bottom-0 select-none"
                    style={{
                        left: `${h.left}%`,
                        animation: `floatUp ${h.duration}s ease-in-out ${h.delay}s infinite`,
                        fontSize: `${h.size}px`,
                        ["--o" as any]: h.opacity,
                        opacity: h.opacity,
                        filter: "blur(0.2px)",
                    }}
                >
                    <span className="text-rose-400/60">❤</span>
                </div>
            ))}
        </div>
    );
};
