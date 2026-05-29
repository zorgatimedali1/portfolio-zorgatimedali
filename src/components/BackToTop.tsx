import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { gsap } from "gsap";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.querySelector(".back-to-top-btn");
    if (!el) return;
    if (visible) {
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.out" });
    }
  }, [visible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top-btn fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-electric-blue/90 text-text-primary flex items-center justify-center opacity-0 scale-80 hover:bg-electric-blue hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}
