import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export const AnimatedNumber = ({ value, duration = 400 }: AnimatedNumberProps) => {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const animationRef = useRef<number | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const from = prevValue.current;
    const to = value;
    prevValue.current = value;

    if (from === to) return;

    if (spanRef.current) {
      spanRef.current.classList.remove("stat-bounce");
      void spanRef.current.offsetWidth;
      spanRef.current.classList.add("stat-bounce");
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);

      setDisplay(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return <span ref={spanRef} className="animated-number">{display}</span>;
};
