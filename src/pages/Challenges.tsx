import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Award,
  Sparkles,
  Code,
  Lightbulb,
  Zap,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Mock Data
const mockChallenges = [
  {
    id: "c1",
    title: "Quantum Computing Hackathon",
    description: "Build innovative solutions using quantum computing principles. Showcase your skills and win amazing prizes!",
    school: "ENSCS - Computer Science",
    participants: 128,
    maxParticipants: 200,
    startDate: "2024-04-15",
    endDate: "2024-04-20",
    prize: "5000 XP + $1000",
    tags: ["Quantum", "Hackathon", "AI"],
    difficulty: "Expert",
    status: "upcoming",
    organizer: {
      name: "Dr. Emily Foster",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Research Lead"
    }
  },
  {
    id: "c2",
    title: "Sustainable Tech Challenge",
    description: "Develop eco-friendly solutions for campus sustainability. Focus on energy efficiency and waste reduction.",
    school: "ENSSE - Sustainable Engineering",
    participants: 85,
    maxParticipants: 150,
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    prize: "3000 XP + $500",
    tags: ["Sustainability", "IoT", "Green Tech"],
    difficulty: "Intermediate",
    status: "active",
    organizer: {
      name: "Prof. Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Department Head"
    }
  }
];

const ChallengeCard = ({ challenge, index }) => {
  const { darkMode } = useAppContext();
  const [isJoined, setIsJoined] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-tech-green";
      case "upcoming":
        return "text-tech-blue";
      case "completed":
        return "text-tech-purple";
      default:
        return "text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Expert":
        return "text-tech-red";
      case "Intermediate":
        return "text-tech-orange";
      case "Beginner":
        return "text-tech-green";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative overflow-hidden rounded-lg ${
        darkMode 
          ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 hover:from-tech-blue/10 hover:to-tech-purple/10"
          : "bg-gradient-to-r from-background to-background/80 hover:from-tech-blue/5 hover:to-tech-purple/5"
      } p-4 transition-all duration-300`}
    >
      {/* Enhanced shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
        darkMode ? "via-white/10" : "via-white/5"
      } to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{challenge.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>
          </div>
          <Badge variant="outline" className={getStatusColor(challenge.status)}>
            {challenge.status}
          </Badge>
        </div>

        {/* Organizer Info */}
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={challenge.organizer.avatar} alt={challenge.organizer.name} />
            <AvatarFallback>{challenge.organizer.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{challenge.organizer.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{challenge.organizer.role}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.tags.map((tag, i) => (
            <Badge 
              key={i}
              variant="secondary"
              className={`${
                darkMode ? "bg-slate-700/50" : "bg-muted"
              }`}
            >
              {tag}
            </Badge>
          ))}
          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Participants</span>
            <span className="font-medium">{challenge.participants}/{challenge.maxParticipants}</span>
          </div>
          <Progress value={(challenge.participants / challenge.maxParticipants) * 100} className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(challenge.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{challenge.prize}</span>
            </div>
          </div>
          <Button 
            variant={isJoined ? "outline" : "default"}
            size="sm"
            onClick={() => setIsJoined(!isJoined)}
          >
            {isJoined ? "Joined" : "Join Challenge"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Challenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const { darkMode } = useAppContext();

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <Navbar />
      
      <main className="flex-grow py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container px-4 md:px-6"
        >
          {/* Header Section */}
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`text-5xl font-bold mb-2 ${
                darkMode
                  ? "bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
              }`}
            >
              Challenges
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Participate in exciting challenges, showcase your skills, and win rewards
            </motion.p>
            
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                className={`pl-10 backdrop-blur-sm ${
                  darkMode ? "bg-slate-800/50" : "bg-background/50"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters and Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList className={`grid w-full grid-cols-4 max-w-md mx-auto backdrop-blur-sm ${
                darkMode ? "bg-slate-800/50" : "bg-background/50"
              }`}>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                {sortBy === "recent" ? (
                  <SortDesc className="h-4 w-4" />
                ) : (
                  <SortAsc className="h-4 w-4" />
                )}
                Sort
              </Button>
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockChallenges.map((challenge, index) => (
              <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline" className="gap-2">
              Load More
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;