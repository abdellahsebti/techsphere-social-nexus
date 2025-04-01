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
import { 
  Search, Code, Star, MessageSquare, Share2, 
  Github, Globe, Users, Calendar, Tag,
  ChevronRight, Filter, SortAsc, SortDesc
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Mock Data
const mockProjects = [
  {
    id: "p1",
    title: "Quantum Machine Learning Framework",
    description: "A framework that combines quantum computing principles with machine learning algorithms to enhance predictive capabilities.",
    author: {
      id: "u1",
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      school: "ENSCS - Computer Science"
    },
    tags: ["Quantum", "Machine Learning", "Python"],
    likesCount: 128,
    commentsCount: 42,
    createdAt: "2 days ago",
    stars: 45,
    contributors: 12,
    techStack: ["Python", "TensorFlow", "Qiskit"],
    status: "active"
  },
  {
    id: "p2",
    title: "Autonomous Drone Navigation System",
    description: "A navigation system for drones that uses computer vision and sensor fusion for autonomous operation in GPS-denied environments.",
    author: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      school: "ENSNN - Neural Networks"
    },
    tags: ["Robotics", "Computer Vision", "C++"],
    likesCount: 96,
    commentsCount: 28,
    createdAt: "1 week ago",
    stars: 38,
    contributors: 8,
    techStack: ["C++", "OpenCV", "ROS"],
    status: "active"
  },
  // Add more mock projects...
];

const ProjectCard = ({ project, index }) => {
  const { darkMode } = useAppContext();
  const { favorites, toggleFavorite } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
      
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => toggleFavorite(project.id)}
            className={`h-8 w-8 rounded-full transition-all ${
              favorites.includes(project.id) ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground"
            }`}
          >
            <Star className="h-[18px] w-[18px]" fill={favorites.includes(project.id) ? "currentColor" : "none"} />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={project.author.avatar} alt={project.author.name} />
            <AvatarFallback>{project.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{project.author.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{project.author.school}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
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
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{project.contributors}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
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
              Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Discover innovative projects, collaborate with others, and showcase your work
            </motion.p>
            
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
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

export default Projects;
