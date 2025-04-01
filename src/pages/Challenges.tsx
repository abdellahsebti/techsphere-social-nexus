import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, Trophy, Calendar, Users, Clock, Flame, Target,
  Award, Zap, School, Globe, ChevronRight, Timer, Shield
} from "lucide-react";

// Sample challenges data
const activeChallenges = [
  {
    id: "ch1",
    title: "AI Model Optimization Challenge",
    description: "Build the most efficient neural network for real-time object detection. Optimize for both accuracy and speed.",
    school: "ENSNN",
    type: "School Challenge",
    deadline: "5 days left",
    participants: 156,
    xpReward: 500,
    badges: ["AI/ML", "Optimization"],
    difficulty: "Advanced",
    requirements: ["Python", "PyTorch", "Computer Vision"],
    prizes: [
      "500 XP + Gold Trophy",
      "300 XP + Silver Trophy",
      "150 XP + Bronze Trophy"
    ]
  },
  {
    id: "ch2",
    title: "Cross-School Quantum Hackathon",
    description: "Collaborate with students from other schools to develop quantum algorithms for real-world applications.",
    type: "Global Challenge",
    deadline: "2 weeks left",
    participants: 324,
    xpReward: 1000,
    badges: ["Quantum Computing", "Algorithms"],
    difficulty: "Expert",
    requirements: ["Quantum Computing", "Algorithm Design"],
    prizes: [
      "1000 XP + Exclusive Lab Access",
      "750 XP + Industry Mentorship",
      "500 XP + Premium Tools License"
    ]
  }
];

const upcomingChallenges = [
  {
    id: "ch3",
    title: "Green Tech Innovation Sprint",
    description: "Design sustainable technology solutions for urban environmental challenges.",
    school: "ENSGT",
    type: "School Challenge",
    startDate: "Starts in 2 weeks",
    expectedParticipants: 200,
    xpReward: 400,
    badges: ["Sustainability", "Innovation"],
    difficulty: "Intermediate"
  }
];

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Technical Challenges</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compete in challenges, showcase your skills, and earn rewards while solving real-world problems.
            </p>
            
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="active" className="mb-8">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="my">My Challenges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {activeChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
                
                <div className="space-y-6">
                  {/* Challenge Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                        Your Challenge Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Challenges Won</span>
                          <Badge variant="secondary">5</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Active Participations</span>
                          <Badge variant="secondary">3</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Total XP Earned</span>
                          <Badge variant="secondary">2,500 XP</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Challenge Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {["AI/ML", "Quantum Computing", "Cybersecurity", "Green Tech", "Robotics", "Web3"].map(category => (
                          <Button key={category} variant="outline" className="w-full justify-start text-left" size="sm">
                            {category}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Challenge Calendar */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Upcoming Deadlines
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activeChallenges.map(challenge => (
                          <div key={challenge.id} className="flex justify-between items-center">
                            <div className="text-sm">
                              <div className="font-medium">{challenge.title}</div>
                              <div className="text-muted-foreground">{challenge.deadline}</div>
                            </div>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ChallengeCard = ({ challenge }) => {
  return (
    <Card className="tech-hover-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              variant="outline" 
              className={`mb-2 ${
                challenge.type === "School Challenge" 
                  ? "border-tech-blue text-tech-blue" 
                  : "border-tech-purple text-tech-purple"
              }`}
            >
              {challenge.type}
            </Badge>
            <CardTitle>{challenge.title}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-tech-green">+{challenge.xpReward} XP</div>
            <div className="text-xs text-muted-foreground">{challenge.deadline}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {challenge.badges.map(badge => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span>Difficulty: {challenge.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{challenge.participants} Participants</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Requirements:</div>
            <div className="flex flex-wrap gap-2">
              {challenge.requirements.map(req => (
                <Badge key={req} variant="outline">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Prizes:</div>
            <div className="space-y-1">
              {challenge.prizes.map((prize, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Trophy className={`h-4 w-4 ${
                    index === 0 ? "text-yellow-400" :
                    index === 1 ? "text-gray-400" :
                    "text-amber-600"
                  }`} />
                  <span>{prize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Learn More</Button>
        <Button className="tech-btn-gradient">
          Join Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Challenges;