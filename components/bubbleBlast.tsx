"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

interface BubbleBlastProps {
  trigger: boolean;
  onComplete?: () => void;
}

export default function BubbleBlast({ trigger, onComplete }: BubbleBlastProps) {
  useEffect(() => {
    if (trigger) {
      // Run multiple bursts for the "bubble blast" feel
      const duration = 2000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#34d399", "#3b82f6", "#facc15", "#f472b6"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#34d399", "#3b82f6", "#facc15", "#f472b6"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else if (onComplete) {
          onComplete();
        }
      })();
    }
  }, [trigger, onComplete]);

  return null; // no DOM needed, it just draws on a hidden canvas
}
