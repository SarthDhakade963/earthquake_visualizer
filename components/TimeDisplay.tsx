"use client";

export function TimeDisplay({ time }: { time: number }) {
  const formatted = new Date(time).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return <>{formatted}</>;
}
