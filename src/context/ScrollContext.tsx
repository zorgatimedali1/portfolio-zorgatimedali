import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ScrollContextType {
  isScrolled: boolean;
  scrollY: number;
  scrollProgress: number;
  activeSection: string;
  isLoaded: boolean;
  setIsLoaded: (v: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  isScrolled: false,
  scrollY: 0,
  scrollProgress: 0,
  activeSection: "home",
  isLoaded: false,
  setIsLoaded: () => {},
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrollY(y);
    setIsScrolled(y > 100);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? y / docHeight : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const ids = ["home", "about", "projects", "experience", "skills", "services", "contact"];

    const update = () => {
      const navH = 80;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= navH + 100) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        isScrolled,
        scrollY,
        scrollProgress,
        activeSection,
        isLoaded,
        setIsLoaded,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
