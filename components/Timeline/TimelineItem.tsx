"use client";
// src/components/Timeline/TimelineItem.tsx
import React, { useEffect, useRef, useState } from "react";
import type { TimelineItemType } from "../../data/timelineData";

type TimelineItemProps = {
    item: TimelineItemType;
    index: number;
};

const accentStyles: Record<NonNullable<TimelineItemType["accent"]>, string> = {
    rose: "from-rose-200/70 to-rose-50/70 border-rose-100",
    peach: "from-orange-200/60 to-rose-50/60 border-orange-100",
    cream: "from-amber-100/60 to-rose-50/60 border-amber-100",
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, index }) => {
    const ref = useRef<HTMLLIElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect(); // once
                }
            },
            { root: null, threshold: 0.18 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    const accent = item.accent ?? (index % 2 === 0 ? "rose" : "cream");

    return (
        <li
            ref={ref}
            className={[
                "relative grid grid-cols-[24px_1fr] gap-4",
                "transition-all duration-700 will-change-transform",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
        >
            {/* Dot */}
            <div className="relative flex items-start justify-center">
                <span
                    className={[
                        "mt-2 h-3.5 w-3.5 rounded-full",
                        "bg-rose-400 shadow-sm ring-4 ring-rose-100/70",
                    ].join(" ")}
                    aria-hidden="true"
                />
            </div>

            {/* Card */}
            <article
                className={[
                    "rounded-2xl border bg-gradient-to-br",
                    "px-5 py-4 shadow-sm",
                    accentStyles[accent],
                ].join(" ")}
                aria-label={`${item.dateLabel} - ${item.title}`}
            >
                <header className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs tracking-wide text-rose-700/80">
                        {item.dateLabel}
                    </p>

                    {item.tag ? (
                        <span className="text-xs rounded-full bg-white/60 border border-white/70 px-2 py-1 text-rose-800/80">
                            {item.tag}
                        </span>
                    ) : null}
                </header>

                <h3 className="mt-2 text-lg sm:text-xl font-semibold text-rose-950">
                    {item.title}
                </h3>

                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-rose-900/80">
                    {item.description}
                </p>
            </article>
        </li>
    );
};
