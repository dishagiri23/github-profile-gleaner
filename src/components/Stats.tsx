
import React from "react";
import { Users, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsProps {
  followers: number;
  following: number;
  repos: number;
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ 
  followers, 
  following, 
  repos, 
  className 
}) => {
  const statItems = [
    {
      icon: <Users className="w-4 h-4" />,
      label: "Followers",
      value: followers,
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Following",
      value: following,
    },
    {
      icon: <GitFork className="w-4 h-4" />,
      label: "Repositories",
      value: repos,
    },
  ];

  return (
    <div className={cn("grid grid-cols-3 gap-4 w-full", className)}>
      {statItems.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center justify-center p-4",
            "glass-card rounded-2xl subtle-shadow",
            "transition-all duration-300 hover:shadow-lg hover:bg-black/60",
            "animate-fade-in",
            "opacity-0"
          )}
          style={{ animationDelay: `${index * 100 + 300}ms`, animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-2 text-primary mb-1">
            {stat.icon}
            <span className="text-xs font-medium">{stat.label}</span>
          </div>
          <span className="text-2xl font-semibold text-white">{stat.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
