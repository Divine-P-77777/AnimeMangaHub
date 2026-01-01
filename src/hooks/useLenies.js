"use client";

import { useEffect } from "react";
import Lenis from "lenis";
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (x) => 1 - Math.pow(1 - x, 3),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
