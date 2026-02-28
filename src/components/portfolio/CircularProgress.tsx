import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  color?: string;
}

const CircularProgress = ({ percentage, size = 140, strokeWidth = 8, label, color }: CircularProgressProps) => {
  const { ref, isInView } = useInView(0.3);
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setProgress(percentage), 200);
    return () => clearTimeout(timer);
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color || "hsl(var(--accent))"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-[2000ms] ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-data text-2xl font-bold" style={{ color: "hsl(var(--dark-fg))" }}>
            {isInView ? percentage : 0}%
          </span>
        </div>
      </div>
      <span className="text-sm font-medium text-center" style={{ color: "hsl(var(--dark-fg))" }}>{label}</span>
    </div>
  );
};

export default CircularProgress;
