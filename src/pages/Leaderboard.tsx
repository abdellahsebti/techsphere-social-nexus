import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar, 
  Clock, 
  Bookmark,
  Share2,
  MoreHorizontal,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  Trophy,
  Medal,
  Award,
  Star,
  Crown,
  Sparkles,
  Users,
  School,
  Zap,
  Flame,
  Target
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Mock Data
const mockUsers = [
  {
    id: "user1",
    name: "Dr. Emily Foster",
    school: "ENSQC",
    avatar: "https://i.pravatar.cc/150?u=emily",
    badge: "Verified Researcher",
    xp: 2500,
    level: 15,
    weeklyXP: 850,
    streak: 12,
    achievements: ["Quantum Pioneer", "ML Expert"]
  },
  {
    id: "user2",
    name: "Alex Chen",
    school: "ENSAI",
    avatar: "https://i.pravatar.cc/150?u=alex",
    badge: "Rising Star",
    xp: 2350,
    level: 14,
    weeklyXP: 780,
    streak: 8,
    achievements: ["AI Innovator", "Project Star"]
  },
  {
    id: "user3",
    name: "Sarah Johnson",
    school: "ENSNN",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    badge: "Tech Leader",
    xp: 2200,
    level: 13,
    weeklyXP: 720,
    streak: 15,
    achievements: ["Neural Network Expert", "Community Champion"]
  },
  {
    id: "user4",
    name: "Michael Zhang",
    school: "ENSBS",
    avatar: "https://i.pravatar.cc/150?u=michael",
    badge: "Blockchain Expert",
    xp: 2100,
    level: 13,
    weeklyXP: 680,
    streak: 10,
    achievements: ["Web3 Pioneer", "Smart Contract Master"]
  },
  {
    id: "user5",
    name: "Lisa Chen",
    school: "ENSCS",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    badge: "Code Master",
    xp: 2000,
    level: 12,
    weeklyXP: 650,
    streak: 7,
    achievements: ["Algorithm Expert", "Open Source Contributor"]
  }
];

const mockAchievements = [
  {
    id: "ach1",
    title: "Challenge Champion",
    description: "Won AI Model Challenge",
    icon: <Award className="h-6 w-6 text-yellow-400" />
  },
  {
    id: "ach2",
    title: "Top Contributor",
    description: "500+ Helpful Votes",
    icon: <Star className="h-6 w-6 text-tech-blue" />
  },
  {
    id: "ach3",
    title: "Innovation Award",
    description: "Breakthrough in Quantum Computing",
    icon: <Sparkles className="h-6 w-6 text-tech-purple" />
  },
  {
    id: "ach4",
    title: "Community Leader",
    description: "Organized 5+ Workshops",
    icon: <Users className="h-6 w-6 text-tech-red" />
  }
];

const mockSchoolRankings = [
  {
    name: "ENSNN",
    points: 12500,
    activeUsers: 450,
    topAchievements: ["AI Challenge Champions", "Most Active Community"],
    rank: 1
  },
  {
    name: "ENSQC",
    points: 11200,
    activeUsers: 380,
    topAchievements: ["Quantum Innovation Award"],
    rank: 2
  },
  {
    name: "ENSAI",
    points: 9800,
    activeUsers: 320,
    topAchievements: ["Robotics Excellence"],
    rank: 3
  },
  {
    name: "ENSBS",
    points: 9200,
    activeUsers: 290,
    topAchievements: ["Blockchain Innovation"],
    rank: 4
  },
  {
    name: "ENSCS",
    points: 8900,
    activeUsers: 310,
    topAchievements: ["Algorithm Masters"],
    rank: 5
  }
];

