import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Smartphone,
  Server,
  Database,
  Wrench,
  BrainCircuit,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { skills, skillCategories } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code2,
  Mobile: Smartphone,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  "AI / Algorithms": BrainCircuit,
};

const categoryColors: Record<string, string> = {
  Frontend: "#3b82f6",
  Mobile: "#06b6d4",
  Backend: "#8b5cf6",
  Database: "#f59e0b",
  Tools: "#10b981",
  "AI / Algorithms": "#ec4899",
};

const allTechs = skills.map((s) => s.name);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const grouped = useMemo(() => {
    const map: Record<string, typeof skills> = {};
    skillCategories.forEach((cat) => {
      map[cat] = skills.filter((s) => s.category === cat);
    });
    return map;
  }, []);

  const filteredCategories = useMemo(() => {
    if (activeFilter === "All") return skillCategories;
    return skillCategories.filter((cat) => cat === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".skill-category-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      }
    );
  }, [filteredCategories]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-gradient-section py-[clamp(80px,12vh,140px)] overflow-x-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:pl-[0vw] lg:pr-0">
        <SectionHeading
          label="SKILLS"
          title="My Tech Stack"
          subtitle="Technologies & tools I use to bring ideas to life"
        />

        {/* Category Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category];
            const color = categoryColors[category];
            const categorySkills = grouped[category];

            return (
              <div
                key={category}
                className="skill-category-card rounded-2xl p-6 flex flex-col"
                style={{
                  background: "rgba(11, 17, 32, 0.6)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${color}20`,
                  boxShadow: `0 0 40px ${color}08, inset 0 0 60px ${color}04`,
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <h3
                      className="font-inter text-base font-semibold"
                      style={{ color }}
                    >
                      {category}
                    </h3>
                    <span className="font-space text-[0.6rem] uppercase tracking-[0.1em] text-text-muted">
                      {categorySkills.length} skill{categorySkills.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4 flex-1">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-inter text-sm font-medium text-text-primary">
                          {skill.name}
                        </span>
                        <span
                          className="font-space text-xs tabular-nums"
                          style={{ color }}
                        >
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ background: `${color}15` }}
                      >
                        <SkillBar proficiency={skill.proficiency} color={color} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Marquee + Filters */}
      <div className="mt-16 max-w-[1400px] mx-auto px-5 sm:px-10 lg:pl-[0vw] lg:pr-0">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["All", ...skillCategories].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="font-inter text-xs font-medium px-4 py-2 rounded-full transition-all duration-300"
              style={{
                background:
                  activeFilter === f
                    ? `${categoryColors[f] || "#3b82f6"}20`
                    : "rgba(255,255,255,0.04)",
                color:
                  activeFilter === f
                    ? categoryColors[f] || "#3b82f6"
                    : "#94a3b8",
                border: `1px solid ${
                  activeFilter === f
                    ? `${categoryColors[f] || "#3b82f6"}40`
                    : "rgba(255,255,255,0.06)"
                }`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-4 border-t border-b border-electric-blue/5">
          <div className="marquee-track flex gap-10 whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-10 items-center">
                {allTechs.map((tech) => (
                  <span
                    key={tech}
                    className="font-space text-[0.7rem] uppercase tracking-[0.12em] text-text-muted/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}

function SkillBar({ proficiency, color }: { proficiency: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${proficiency}%`,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 90%",
        },
      }
    );
  }, [proficiency]);

  return (
    <div
      ref={barRef}
      className="h-full rounded-full"
      style={{
        width: "0%",
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        boxShadow: `0 0 8px ${color}40`,
      }}
    />
  );
}
