import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useScrollContext } from "@/context/ScrollContext";

export default function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { setIsLoaded } = useScrollContext();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        setIsLoaded(true);
      },
    });

    tl.to(textRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.6,
      ease: "power2.out",
    })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

    const fallback = setTimeout(() => {
      setVisible(false);
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(fallback);
  }, [setIsLoaded]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-deep-navy flex flex-col items-center justify-center"
    >
      <div ref={textRef} className="flex flex-col items-center gap-3">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center"
          style={{
            background: "#050816",
            border: "1px solid rgba(59,130,246,0.3)",
            boxShadow: "0 0 20px rgba(59,130,246,0.15)",
          }}
        >
          <span
            className="font-inter font-black text-3xl text-text-primary"
            style={{
              filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))",
            }}
          >
            M
          </span>
        </div>
        <span className="font-inter text-sm text-text-muted tracking-[0.15em]">
          ZORGATI
        </span>
      </div>
    </div>
  );
}
