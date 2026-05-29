import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({ label, title, subtitle, centered = false, className }: SectionHeadingProps) {
  const { ref, isInView } = useInView(0.15);

  return (
    <div
      ref={ref}
      className={cn("mb-12", centered && "text-center", className)}
    >
      <div
        className={cn(
          "inline-block font-space text-[0.7rem] tracking-[0.15em] uppercase bg-electric-blue/10 text-electric-blue px-4 py-1.5 rounded-full mb-3 transition-all duration-600",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {label}
      </div>
      <h2
        className={cn(
          "font-inter text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.02em] leading-[1.15] text-text-primary transition-all duration-700 delay-100",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2 font-inter text-[1.05rem] text-text-muted max-w-[480px] leading-relaxed transition-all duration-700 delay-200",
            centered && "mx-auto",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
