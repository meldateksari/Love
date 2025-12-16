export type ElapsedTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
};

export function getElapsedTimeSince(
    startISO: string,
    now: Date = new Date()
): ElapsedTime {
    const start = new Date(startISO);
    const diffMs = Math.max(0, now.getTime() - start.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, totalSeconds };
}
