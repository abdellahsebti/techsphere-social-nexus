
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  category: string;
  participants: number;
  daysLeft: number;
  xpReward: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

const challenges: ChallengeProps[] = [
  {
    id: "c1",
    title: "Build the Ultimate AI Assistant",
    description: "Create an AI assistant that can help students with their academic needs.",
    category: "AI",
    participants: 128,
    daysLeft: 7,
    xpReward: 500,
    difficulty: "Intermediate"
  },
  {
    id: "c2",
    title: "Cross-School Cyber Security Battle",
    description: "Identify and fix vulnerabilities in a test environment. School vs School!",
    category: "Cybersecurity",
    participants: 64,
    daysLeft: 14,
    xpReward: 750,
    difficulty: "Advanced"
  },
  {
    id: "c3",
    title: "Sustainable Tech Innovation Challenge",
    description: "Design a tech solution that addresses a sustainability challenge.",
    category: "Innovation",
    participants: 96,
    daysLeft: 21,
    xpReward: 600,
    difficulty: "Beginner"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-tech-green/20 text-tech-green";
    case "Intermediate": return "bg-tech-blue/20 text-tech-blue";
    case "Advanced": return "bg-tech-orange/20 text-tech-orange";
    case "Expert": return "bg-tech-red/20 text-tech-red";
    default: return "bg-muted text-muted-foreground";
  }
};

const ChallengesSection = () => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Active Challenges</h2>
            <p className="text-muted-foreground">Compete, collaborate, and earn XP in these exciting challenges.</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/challenges">
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="tech-card">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {challenge.category}
                    </Badge>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  <Link to={`/challenges/${challenge.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{challenge.title}</h3>
                  </Link>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-6 border-t bg-muted/50">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-5 w-5 text-tech-purple" />
                    <span className="font-medium">{challenge.xpReward} XP Reward</span>
                  </div>
                  
                  <Button size="sm" className="tech-btn-primary">
                    Join Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
