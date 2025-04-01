
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      progress: 65
    },
    {
      id: "c2",
      title: "Blockchain Security Audit",
      description: "Find and fix security vulnerabilities in a smart contract implementation",
      participants: 186,
      daysLeft: 7,
      difficulty: "Intermediate",
      category: "Security",
      progress: 82
    },
    {
      id: "c3",
      title: "Responsive Web Dashboard",
      description: "Create an accessible, responsive dashboard for data visualization",
      participants: 312,
      daysLeft: 21,
      difficulty: "Beginner",
      category: "Web",
      progress: 45
    }
  ];

  const handleJoinClick = () => {
    if (onJoinChallenge) {
      onJoinChallenge();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-tech-blue/10 to-tech-purple/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Technical Challenges</h2>
            <p className="text-muted-foreground">
              Push your skills to new heights with our curated technical challenges.
              Solve real-world problems, earn XP, and climb the leaderboard.
            </p>
          </div>
          <Button asChild variant="default" className="mt-4 md:mt-0 bg-tech-purple hover:bg-tech-purple/90">
            <Link to="/challenges">
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge className={
                    challenge.difficulty === "Beginner" 
                      ? "bg-green-500" 
                      : challenge.difficulty === "Intermediate" 
                        ? "bg-amber-500" 
                        : "bg-red-500"
                  }>
                    {challenge.difficulty}
                  </Badge>
                  <Badge variant="outline">{challenge.category}</Badge>
                </div>
                <CardTitle className="mt-2">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-tech-blue hover:bg-tech-blue/90" 
                  onClick={handleJoinClick}
                >
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
