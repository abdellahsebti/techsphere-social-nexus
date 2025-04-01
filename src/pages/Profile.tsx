import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import XpCard from "@/components/profile/XpCard";
import SkillBadge from "@/components/profile/SkillBadge";
import ProjectCard from "@/components/projects/ProjectCard";
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
  User,
  Settings,
  Bell,
  Lock,
  Mail,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  UserPlus,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  Sparkles,
  FileCode,
  Lightbulb,
  Trophy,
  Zap,
  Edit2,
  Camera,
  Heart,
  MessageSquare,
  Send,
  Paperclip
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Sample user data
const userProfile = {
  id: "u1",
  name: "Alex Chen",
  username: "alexchen",
  avatar: "https://i.pravatar.cc/150?img=1",
  cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  bio: "Quantum computing researcher and machine learning enthusiast. Interested in the intersection of AI and quantum algorithms.",
  school: "ENSCS - Computer Science",
  location: "Paris, France",
  position: "PhD Candidate",
  website: "https://alexchen.dev",
  socialLinks: {
    github: "github.com/alexchen",
    twitter: "twitter.com/alexchen",
    linkedin: "linkedin.com/in/alexchen"
  },
  joinedDate: "June 2022",
  skills: [
    { name: "Quantum Computing", level: 5, endorsements: 48 },
    { name: "Machine Learning", level: 4, endorsements: 36 },
    { name: "Python", level: 5, endorsements: 52 },
    { name: "TensorFlow", level: 3, endorsements: 24 },
    { name: "Quantum Algorithms", level: 4, endorsements: 31 },
    { name: "Research", level: 5, endorsements: 43 },
    { name: "Data Science", level: 4, endorsements: 28 },
    { name: "C++", level: 3, endorsements: 19 },
  ],
  stats: {
    level: 28,
    xp: 28450,
    nextLevelXp: 30000,
    rank: 1,
    badges: 15,
    achievements: 24,
    projects: 12,
    ideas: 8,
    followers: 476,
    following: 183
  }
};

// Sample projects
const userProjects = [
  {
    id: "p1",
    title: "Quantum Machine Learning Framework",
    description: "A framework that combines quantum computing principles with machine learning algorithms to enhance predictive capabilities.",
    author: {
      id: userProfile.id,
      name: userProfile.name,
      avatar: userProfile.avatar,
      school: userProfile.school
    },
    tags: ["Quantum", "Machine Learning", "Python"],
    likesCount: 128,
    commentsCount: 42,
    createdAt: "2 days ago"
  },
  {
    id: "p3",
    title: "Quantum Circuit Optimizer",
    description: "A tool that automatically optimizes quantum circuits to reduce gate count and improve execution efficiency.",
    author: {
      id: userProfile.id,
      name: userProfile.name,
      avatar: userProfile.avatar,
      school: userProfile.school
    },
    tags: ["Quantum", "Optimization", "Python"],
    likesCount: 76,
    commentsCount: 24,
    createdAt: "2 weeks ago"
  }
];

// Sample ideas
const userIdeas = [
  {
    id: "i2",
    title: "Quantum-Resistant Cryptography Framework",
    description: "Developing a cryptographic framework that can withstand attacks from quantum computers using post-quantum algorithms.",
    author: {
      id: userProfile.id,
      name: userProfile.name,
      avatar: userProfile.avatar,
      school: userProfile.school
    },
    tags: ["Cryptography", "Quantum", "Security"],
    likesCount: 92,
    commentsCount: 31,
    createdAt: "1 week ago",
    isIdea: true
  }
];

// Add sample messages data
const messages = [
  {
    id: "m1",
    sender: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=2",
      school: "Stanford University"
    },
    content: "Hey! I saw your quantum computing project. Would you be interested in collaborating?",
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: "m2",
    sender: {
      id: "u3",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "MIT"
    },
    content: "Great work on the ML framework! I have some suggestions for optimization.",
    timestamp: "1 day ago",
    unread: false
  },
  {
    id: "m3",
    sender: {
      id: "u4",
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=4",
      school: "UC Berkeley"
    },
    content: "Thanks for the feedback on my project! Your insights were really helpful.",
    timestamp: "2 days ago",
    unread: false
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.4 }
};