const PodiumCard = ({ rank, user }) => {
  const { darkMode } = useAppContext();
  
  const getRankStyles = (rank) => {
    switch(rank) {
      case 1:
        return darkMode 
          ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50"
          : "bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-lg shadow-yellow-400/50 hover:shadow-yellow-400/70";
      case 2:
        return darkMode
          ? "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50"
          : "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-lg shadow-gray-400/50 hover:shadow-gray-400/70";
      case 3:
        return darkMode
          ? "bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 shadow-lg shadow-amber-700/30 hover:shadow-amber-700/50"
          : "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 shadow-lg shadow-amber-600/50 hover:shadow-amber-600/70";
      default:
        return darkMode
          ? "bg-gradient-to-br from-slate-700 to-slate-900"
          : "bg-gradient-to-br from-slate-600 to-slate-800";
    }
  };

  const podiumAnimations = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <motion.div
      custom={rank}
      initial="hidden"
      animate="visible"
      variants={podiumAnimations}
      className="transform transition-all duration-300 hover:scale-105 relative group"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
        />
      </div>

      <Card className={`relative overflow-hidden ${getRankStyles(rank)} backdrop-blur-sm`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <CardContent className="relative pt-6">
          {/* Animated Crown */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2"
          >
            <Sparkles className="h-6 w-6 text-white/80" />
          </motion.div>

          {/* Animated Trophy */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Crown className="h-12 w-12 mx-auto text-white drop-shadow-glow" />
          </motion.div>

          {/* Avatar with Rotating Border */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative mx-auto w-20 h-20 mb-4"
          >
            <Avatar className="w-full h-full ring-4 ring-white/50">
              <AvatarImage src={user.avatar} className="object-cover" />
              <AvatarFallback className="bg-tech-purple/20 text-white">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
            />
            {/* Pulsing ring effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full border-2 border-white/50"
            />
          </motion.div>

          {/* User Info */}
          <div className="space-y-2 text-center">
            <motion.h3 
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-white text-shadow-sm"
            >
              {user.name}
            </motion.h3>
            <p className="text-white/80">{user.school}</p>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block"
            >
              <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                Level {user.level}
              </Badge>
            </motion.div>

            {/* XP Display with floating animation */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4"
            >
              <span className="text-3xl font-bold text-white drop-shadow-glow">
                {user.weeklyXP}
              </span>
              <span className="text-white/80 ml-1">XP</span>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const LeaderboardRow = ({ user, rank, index }) => {
  const { darkMode } = useAppContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
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
      
      <div className="relative flex items-center justify-between">
        {/* Rank and Avatar Section */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-purple min-w-[2.5rem]`}
          >
            #{rank}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <Avatar className="h-12 w-12 ring-2 ring-tech-purple/30 transition-shadow duration-300 group-hover:ring-tech-purple/50">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-tech-purple/20">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            {/* Pulsing ring effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full border-2 border-tech-purple/30"
            />
          </motion.div>

          {/* User Info */}
          <div>
            <div className="font-medium group-hover:text-tech-blue transition-colors duration-300">
              {user.name}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <School className="h-4 w-4" />
              {user.school}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <Badge className="bg-tech-purple/20 text-tech-purple border-none backdrop-blur-sm">
              <Zap className="h-4 w-4 mr-1" />
              Level {user.level}
            </Badge>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <Flame className="h-5 w-5 text-tech-red" />
            <span className="text-xl font-bold bg-gradient-to-r from-tech-red to-tech-purple bg-clip-text text-transparent">
              {user.weeklyXP} XP
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, delay }) => {
  const { darkMode } = useAppContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={`group relative overflow-hidden rounded-lg ${
        darkMode
          ? "bg-gradient-to-r from-tech-blue/10 via-tech-purple/10 to-tech-red/10"
          : "bg-gradient-to-r from-tech-blue/5 via-tech-purple/5 to-tech-red/5"
      } p-4 transition-all duration-300`}
    >
      {/* Enhanced shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
        darkMode ? "via-white/10" : "via-white/5"
      } to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
      
      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 rounded-full bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 backdrop-blur-sm"
        >
          {achievement.icon}
        </motion.div>
        
        <div>
          <div className="font-medium bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
            {achievement.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {achievement.description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("individual");
  const { darkMode } = useAppContext();
  
  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <main className="flex-grow py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container px-4 md:px-6"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent mb-4"
            >
              Leaderboard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              See who's leading the community in contributions and achievements.
            </motion.p>
          </motion.div>

          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users or schools..."
              className={`pl-10 backdrop-blur-sm ${
                darkMode ? "bg-slate-800/50" : "bg-background/50"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="individual" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-3 max-w-md mx-auto backdrop-blur-sm ${
              darkMode ? "bg-slate-800/50" : "bg-background/50"
            }`}>
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="school">School</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <TabsContent value="individual" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  <div className="lg:col-span-2 space-y-6">
                    {/* Top 3 Podium */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="order-1 pt-8">
                        <PodiumCard rank={2} user={mockUsers[1]} />
                      </div>
                      <div className="order-2">
                        <PodiumCard rank={1} user={mockUsers[0]} />
                      </div>
                      <div className="order-3 pt-16">
                        <PodiumCard rank={3} user={mockUsers[2]} />
                      </div>
                    </div>

                    {/* Leaderboard List */}
                    <Card className={`backdrop-blur-sm ${
                      darkMode ? "bg-slate-800/50" : "bg-background/50"
                    }`}>
                      <CardHeader>
                        <CardTitle>Weekly Rankings</CardTitle>
                        <CardDescription>Updated in real-time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockUsers.slice(3).map((user, index) => (
                            <LeaderboardRow key={user.id} user={user} rank={index + 4} index={index} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Your Ranking */}
                    <Card className={`backdrop-blur-sm ${
                      darkMode ? "bg-slate-800/50" : "bg-background/50"
                    }`}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          Your Ranking
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold">#28</div>
                          <div className="text-sm text-muted-foreground">Top 5%</div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Weekly XP</span>
                            <Badge variant="secondary" className={`backdrop-blur-sm ${
                              darkMode ? "bg-slate-700/50" : "bg-background/50"
                            }`}>450 XP</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Active Streak</span>
                            <Badge variant="secondary" className={`backdrop-blur-sm ${
                              darkMode ? "bg-slate-700/50" : "bg-background/50"
                            }`}>7 days</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Best Ranking</span>
                            <Badge variant="secondary" className={`backdrop-blur-sm ${
                              darkMode ? "bg-slate-700/50" : "bg-background/50"
                            }`}>#15</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Achievement Showcase */}
                    <Card className={`backdrop-blur-sm ${
                      darkMode ? "bg-slate-800/50" : "bg-background/50"
                    }`}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Medal className="h-5 w-5 mr-2" />
                          Recent Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockAchievements.map((achievement, index) => (
                            <AchievementCard 
                              key={achievement.id} 
                              achievement={achievement} 
                              delay={index * 0.1} 
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* School Rankings */}
                    <Card className={`backdrop-blur-sm ${
                      darkMode ? "bg-slate-800/50" : "bg-background/50"
                    }`}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <School className="h-5 w-5 mr-2" />
                          School Rankings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockSchoolRankings.map((school, index) => (
                            <motion.div
                              key={school.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                darkMode
                                  ? "bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 hover:from-tech-blue/20 hover:to-tech-purple/20"
                                  : "bg-gradient-to-r from-tech-blue/5 to-tech-purple/5 hover:from-tech-blue/10 hover:to-tech-purple/10"
                              } transition-all duration-300`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl font-bold text-muted-foreground">
                                  #{school.rank}
                                </div>
                                <div>
                                  <div className="font-medium">{school.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {school.activeUsers} active users
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-tech-purple">
                                  {school.points} pts
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {school.topAchievements[0]}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Leaderboard;