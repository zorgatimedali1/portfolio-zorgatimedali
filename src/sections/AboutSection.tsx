import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";
import FloatingBadge from "@/components/FloatingBadge";
import { useInView } from "@/hooks/useInView";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { end: 15, suffix: "+", label: "Projects" },
  { end: 12, suffix: "+", label: "Technologies" },
  { end: 4, suffix: "", label: "Years Coding" },
  { end: 50, suffix: "+", label: "Contributions" },
];

export default function AboutSection() {
  const { ref: sectionRef } = useInView(0.1);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    gsap.fromTo(
      leftRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );

    gsap.fromTo(
      rightRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-deep-navy py-[clamp(80px,12vh,140px)] overflow-x-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:pl-[0vw] lg:pr-0">
        <SectionHeading label="PROFILE" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 mt-12">
          {/* Left Column */}
          <div ref={leftRef} className="opacity-0">
            <div className="space-y-5">
              <p className="font-inter text-[1.05rem] text-text-secondary leading-[1.75]">
                I&apos;m a passionate Software Engineering student specializing in full-stack development,
                mobile applications, and AI integration. I build modern, scalable systems with a
                product-oriented mindset.
              </p>
              <p className="font-inter text-[1.05rem] text-text-secondary leading-[1.75]">
                My technical toolkit spans Flutter, React, Angular, and Spring Boot — enabling me to
                craft seamless experiences across web and mobile platforms.
              </p>
              <p className="font-inter text-[1.05rem] text-text-secondary leading-[1.75]">
                Whether it&apos;s an AI-powered movie recommendation engine or a real-time budget
                management app, I thrive on turning complex challenges into elegant, user-centric
                solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10">
              {stats.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={i * 200}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightRef} className="relative opacity-0">
            <div className="glass-card-strong p-6 relative">
              <img
                src="/images/photo pro linkedin.png"
                alt="Mohamed Ali Zorgati"
                className="w-full aspect-[3/4] object-cover rounded-xl"
                loading="lazy"
              />
              <FloatingBadge
                text="Available for work"
                variant="green"
                className="-top-3 -right-3"
              />
              <FloatingBadge
                text="Tunisia based"
                variant="cyan"
                className="-bottom-3 -left-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
