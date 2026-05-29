import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { timelineItems } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  building: Briefcase,
};

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Animate each item
      const items = sectionRef.current!.querySelectorAll(".timeline-item");
      items.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          item,
          { x: window.innerWidth >= 768 ? (isLeft ? -30 : 30) : 0, y: window.innerWidth < 768 ? 30 : 0, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
            delay: i * 0.2,
          }
        );
      });

      // Animate dots
      const dots = sectionRef.current!.querySelectorAll(".timeline-dot");
      dots.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
            },
            delay: i * 0.2 + 0.2,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-gradient-experience py-[clamp(80px,12vh,140px)] px-5 sm:px-10 lg:px-20 overflow-x-hidden"
    >
      <div className="max-w-[960px] mx-auto">
        <SectionHeading label="JOURNEY" title="Education & Experience" />

        <div className="relative mt-16">
          {/* Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] origin-top"
            style={{
              background: "linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
              transform: "translateX(-50%) scaleY(0)",
            }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = iconMap[item.icon];
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-start">
                  {/* Dot */}
                  <div
                    className="timeline-dot absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-deep-navy border-2 border-electric-blue z-10"
                    style={{
                      transform: "translateX(-50%)",
                      boxShadow: "0 0 12px rgba(59, 130, 246, 0.6)",
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`timeline-item ml-12 md:ml-0 md:w-[calc(50%-40px)] glass-card p-0 opacity-0 overflow-hidden ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-stretch">
                      {item.photo && (
                        <div className="sm:w-[180px] shrink-0 flex items-center justify-center bg-deep-navy/50 p-4">
                          <img
                            src={item.photo}
                            alt={item.institution}
                            className="w-full h-auto max-h-[150px] object-contain"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-cyan-accent" />
                          <span className="font-space text-xs text-cyan-accent tracking-[0.08em]">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="font-inter text-lg font-semibold text-text-primary mt-2">
                          {item.title}
                        </h3>
                        <p className="font-inter text-sm text-text-secondary mt-1">
                          {item.institution}
                        </p>
                        <p className="font-inter text-sm text-text-muted mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
