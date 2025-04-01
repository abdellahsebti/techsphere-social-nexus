
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress-custom";
import { Calendar, Users, Trophy, ArrowRight, Clock, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/lib/theme";

interface ChallengeSectionProps {
  onJoinChallenge?: () => void;
}

const ChallengesSection: React.FC<ChallengeSectionProps> = ({ onJoinChallenge }) => {
  // Sample challenge data
  const challenges = [
    {
      id: "c1",
      title: "AI for Climate Change",
      description: "Develop machine learning models to predict and mitigate climate change effects",
      participants: 248,
      daysLeft: 14,
      difficulty: "Advanced",
      category: "AI",
      progress: 65,
      xpReward: 1500
    },
    {
      id: "c2",
      title: "Blockchain Security Audit",
      description: "Find and fix security vulnerabilities in a smart contract implementation",
      participants: 186,
      daysLeft: 7,
      difficulty: "Intermediate",
      category: "Security",
      progress: 82,
      xpReward: 1200
    },
    {
      id: "c3",
      title: "Responsive Web Dashboard",
      description: "Create an accessible, responsive dashboard for data visualization",
      participants: 312,
      daysLeft: 21,
      difficulty: "Beginner",
      category: "Web",
      progress: 45,
      xpReward: 800
    }
  ];

  const handleJoinClick = () => {
    if (onJoinChallenge) {
      onJoinChallenge();
    }
  };

  // Function to determine progress color based on completion percentage
  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  // Function to determine difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500 hover:bg-green-600";
      case "Intermediate": return "bg-amber-500 hover:bg-amber-600";
      case "Advanced": return "bg-red-500 hover:bg-red-600";
      default: return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-tech-blue/5 to-tech-purple/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tech-blue to-tech-purple opacity-20" />
      <div className="absolute -top-[300px] right-[10%] w-[600px] h-[600px] rounded-full bg-tech-blue/5 blur-3xl" />
      <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-tech-purple/5 blur-3xl" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background mb-4">
              <Trophy className="h-4 w-4 mr-2 text-tech-purple" />
              Technical Challenges
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Push Your Skills Further</h2>
            <p className="text-muted-foreground">
              Tackle real-world problems, earn XP, and showcase your expertise by participating
              in our curated technical challenges.
            </p>
          </div>
          
          <Button 
            asChild 
            variant="default" 
            className="mt-4 md:mt-0 bg-gradient-to-r from-tech-purple to-tech-blue hover:from-tech-purple/90 hover:to-tech-blue/90 text-white"
          >
            <Link to="/challenges">
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <Card 
              key={challenge.id} 
              className={cn(
                "flex flex-col h-full overflow-hidden border-border/50 group",
                animations.fadeIn,
                animations.slideUp
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-tech-blue to-tech-purple transform origin-left transition-transform scale-x-0 group-hover:scale-x-100" />
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={cn("px-2 py-1", getDifficultyColor(challenge.difficulty))}>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline" className="px-2 py-1">
                    {challenge.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <CardDescription className="mt-1">{challenge.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow pb-2">
                <div className="flex justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <Users className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4 text-muted-foreground" />
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4 bg-muted/50 p-2 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-tech-purple/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-tech-purple" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">XP Reward</p>
                    <p className="text-sm font-bold">{challenge.xpReward} XP</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">Challenge Progress</span>
                    <span className="font-medium">{challenge.progress}%</span>
                  </div>
                  <Progress 
                    value={challenge.progress} 
                    className="h-2" 
                    indicatorClassName={getProgressColor(challenge.progress)}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="pt-4 border-t border-border/50">
                <Button 
                  className="w-full bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-blue/90 hover:to-tech-purple/90 text-white gap-2" 
                  onClick={handleJoinClick}
                >
                  <Target className="h-4 w-4" />
                  Join Challenge
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
