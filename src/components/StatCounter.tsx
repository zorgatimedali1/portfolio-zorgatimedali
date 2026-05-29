import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}

export default function StatCounter({ end, suffix = "", label, delay = 0 }: StatCounterProps) {
  const { ref, isInView } = useInView(0.3);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const startTime = performance.now();
    const startDelay = delay;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime - startDelay;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-inter text-3xl md:text-[2rem] font-bold text-text-primary">
        {count}
        {suffix}
      </div>
      <div className="font-space text-[0.7rem] text-text-muted uppercase tracking-[0.1em] mt-1">
        {label}
      </div>
    </div>
  );
}
