
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, ArrowDown, Minus, Trophy, Star, Calendar, School, Award, Medal } from "lucide-react";

// Sample leaderboard data
const weeklyLeaderboardData = [
  {
    id: "u1",
    rank: 1,
    name: "Alex Chen",
    username: "alexc",
    avatar: "https://i.pravatar.cc/150?img=1",
    school: "ENSCS",
    level: 28,
    xp: 2840,
    change: "up"
  },
  {
    id: "u2",
    rank: 2,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "https://i.pravatar.cc/150?img=5",
    school: "ENSNN",
    level: 27,
    xp: 2710,
    change: "same"
  },
  {
    id: "u3",
    rank: 3,
    name: "Michael Zhang",
    username: "michaelz",
    avatar: "https://i.pravatar.cc/150?img=3",
    school: "ENSBS",
    level: 26,
    xp: 2650,
    change: "up"
  },
  {
    id: "u4",
    rank: 4,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "https://i.pravatar.cc/150?img=10",
    school: "ENSNN",
    level: 25,
    xp: 2530,
    change: "down"
  },
  {
    id: "u5",
    rank: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "https://i.pravatar.cc/150?img=7",
    school: "ENSAI",
    level: 24,
    xp: 2490,
    change: "up"
  },
  {
    id: "u6",
    rank: 6,
    name: "Sophia Lee",
    username: "sophial",
    avatar: "https://i.pravatar.cc/150?img=9",
    school: "ENSCS",
    level: 23,
    xp: 2320,
    change: "down"
  },
  {
    id: "u7",
    rank: 7,
    name: "Aisha Patel",
    username: "aishap",
    avatar: "https://i.pravatar.cc/150?img=23",
    school: "ENSNN",
    level: 22,
    xp: 2260,
    change: "up"
  },
  {
    id: "u8",
    rank: 8,
    name: "Carlos Mendez",
    username: "carlosm",
    avatar: "https://i.pravatar.cc/150?img=11",
    school: "ENSBS",
    level: 21,
    xp: 2140,
    change: "up"
  },
  {
    id: "u9",
    rank: 9,
    name: "Jin Lee",
    username: "jinl",
    avatar: "https://i.pravatar.cc/150?img=15",
    school: "ENSAI",
    level: 20,
    xp: 2050,
    change: "down"
  },
  {
    id: "u10",
    rank: 10,
    name: "Zoe Chen",
    username: "zoec",
    avatar: "https://i.pravatar.cc/150?img=24",
    school: "ENSCS",
    level: 19,
    xp: 1980,
    change: "same"
  }
];

const monthlyLeaderboardData = [
  {
    id: "u11",
    rank: 1,
    name: "Marcus Johnson",
    username: "marcusj",
    avatar: "https://i.pravatar.cc/150?img=31",
    school: "ENSQC",
    level: 32,
    xp: 6450,
    change: "up",
    achievements: ["Research Pioneer", "Collaboration Star"]
  },
  {
    id: "u12",
    rank: 2,
    name: "Leila Karim",
    username: "leilak",
    avatar: "https://i.pravatar.cc/150?img=32",
    school: "ENSCS",
    level: 30,
    xp: 6120,
    change: "up",
    achievements: ["Code Maestro", "Mentor of the Month"]
  },
  {
    id: "u3",
    rank: 3,
    name: "Michael Zhang",
    username: "michaelz",
    avatar: "https://i.pravatar.cc/150?img=3",
    school: "ENSBS",
    level: 29,
    xp: 5980,
    change: "up",
    achievements: ["Blockchain Visionary"]
  },
  {
    id: "u1",
    rank: 4,
    name: "Alex Chen",
    username: "alexc",
    avatar: "https://i.pravatar.cc/150?img=1",
    school: "ENSCS",
    level: 28,
    xp: 5820,
    change: "down",
    achievements: ["Challenge Champion"]
  },
  {
    id: "u2",
    rank: 5,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "https://i.pravatar.cc/150?img=5",
    school: "ENSNN",
    level: 27,
    xp: 5650,
    change: "down",
    achievements: ["Neural Network Ninja"]
  }
];