export default function Profile() {
  const { username } = useParams();
  const { darkMode } = useAppContext();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className={`min-h-screen ${
      darkMode
        ? "bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4"
        >
          {/* Cover Image */}
          <motion.div 
            className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-24 group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={userProfile.cover}
              alt="Cover"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <motion.div 
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm hover:bg-background/90">
                <Camera className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Header */}
          <motion.div 
            className="relative -mt-20 mb-8"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex items-end space-x-6">
                <div className="relative group">
                  <Avatar className="h-36 w-36 border-4 border-background shadow-xl ring-2 ring-primary/20">
                    <AvatarImage src={userProfile.avatar} className="object-cover" />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute bottom-2 right-2 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {userProfile.name}
                    </h1>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Level {userProfile.stats.level}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium mb-2">@{userProfile.username}</p>
                  <p className="text-sm text-muted-foreground max-w-md mb-4">{userProfile.bio}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MapPin className="h-4 w-4" />
                      {userProfile.location}
                    </span>
                    <span className="flex items-center gap-2 hover:text-primary transition-colors">
                      <GraduationCap className="h-4 w-4" />
                      {userProfile.school}
                    </span>
                    <span className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Briefcase className="h-4 w-4" />
                      {userProfile.position}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="group hover:border-primary/50">
                  <Edit2 className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="group hover:border-primary/50">
                  <Share2 className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Share
                </Button>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
              </Button>
            </div>
          </div>
          </motion.div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <motion.div 
              className="md:col-span-2 space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-6 bg-background/80 backdrop-blur-sm">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-primary/10">
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="data-[state=active]:bg-primary/10">
                    Skills
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="data-[state=active]:bg-primary/10">
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-primary/10">
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-primary/10">
                    Settings
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                <TabsContent value="overview" className="space-y-6">
                    <motion.div
                      key="overview"
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      {/* XP Progress */}
                      <motion.div variants={scaleIn}>
                        <Card className="bg-background/80 backdrop-blur-sm">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                <span className="font-medium">Level {userProfile.stats.level}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {userProfile.stats.xp} / {userProfile.stats.nextLevelXp} XP
                              </span>
                            </div>
                            <Progress value={(userProfile.stats.xp / userProfile.stats.nextLevelXp) * 100} className="h-2" />
                          </CardContent>
                        </Card>
                      </motion.div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { icon: FileCode, label: "Projects", value: userProfile.stats.projects, color: "from-blue-500 to-blue-600" },
                          { icon: Lightbulb, label: "Ideas", value: userProfile.stats.ideas, color: "from-yellow-500 to-yellow-600" },
                          { icon: User, label: "Followers", value: userProfile.stats.followers, color: "from-purple-500 to-purple-600" },
                          { icon: Trophy, label: "Badges", value: userProfile.stats.badges, color: "from-green-500 to-green-600" },
                        ].map((stat) => {
                          const Icon = stat.icon as React.ElementType;
                          return (
                            <Card key={stat.label} className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
                              <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                  <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                                    <Icon className="h-7 w-7 text-white" />
                                  </div>
                                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>

                      {/* Recent Activity */}
                      <motion.div variants={scaleIn}>
                        <Card className="bg-background/80 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-xl">Recent Activity</CardTitle>
                                <CardDescription>Your latest contributions and achievements</CardDescription>
                              </div>
                              <Button variant="outline" size="sm">
                                View All
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-6">
                              <div className="relative pl-6 border-l-2 border-primary/20">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary/20">
                                  <div className="w-2 h-2 rounded-full bg-primary absolute top-1 left-1" />
                                </div>
                                <div className="mb-1 text-sm font-medium">Started a new project</div>
                                <div className="text-sm text-muted-foreground">2 days ago</div>
                              </div>
                              <div className="relative pl-6 border-l-2 border-primary/20">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary/20">
                                  <div className="w-2 h-2 rounded-full bg-primary absolute top-1 left-1" />
                                </div>
                                <div className="mb-1 text-sm font-medium">Earned a new badge</div>
                                <div className="text-sm text-muted-foreground">1 week ago</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                    <motion.div
                      key="projects"
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search projects..."
                              className="w-64 pl-9"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                          <Button variant="outline" size="sm">
                            <SortAsc className="h-4 w-4 mr-2" />
                            Sort
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {userProjects.map(project => (
                          <ProjectCard
                            key={project.id}
                            {...project}
                          />
                        ))}
                      </div>
                    </motion.div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                    <motion.div
                      key="skills"
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variants={staggerContainer}
                      >
                        {userProfile.skills.map(skill => (
                          <motion.div key={skill.name} variants={scaleIn}>
                            <Card className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors group">
                              <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="font-medium text-lg">{skill.name}</span>
                                  <Badge 
                                    variant="outline" 
                                    className="bg-primary/5 border-primary/20 text-primary group-hover:bg-primary/10 transition-colors"
                                  >
                                    {skill.endorsements} endorsements
                                  </Badge>
                                </div>
                                <div className="relative">
                                  <Progress 
                                    value={skill.level * 20} 
                                    className="h-2.5 rounded-full bg-primary/10" 
                                  />
                                  <div className="absolute top-3 right-0 text-xs text-muted-foreground">
                                    Level {skill.level}/5
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="messages" className="space-y-6">
                    <motion.div
                      key="messages"
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search messages..."
                              className="w-64 pl-9"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                          <Link to="/messages">
                            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                              View All Messages
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {messages.map((message) => (
                          <Link 
                            key={message.id} 
                            to={`/messages?conversation=${message.sender.id}`}
                            className="block"
                          >
                            <Card 
                              className={`bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors cursor-pointer group ${
                                message.unread ? 'border-primary/20' : ''
                              }`}
                            >
                              <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={message.sender.avatar} />
                                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{message.sender.name}</span>
                                        <span className="text-xs text-muted-foreground">{message.sender.school}</span>
                                      </div>
                                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                                    {message.unread && (
                                      <div className="mt-2 flex items-center gap-2">
                                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                          New
                                        </Badge>
                                      </div>
                                    )}
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  {/* Activity content */}
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  {/* Settings content */}
                </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              className="space-y-6"
              variants={slideIn}
              initial="initial"
              animate="animate"
            >
              {/* Profile Info Card */}
              <motion.div variants={scaleIn}>
                <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Profile Info</CardTitle>
                    <CardDescription>Your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{userProfile.location}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                  </div>
                    <div className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{userProfile.position}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                  </div>
                    <div className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{userProfile.school}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>

              {/* Social Links Card */}
              <motion.div variants={scaleIn}>
                <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                    <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                        <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>GitHub</span>
                  </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                        <Twitter className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>Twitter</span>
                  </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between group">
                  <div className="flex items-center space-x-2">
                        <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>LinkedIn</span>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>

              {/* Achievements Card */}
              <motion.div variants={scaleIn}>
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your earned badges and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Add achievement badges here */}
            </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
