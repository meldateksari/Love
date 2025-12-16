// src/components/Timeline/Timeline.tsx
import React, { useMemo } from "react";
import { TimelineItem } from "./TimelineItem";
import type { TimelineItemType } from "../../data/timelineData";

type TimelineProps = {
    items: TimelineItemType[];
    title?: string;
    subtitle?: string;
};

export const Timeline: React.FC<TimelineProps> = ({
    items,
    title = "askimmmmm",
    subtitle = "seni seviyorum",
}) => {
    const normalized = useMemo(() => {
        return [...items].filter(Boolean);
    }, [items]);

    return (
        <section
            aria-label="Timeline"
            className="relative isolate w-full bg-white/95 rounded-2xl p-6 sm:p-8"
        >
            <header className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-rose-950 tracking-tight">
                    {title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-rose-900/70">
                    {subtitle}
                </p>
            </header>

            <div className="relative">
                {/* Vertical line */}
                <div
                    className="absolute left-[11px] top-0 bottom-0 w-px bg-rose-200/70"
                    aria-hidden="true"
                />

                <ol className="space-y-5 sm:space-y-6">
                    {normalized.map((item, index) => (
                        <TimelineItem key={item.id} item={item} index={index} />
                    ))}
                </ol>
            </div>
        </section>
    );
};
