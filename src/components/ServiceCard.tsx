import { Layers, Smartphone, Server, BrainCircuit, Palette, Cloud } from "lucide-react";
import { type Service } from "@/data/services";
import PillBadge from "./PillBadge";

const iconMap: Record<string, React.ElementType> = {
  "Full Stack Development": Layers,
  "Mobile App Development": Smartphone,
  "Backend API Development": Server,
  "AI Integration": BrainCircuit,
  "UI/UX Engineering": Palette,
  "Cloud & DevOps": Cloud,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.name] || Layers;

  return (
    <div className="shimmer-card group">
      <div className="shimmer-card-inner">
        <Icon
          className="w-10 h-10 text-electric-blue mb-5 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        />
        <h3 className="font-inter text-xl font-semibold text-text-primary">
          {service.name}
        </h3>
        <p className="font-inter text-[0.9rem] text-text-secondary leading-relaxed mt-2.5">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {service.tags.map((tag) => (
            <PillBadge key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
