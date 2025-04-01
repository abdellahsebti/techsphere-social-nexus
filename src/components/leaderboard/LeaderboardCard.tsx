
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Crown, Medal } from "lucide-react";
import { Link } from "react-router-dom";

interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  school: string;
  level: number;
  xp: number;
}

interface LeaderboardCardProps {
  title: string;
  period: string;
  users: LeaderboardUser[];
}

const LeaderboardCard = ({ title, period, users }: LeaderboardCardProps) => {
  return (
    <Card className="tech-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="h-5 w-5 text-tech-yellow" />
          {title}
          <span className="ml-auto text-sm font-normal text-muted-foreground">{period}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div 
              key={user.id} 
              className={`flex items-center justify-between p-3 rounded-lg ${
                index === 0 ? "bg-tech-yellow/10 border border-tech-yellow/30" : 
                index === 1 ? "bg-tech-blue/10 border border-tech-blue/30" : 
                index === 2 ? "bg-tech-orange/10 border border-tech-orange/30" : 
                "bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {index < 3 && (
                    <div className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-background flex items-center justify-center shadow-sm border">
                      {index === 0 ? 
                        <Crown className="h-3 w-3 text-tech-yellow" /> : 
                        <Medal className="h-3 w-3 text-tech-blue" />
                      }
                    </div>
                  )}
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-background text-sm font-medium shadow-sm border">
                    {user.rank}
                  </div>
                </div>
                
                <Link to={`/profile/${user.id}`} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium leading-none">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.school}</span>
                  </div>
                </Link>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{user.xp.toLocaleString()} XP</span>
                </div>
                <span className="text-xs text-muted-foreground">Level {user.level}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
