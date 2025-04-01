
import React from "react";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  endorsements: number;
  className?: string;
}

const SkillBadge = ({ name, level, endorsements, className }: SkillBadgeProps) => {
  const getLevelColor = () => {
    switch (level) {
      case 1: return "bg-slate-200 text-slate-800";
      case 2: return "bg-tech-blue/20 text-tech-blue";
      case 3: return "bg-tech-purple/20 text-tech-purple";
      case 4: return "bg-tech-orange/20 text-tech-orange";
      case 5: return "bg-gradient-to-r from-tech-blue to-tech-purple text-white";
      default: return "bg-slate-200 text-slate-800";
    }
  };

  const getStars = () => {
    return "★".repeat(level) + "☆".repeat(5 - level);
  };

  return (
    <div className={cn(
      "tech-badge flex items-center gap-1.5 py-1 pl-3 pr-2 text-xs",
      getLevelColor(),
      className
    )}>
      <span className="font-medium">{name}</span>
      <div className="h-4 w-[1px] bg-current opacity-20"></div>
      <span className="text-[10px]">{getStars()}</span>
      <div className="h-4 w-[1px] bg-current opacity-20"></div>
      <span className="text-[10px]">{endorsements} endorsements</span>
    </div>
  );
};

export default SkillBadge;
