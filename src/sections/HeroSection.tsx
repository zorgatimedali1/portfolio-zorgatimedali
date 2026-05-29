import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";

const roles = ["Mobile Developer", "Software Engineer", "AI Enthusiast", "Full Stack Developer"];

const techNodes = [
  { name: "React", icon: "⚛️", x: 82, y: 22 },
  { name: "Flutter", icon: "🫀", x: 90, y: 48 },
  { name: "Spring Boot", icon: "🍃", x: 78, y: 74 },
  { name: "Python", icon: "🐍", x: 48, y: 88 },
  { name: "Firebase", icon: "🔥", x: 18, y: 68 },
  { name: "Node.js", icon: "🟢", x: 8, y: 38 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleTransition, setRoleTransition] = useState(false);
  const [lang, setLang] = useState("FR");

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll(".hero-animate");
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    if (!orbitRef.current) return;

    gsap.fromTo(
      orbitRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.6 }
    );
  }, []);

  useEffect(() => {
    if (!ringsRef.current) return;
    gsap.to(ringsRef.current, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleTransition(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setRoleTransition(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-deep-navy"
    >
      {/* Inline style to prevent flash before GSAP animates in */}
      <style>{`.hero-animate{opacity:0;transform:translateY(40px)}[data-orbit]{opacity:0;transform:scale(0.8)}`}</style>

      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-soft-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:pl-[-5vw] lg:pr-0 grid grid-cols-1 lg:grid-cols-[auto_1.4fr] gap-8 lg:gap-16 items-center">
        {/* =================== LEFT COLUMN =================== */}
        <div className="flex flex-col gap-6 pt-20 lg:pt-0">
          {/* Status Badge */}
          <div className="hero-animate flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="font-space text-[0.65rem] uppercase tracking-[0.15em] text-emerald-400/80">
              Available for opportunities
            </span>
          </div>

          {/* Greeting */}
          <span className="hero-animate font-inter text-xs font-semibold tracking-[0.2em] text-text-secondary">
            HELLO, I'M
          </span>

          {/* Name */}
          <h1 className="hero-animate leading-[1.05]">
            <span className="block font-inter font-black tracking-[-0.03em] text-text-primary text-[clamp(2.8rem,6.5vw,5rem)]">
              Mohamed Ali
            </span>
            <span className="block font-inter font-black tracking-[-0.03em] text-text-primary text-[clamp(2.8rem,6.5vw,5rem)]">
              Zorgati
            </span>
          </h1>

          {/* Subheading */}
          <div className="hero-animate flex items-center gap-3">
            <span className="w-6 h-[2px] bg-electric-blue" />
            <span
              className="font-inter text-base font-medium text-electric-blue block relative"
              style={{
                transition: "all 0.4s ease-out",
                transform: roleTransition
                  ? ["translateY(-12px)", "translateY(12px)", "scale(0.8)", "translateX(16px)", "translateX(-16px)", "rotateX(90deg)"][roleIndex % 6]
                  : "translateY(0) scale(1) translateX(0) rotateX(0)",
                opacity: roleTransition ? 0 : 1,
                filter: roleTransition ? "blur(4px)" : "blur(0)",
              }}
            >
              {roles[roleIndex]}
            </span>
          </div>

          {/* Bio */}
          <p className="hero-animate font-inter text-[0.95rem] text-text-secondary leading-relaxed max-w-[480px]">
            Crafting high-performance mobile apps, modern web interfaces, and AI-driven
            solutions. I turn complex ideas into seamless digital experiences.
          </p>

          {/* CTAs */}
          <div className="hero-animate flex items-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-electric-blue text-text-primary font-inter text-sm font-semibold px-6 py-3 rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] transition-all duration-300"
            >
              View Projects
              <ArrowUpRight size={16} />
            </a>
            <div className="flex items-center gap-2">
              <a
                href={lang === "FR" ? "/cv/CV_ZorgatiMohamedAli_FR.pdf" : "/cv/CV_ZorgatiMohamedAli_EN.pdf"}
                download
                className="inline-flex items-center gap-2 text-text-secondary hover:text-electric-blue font-inter text-sm font-medium transition-colors duration-300"
              >
                <Download size={16} />
                Download CV
              </a>
              <div className="flex items-center gap-1 ml-1 border-l border-electric-blue/20 pl-2">
                {["FR", "EN"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`font-space text-[0.6rem] uppercase tracking-[0.1em] px-2 py-1 rounded transition-all duration-200 ${
                      lang === l
                        ? "text-electric-blue bg-electric-blue/10"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="hero-animate flex items-center gap-4 mt-2">
            <span className="font-space text-[0.6rem] uppercase tracking-[0.15em] text-text-muted">
              Find me online
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/zorgatimedali1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-electric-blue transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-ali-zorgati-b00b6b25b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-electric-blue transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* =================== RIGHT COLUMN =================== */}
        <div ref={orbitRef} className="relative flex flex-col items-center py-10">
          {/* Tech Orbit */}
          <div className="relative w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] flex items-center justify-center lg:ml-auto">
            {/* Rings */}
            <div ref={ringsRef} className="absolute inset-0">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(59,130,246,0.08)",
                  boxShadow: "0 0 100px rgba(59,130,246,0.04), inset 0 0 100px rgba(59,130,246,0.02)",
                }}
              />
              <div
                className="absolute inset-[15%] rounded-full"
                style={{
                  border: "1px solid rgba(139,92,246,0.1)",
                  boxShadow: "0 0 80px rgba(139,92,246,0.04), inset 0 0 80px rgba(139,92,246,0.02)",
                }}
              />
              <div
                className="absolute inset-[30%] rounded-full"
                style={{
                  border: "1px solid rgba(6,182,212,0.12)",
                  boxShadow: "0 0 60px rgba(6,182,212,0.04), inset 0 0 60px rgba(6,182,212,0.02)",
                }}
              />
              {/* Orbital Dots */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${deg}deg) translateX(195px) rotate(-${deg}deg)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-electric-blue/40 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                </div>
              ))}
            </div>

            {/* Center Monogram */}
            <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 0 80px rgba(59,130,246,0.1), inset 0 0 80px rgba(59,130,246,0.05)",
              }}
            >
              <span className="font-inter font-black text-5xl sm:text-6xl text-text-primary drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
                M
              </span>
            </div>

            {/* Floating Tech Nodes */}
            {techNodes.map((node) => (
              <div
                key={node.name}
                className="absolute flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  top: `${node.y}%`,
                  left: `${node.x}%`,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(11,17,32,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(59,130,246,0.12)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
                }}
              >
                <span className="text-base">{node.icon}</span>
                <span className="font-space text-[0.65rem] uppercase tracking-[0.08em] text-text-secondary">
                  {node.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
