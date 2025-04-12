import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Plus, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

// Sample data for ideas
const ideasData = [
  {
    id: "i1",
    title: "AI-Powered Mental Health Companion",
    description: "I'm thinking of building an AI companion that uses natural language processing to provide mental health support for students. Looking for ML experts and psychologists.",
    author: {
      id: "u7",
      name: "Aisha Patel",
      avatar: "https://i.pravatar.cc/150?img=23",
      school: "ENSNN - Neural Networks"
    },
    tags: ["AI", "Mental Health", "NLP"],
    likesCount: 97,
    commentsCount: 38,
    createdAt: "1 day ago",
    isIdea: true
  },
  {
    id: "i2",
    title: "Blockchain Voting System for Student Union",
    description: "Want to create a secure, transparent voting system for student elections using blockchain technology. Need blockchain devs and UI designers.",
    author: {
      id: "u8",
      name: "Carlos Mendez",
      avatar: "https://i.pravatar.cc/150?img=11",
      school: "ENSBS - Blockchain Studies"
    },
    tags: ["Blockchain", "Voting", "Security"],
    likesCount: 86,
    commentsCount: 29,
    createdAt: "3 days ago",
    isIdea: true
  },
  {
    id: "i3",
    title: "AR Campus Navigation System",
    description: "Idea for an augmented reality app that helps new students navigate campus, find classrooms, and discover resources. Looking for AR developers and 3D modelers.",
    author: {
      id: "u9",
      name: "Jin Lee",
      avatar: "https://i.pravatar.cc/150?img=15",
      school: "ENSAI - AR/VR Innovations"
    },
    tags: ["AR", "Navigation", "Mobile App"],
    likesCount: 64,
    commentsCount: 21,
    createdAt: "5 days ago",
    isIdea: true
  },
  {
    id: "i4",
    title: "Smart Study Space Reservation System",
    description: "An IoT system to monitor and reserve study spaces in the library using occupancy sensors and a mobile app. Need IoT specialists and backend developers.",
    author: {
      id: "u10",
      name: "Zoe Chen",
      avatar: "https://i.pravatar.cc/150?img=24",
      school: "ENSCS - Computer Science"
    },
    tags: ["IoT", "Mobile App", "Smart Campus"],
    likesCount: 72,
    commentsCount: 34,
    createdAt: "2 days ago",
    isIdea: true
  },
  {
    id: "i5",
    title: "Quantum Algorithm for Protein Folding",
    description: "Researching how quantum computing could accelerate protein folding simulations for drug discovery. Seeking quantum computing experts and bioinformatics specialists.",
    author: {
      id: "u11",
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?img=31",
      school: "ENSQC - Quantum Computing"
    },
    tags: ["Quantum Computing", "Bioinformatics", "Drug Discovery"],
    likesCount: 103,
    commentsCount: 41,
    createdAt: "4 days ago",
    isIdea: true
  },
  {
    id: "i6",
    title: "Cross-University Knowledge Graph",
    description: "Building a knowledge graph that connects research, projects, and expertise across universities. Looking for graph database experts and academic researchers.",
    author: {
      id: "u12",
      name: "Leila Karim",
      avatar: "https://i.pravatar.cc/150?img=32",
      school: "ENSCS - Computer Science"
    },
    tags: ["Knowledge Graphs", "Data Science", "Research"],
    likesCount: 68,
    commentsCount: 27,
    createdAt: "1 week ago",
    isIdea: true
  }
];

const Ideas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const handleNewIdea = () => {
    toast({
      title: "Coming Soon",
      description: "The ability to add new ideas will be available in a future update.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Idea Board</h1>
            <Button onClick={handleNewIdea} className="tech-btn-gradient">
              <Lightbulb className="h-4 w-4 mr-2" />
              New Idea
            </Button>
          </div>
          
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
              Ideas
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Share and explore innovative ideas from the community.
            </motion.p>
          </motion.div>
          
          <div className="tech-card p-6 mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Where Innovation Begins</h2>
            <p className="text-muted-foreground mb-4">Share your ideas, get feedback, and find collaborators to turn them into reality.</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge className="bg-tech-blue hover:bg-tech-blue/80">Help Needed</Badge>
              <Badge className="bg-tech-purple hover:bg-tech-purple/80">Looking for Collaborators</Badge>
              <Badge className="bg-tech-orange hover:bg-tech-orange/80">Early Stage</Badge>
              <Badge className="bg-tech-green hover:bg-tech-green/80">Research</Badge>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ideas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          
          <Tabs defaultValue="latest" className="mb-6">
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="help-needed">Help Needed</TabsTrigger>
              <TabsTrigger value="my-skills">Matches My Skills</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ideasData.map(idea => (
              <ProjectCard key={idea.id} {...idea} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ideas;
