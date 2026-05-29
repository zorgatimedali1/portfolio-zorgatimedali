import { cn } from "@/lib/utils";

interface FloatingBadgeProps {
  text: string;
  variant?: "green" | "cyan";
  className?: string;
}

export default function FloatingBadge({ text, variant = "green", className }: FloatingBadgeProps) {
  const variantClasses = {
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    cyan: "bg-cyan-500/10 text-cyan-accent border-cyan-500/20",
  };

  const dotColor = variant === "green" ? "bg-green-400" : "bg-cyan-accent";

  return (
    <div
      className={cn(
        "absolute animate-float font-space text-[0.65rem] border rounded-full px-3 py-1.5 flex items-center gap-2",
        variantClasses[variant],
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />
      {text}
    </div>
  );
}
