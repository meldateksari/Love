// src/utils/dateUtils.ts

/**
 * Returns date parts (year, month, day) for a given date in a specific IANA timezone.
 * Using Intl avoids manual UTC offset issues (DST vs. fixed offset).
 */
export function getDatePartsInTimeZone(
    date: Date,
    timeZone: string
): { year: number; month: number; day: number } {
    const dtf = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    // en-CA => YYYY-MM-DD
    const [y, m, d] = dtf.format(date).split("-").map(Number);
    return { year: y, month: m, day: d };
}

/**
 * Creates a "virtual midnight" Date for the given timezone date parts.
 * We create a UTC date from the timezone's YYYY-MM-DD at 00:00.
 * This makes day-diff stable and integer-based.
 */
export function toTimeZoneMidnightUTC(date: Date, timeZone: string): Date {
    const { year, month, day } = getDatePartsInTimeZone(date, timeZone);
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

/**
 * Calculates full-day difference between start and now based on timezone midnights.
 * If start is in the future, returns 0.
 */
export function getDaysSince(
    startDateISO: string, // e.g. "2025-07-09"
    now: Date = new Date(),
    timeZone: string = "Europe/Istanbul"
): number {
    const start = new Date(`${startDateISO}T00:00:00.000Z`); // base anchor
    const startMidnight = toTimeZoneMidnightUTC(start, timeZone);
    const nowMidnight = toTimeZoneMidnightUTC(now, timeZone);

    const msPerDay = 24 * 60 * 60 * 1000;
    const diff = Math.floor((nowMidnight.getTime() - startMidnight.getTime()) / msPerDay);
    return Math.max(0, diff);
}

/**
 * Returns ms until next "timezone midnight" to update counter daily.
 */
export function msUntilNextTimeZoneMidnight(
    now: Date = new Date(),
    timeZone: string = "Europe/Istanbul"
): number {
    const nowMidnight = toTimeZoneMidnightUTC(now, timeZone);
    const nextMidnight = new Date(nowMidnight.getTime() + 24 * 60 * 60 * 1000);

    // We need the user's "current moment" aligned to timezone date parts:
    // Convert now to timezone midnight UTC + time since timezone midnight.
    // Approach: build timezone "today" midnight UTC, then compute elapsed since it using actual "now" mapped to parts
    // For daily tick, a pragmatic approximation is enough: schedule a short interval check too.
    const elapsed = now.getTime() - nowMidnight.getTime();
    return Math.max(1000, nextMidnight.getTime() - nowMidnight.getTime() - elapsed);
}
