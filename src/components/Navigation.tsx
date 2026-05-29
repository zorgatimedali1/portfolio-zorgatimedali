import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollContext } from "@/context/ScrollContext";
import gsap from "gsap";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { isScrolled, activeSection } = useScrollContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      const links = document.querySelectorAll(".mobile-nav-link");
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ease-out ${
          isScrolled ? "nav-scrolled" : "bg-transparent border-b border-electric-blue/5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-5 sm:px-10 lg:pl-[0vw] lg:pr-0">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="relative hidden sm:block lg:-ml-16"
          >
            <span className="absolute -top-2 -left-2 w-16 h-16 bg-electric-blue/10 blur-[30px] rounded-full" />
            <div className="relative z-10 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "#050816",
                  border: "1px solid rgba(59,130,246,0.3)",
                  boxShadow: "0 0 15px rgba(59,130,246,0.15), inset 0 0 20px rgba(59,130,246,0.05)",
                }}
              >
                <span className="font-inter font-black text-xl text-text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                  M
                </span>
              </div>
              <span className="font-inter font-bold text-2xl tracking-[0.15em] drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] text-electric-blue leading-none align-middle">ZORGATI</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative font-inter text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 py-2"
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-electric-blue transition-all duration-300 ease-out ${
                    activeSection === item.href.slice(1) ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] bg-deep-navy/97 backdrop-blur-[30px] flex flex-col items-center justify-center">
          <button
            className="absolute top-5 right-5 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="mobile-nav-link font-inter text-2xl font-semibold text-text-primary hover:text-electric-blue transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
