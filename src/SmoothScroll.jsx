import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // No inertia, instant stop
      
      // smoothWheel: true,
      // smoothTouch: true,
      wheelMultiplier: 1.0, // Normal scroll speed
      touchMultiplier: 1.0, // Normal touch speed
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
