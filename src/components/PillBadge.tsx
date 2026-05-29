interface PillBadgeProps {
  text: string;
  variant?: "default" | "green" | "cyan";
}

export default function PillBadge({ text, variant = "default" }: PillBadgeProps) {
  const variantClasses = {
    default: "bg-electric-blue/10 text-electric-blue border-electric-blue/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    cyan: "bg-cyan-500/10 text-cyan-accent border-cyan-500/20",
  };

  return (
    <span className={`inline-block font-space text-[0.65rem] border rounded-md px-3 py-1 ${variantClasses[variant]}`}>
      {text}
    </span>
  );
}
