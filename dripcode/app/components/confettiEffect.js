"use client";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function ConfettiEffect() {
  useEffect(() => {
    // Define the Acme palette
    const acmeColors = ["#6366f1", "#06b6d4", "#ffffff", "#94a3b8"];

    // Function to fire a burst
    const fire = (particleRatio, opts) => {
      confetti({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
        colors: acmeColors,
        zIndex:1000
      });
    };

    // Professional sequence: Heavy burst then light flurries
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

  }, []);

  return null;
}