// School leaderboard data
const schoolLeaderboardData = [
  {
    id: "s1",
    rank: 1,
    name: "ENSCS - Computer Science",
    students: 843,
    totalXp: 458200,
    avgLevel: 22,
    topAchievement: "Hackathon Champions",
    change: "up"
  },
  {
    id: "s2",
    rank: 2,
    name: "ENSNN - Neural Networks",
    students: 612,
    totalXp: 398500,
    avgLevel: 21,
    topAchievement: "AI Research Excellence",
    change: "up"
  },
  {
    id: "s3",
    rank: 3,
    name: "ENSBS - Blockchain Studies",
    students: 487,
    totalXp: 342800,
    avgLevel: 20,
    topAchievement: "Web3 Innovation Prize",
    change: "same"
  },
  {
    id: "s4",
    rank: 4,
    name: "ENSAI - AR/VR Innovations",
    students: 394,
    totalXp: 298600,
    avgLevel: 19,
    topAchievement: "Immersive Learning Award",
    change: "down"
  },
  {
    id: "s5",
    rank: 5,
    name: "ENSQC - Quantum Computing",
    students: 245,
    totalXp: 254700,
    avgLevel: 23,
    topAchievement: "Quantum Algorithm Breakthrough",
    change: "up"
  }
];

const Leaderboard = () => {
  const [filter, setFilter] = useState("all");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Leaderboards</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognize achievements, track progress, and compete for the top spots across the TechSphere community.
            </p>
          </div>
          
          <Tabs defaultValue="weekly" className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <TabsList className="mb-4 sm:mb-0">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="alltime">All-Time</TabsTrigger>
                <TabsTrigger value="schools">Schools</TabsTrigger>
              </TabsList>
              
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Schools</SelectItem>
                  <SelectItem value="enscs">ENSCS</SelectItem>
                  <SelectItem value="ensnn">ENSNN</SelectItem>
                  <SelectItem value="ensbs">ENSBS</SelectItem>
                  <SelectItem value="ensai">ENSAI</SelectItem>
                  <SelectItem value="ensqc">ENSQC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <TabsContent value="weekly">
              <div className="space-y-4">
                {/* Top 3 Spotlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <TopUserCard user={weeklyLeaderboardData[1]} position="second" />
                  <TopUserCard user={weeklyLeaderboardData[0]} position="first" />
                  <TopUserCard user={weeklyLeaderboardData[2]} position="third" />
                </div>
                
                {/* Full Leaderboard */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Weekly Top 10</CardTitle>
                    <CardDescription>Updated daily at midnight</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {weeklyLeaderboardData.map(user => (
                        <LeaderboardRow key={user.id} user={user} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="space-y-4">
                {/* Monthly Leaders spotlight with achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {monthlyLeaderboardData.slice(0, 3).map((user, index) => (
                    <Card key={user.id} className={`tech-hover-card overflow-hidden border-2 ${index === 0 ? 'border-tech-blue bg-tech-blue/5' : 'border-muted'}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className={`${index === 0 ? 'bg-tech-blue' : index === 1 ? 'bg-tech-purple' : 'bg-tech-orange'}`}>
                            <Trophy className="h-3 w-3 mr-1" />
                            Rank #{user.rank}
                          </Badge>
                          <RankChange change={user.change} />
                        </div>
                      </CardHeader>
                      <CardContent className="text-center pt-0">
                        <Avatar className={`h-24 w-24 mx-auto mb-4 border-4 ${index === 0 ? 'border-tech-blue' : 'border-muted'}`}>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <h3 className="font-bold text-xl mb-1">{user.name}</h3>
                        <p className="text-muted-foreground mb-2">@{user.username}</p>
                        
                        <div className="flex items-center justify-center mb-3">
                          <Badge variant="outline" className="mr-2">
                            <School className="h-3 w-3 mr-1" />
                            {user.school}
                          </Badge>
                          <Badge variant="outline">
                            <Star className="h-3 w-3 mr-1" />
                            Level {user.level}
                          </Badge>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-1">XP: {user.xp}</p>
                          <Progress value={75} className="h-2" />
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {user.achievements?.map(achievement => (
                            <Badge key={achievement} variant="outline" className="w-full justify-center py-1">
                              <Award className="h-3 w-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Rest of monthly leaderboard */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Monthly Leaderboard</CardTitle>
                    <CardDescription>Top performers for November 2023</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {monthlyLeaderboardData.map(user => (
                        <LeaderboardRow key={user.id} user={user} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="alltime">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>All-Time Leaderboard</CardTitle>
                  <CardDescription>Coming Soon</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">All-Time Leaderboard Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're compiling the achievements and contributions of all users to create a comprehensive all-time leaderboard.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schools">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">School Rankings</CardTitle>
                  <CardDescription>Based on collective XP and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schoolLeaderboardData.map(school => (
                      <div key={school.id} className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0 w-8 text-center font-bold">
                          {school.rank}
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <RankChange change={school.change} />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{school.name}</h3>
                          <div className="flex flex-wrap text-xs text-muted-foreground mt-1">
                            <span className="inline-flex items-center mr-4">
                              <Users className="h-3 w-3 mr-1" />
                              {school.students} students
                            </span>
                            <span className="inline-flex items-center mr-4">
                              <Star className="h-3 w-3 mr-1" />
                              Avg Level: {school.avgLevel}
                            </span>
                            <span className="inline-flex items-center">
                              <Trophy className="h-3 w-3 mr-1" />
                              {school.topAchievement}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 text-right">
                          <div className="font-semibold">{(school.totalXp / 1000).toFixed(1)}K XP</div>
                          <Button variant="ghost" size="sm" className="mt-1">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const TopUserCard = ({ user, position }) => {
  const getStyles = () => {
    switch (position) {
      case 'first':
        return {
          containerClass: 'order-2 md:order-2 transform md:scale-110 border-tech-blue bg-tech-blue/5 z-10',
          avatarSize: 'h-24 w-24',
          badgeColor: 'bg-tech-blue'
        };
      case 'second':
        return {
          containerClass: 'order-1 md:order-1 border-tech-purple bg-tech-purple/5',
          avatarSize: 'h-20 w-20',
          badgeColor: 'bg-tech-purple'
        };
      case 'third':
        return {
          containerClass: 'order-3 md:order-3 border-tech-orange bg-tech-orange/5',
          avatarSize: 'h-20 w-20',
          badgeColor: 'bg-tech-orange'
        };
      default:
        return {
          containerClass: '',
          avatarSize: 'h-20 w-20',
          badgeColor: 'bg-primary'
        };
    }
  };
  
  const styles = getStyles();
  
  return (
    <Card className={`text-center tech-hover-card ${styles.containerClass} border-2`}>
      <CardHeader className="pb-0 pt-4">
        <Badge className={`${styles.badgeColor} mx-auto`}>
          <Trophy className="h-3 w-3 mr-1" />
          {position === 'first' ? '1st Place' : position === 'second' ? '2nd Place' : '3rd Place'}
        </Badge>
      </CardHeader>
      <CardContent>
        <Avatar className={`${styles.avatarSize} mx-auto my-4`}>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h3 className="font-bold text-lg mb-1">{user.name}</h3>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Badge variant="outline">
            <School className="h-3 w-3 mr-1" />
            {user.school}
          </Badge>
          <Badge variant="outline">
            <Star className="h-3 w-3 mr-1" />
            Level {user.level}
          </Badge>
        </div>
        
        <div className="flex items-center justify-center">
          <Medal className={`h-5 w-5 mr-2 ${position === 'first' ? 'text-yellow-500' : position === 'second' ? 'text-gray-400' : 'text-amber-700'}`} />
          <span className="font-bold">{user.xp} XP</span>
        </div>
        
        <Button variant="outline" size="sm" className="mt-4 w-full">View Profile</Button>
      </CardContent>
    </Card>
  );
};

const LeaderboardRow = ({ user }) => {
  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 w-8 text-center font-bold">
        {user.rank}
      </div>
      <div className="flex-shrink-0 ml-2">
        <RankChange change={user.change} />
      </div>
      <div className="flex-shrink-0 ml-4">
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="ml-4 flex-grow">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-muted-foreground flex items-center">
          <span>@{user.username}</span>
          <span className="mx-2">•</span>
          <Badge variant="outline" className="text-xs">
            <School className="h-3 w-3 mr-1" />
            {user.school}
          </Badge>
        </div>
      </div>
      <div className="flex-shrink-0 text-center mr-4">
        <div className="font-semibold">Level {user.level}</div>
        <div className="text-xs text-muted-foreground">
          <Star className="h-3 w-3 inline mr-1" />
          {user.xp} XP
        </div>
      </div>
      <div className="flex-shrink-0">
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );
};

const RankChange = ({ change }) => {
  if (change === 'up') {
    return <ArrowUp className="h-4 w-4 text-tech-green" />;
  } else if (change === 'down') {
    return <ArrowDown className="h-4 w-4 text-tech-red" />;
  } else {
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const Users = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
};

export default Leaderboard;
