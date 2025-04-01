
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Zap, Award, Medal } from "lucide-react";

interface XpCardProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  rank: number;
  badges: number;
  achievements: number;
}

const XpCard = ({ level, xp, nextLevelXp, rank, badges, achievements }: XpCardProps) => {
  const xpPercentage = Math.min(100, Math.floor((xp / nextLevelXp) * 100));
  
  return (
    <Card className="tech-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="h-5 w-5 text-tech-yellow" />
          Experience & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <span className="text-3xl font-bold mr-2">Level {level}</span>
                <Zap className="h-6 w-6 text-tech-yellow animate-pulse-soft" />
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{xp} XP / {nextLevelXp} XP</span>
                <span className="ml-auto">{xpPercentage}%</span>
              </div>
            </div>
          </div>
        
          <div className="xp-progress">
            <div className="xp-progress-bar" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Star className="h-5 w-5 text-tech-blue mb-1" />
              <span className="font-bold">{rank}</span>
              <span className="text-xs text-muted-foreground">Rank</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Award className="h-5 w-5 text-tech-purple mb-1" />
              <span className="font-bold">{badges}</span>
              <span className="text-xs text-muted-foreground">Badges</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
              <Medal className="h-5 w-5 text-tech-green mb-1" />
              <span className="font-bold">{achievements}</span>
              <span className="text-xs text-muted-foreground">Achievements</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default XpCard;
