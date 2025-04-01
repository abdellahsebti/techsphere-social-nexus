import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileCode, Lightbulb, User, Trophy } from "lucide-react";

interface StatsSectionProps {
  stats: {
    projects: number;
    ideas: number;
    followers: number;
    badges: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: FileCode, label: "Projects", value: stats.projects, color: "from-blue-500 to-blue-600" },
        { icon: Lightbulb, label: "Ideas", value: stats.ideas, color: "from-yellow-500 to-yellow-600" },
        { icon: User, label: "Followers", value: stats.followers, color: "from-purple-500 to-purple-600" },
        { icon: Trophy, label: "Badges", value: stats.badges, color: "from-green-500 to-green-600" },
      ].map((stat) => (
        <Card key={stat.label} className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 