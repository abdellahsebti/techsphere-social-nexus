
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Timer, Users, Trophy, Calendar, ArrowRight, Clock, Tag } from "lucide-react";

// Sample challenges data
const challengesData = [
  {
    id: "c1",
    title: "AI Ethics Hackathon",
    description: "Create AI solutions that address ethical concerns in technology. Focus on bias detection, transparency, or privacy-preserving ML.",
    organizer: "ENSCS Ethics Department",
    startDate: "2023-11-15",
    endDate: "2023-11-17",
    participants: 87,
    xpReward: 100,
    status: "upcoming",
    tags: ["AI", "Ethics", "Hackathon"]
  },
  {
    id: "c2",
    title: "Blockchain Battle",
    description: "Develop a secure, scalable blockchain application that solves a real-world problem. Entries judged on innovation, security, and scalability.",
    organizer: "ENSBS Blockchain Lab",
    startDate: "2023-11-05",
    endDate: "2023-11-10",
    participants: 64,
    xpReward: 150,
    status: "active",
    progress: 60,
    tags: ["Blockchain", "Security", "Web3"]
  },
  {
    id: "c3",
    title: "Green Tech Challenge",
    description: "Build technology solutions that address environmental challenges. Projects can focus on energy efficiency, waste reduction, or climate monitoring.",
    organizer: "Cross-School Sustainability Initiative",
    startDate: "2023-11-20",
    endDate: "2023-12-05",
    participants: 102,
    xpReward: 120,
    status: "upcoming",
    tags: ["Sustainability", "IoT", "Climate Tech"]
  },
  {
    id: "c4",
    title: "Neural Network Showdown",
    description: "Compete to build the most accurate neural network for image classification. Training sets and evaluation metrics provided.",
    organizer: "ENSNN Research Group",
    startDate: "2023-10-15",
    endDate: "2023-10-30",
    participants: 75,
    xpReward: 120,
    status: "completed",
    winner: "Alex Chen",
    tags: ["Neural Networks", "AI", "Machine Learning"]
  },
  {
    id: "c5",
    title: "AR Campus Innovation",
    description: "Create augmented reality experiences that enhance campus life. Looking for creative solutions for learning, navigation, or community engagement.",
    organizer: "ENSAI AR/VR Lab",
    startDate: "2023-11-10",
    endDate: "2023-11-25",
    participants: 53,
    xpReward: 100,
    status: "active",
    progress: 30,
    tags: ["AR/VR", "UX", "Innovation"]
  },
  {
    id: "c6",
    title: "Quantum Algorithm Challenge",
    description: "Develop and optimize quantum algorithms for factoring large numbers. Evaluation based on theoretical efficiency and practical implementation.",
    organizer: "ENSQC Quantum Computing Center",
    startDate: "2023-12-01",
    endDate: "2023-12-15",
    participants: 35,
    xpReward: 200,
    status: "upcoming",
    tags: ["Quantum Computing", "Algorithms", "Cryptography"]
  },
];

const Challenges = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Challenges & Tournaments</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compete in challenges, showcase your skills, and earn XP rewards. Join solo or form teams to tackle complex problems.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengesData.map(challenge => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengesData
                  .filter(challenge => challenge.status === 'active')
                  .map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengesData
                  .filter(challenge => challenge.status === 'upcoming')
                  .map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challengesData
                  .filter(challenge => challenge.status === 'completed')
                  .map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))
                }
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
    <Card className="tech-hover-card overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{challenge.title}</CardTitle>
            <CardDescription className="text-sm mt-1">{challenge.organizer}</CardDescription>
          </div>
          <StatusBadge status={challenge.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm mb-4">{challenge.description}</p>
        
        {challenge.status === 'active' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{challenge.progress}%</span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-xs">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>
              {new Date(challenge.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
              {new Date(challenge.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center text-xs">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{challenge.participants} participants</span>
          </div>
          <div className="flex items-center text-xs">
            <Trophy className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{challenge.xpReward} XP reward</span>
          </div>
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>
              {Math.ceil((new Date(challenge.endDate) - new Date(challenge.startDate)) / (1000 * 60 * 60 * 24))} days
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {challenge.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs py-0">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" variant={challenge.status === 'completed' ? 'outline' : 'default'}>
          {challenge.status === 'upcoming' ? 'Register' : 
           challenge.status === 'active' ? 'View Challenge' : 
           'See Results'}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-tech-green text-white">
          <Timer className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'upcoming':
      return (
        <Badge className="bg-tech-blue text-white">
          <Calendar className="h-3 w-3 mr-1" />
          Upcoming
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="outline">
          <Trophy className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    default:
      return null;
  }
};

export default Challenges;
