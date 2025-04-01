
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Sample data for projects
const projectsData = [
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
    createdAt: "2 days ago"
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
    createdAt: "1 week ago"
  },
  {
    id: "p3",
    title: "Blockchain-Based Academic Credential System",
    description: "A secure, decentralized platform for academic credential verification using blockchain technology.",
    author: {
      id: "u3",
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "ENSBS - Blockchain Studies"
    },
    tags: ["Blockchain", "Security", "Web3"],
    likesCount: 84,
    commentsCount: 37,
    createdAt: "3 days ago"
  },
  {
    id: "p4",
    title: "Neural Interface for Prosthetic Limbs",
    description: "A brain-computer interface that translates neural signals into precise control commands for prosthetic limbs.",
    author: {
      id: "u4",
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=10",
      school: "ENSNN - Neural Networks"
    },
    tags: ["Neuroscience", "Prosthetics", "Signal Processing"],
    likesCount: 112,
    commentsCount: 45,
    createdAt: "5 days ago"
  },
  {
    id: "p5",
    title: "AR Educational Platform for STEM",
    description: "An augmented reality platform that makes complex STEM concepts tangible and interactive for students.",
    author: {
      id: "u5",
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=7",
      school: "ENSAI - AR/VR Innovations"
    },
    tags: ["AR/VR", "Education", "Unity3D"],
    likesCount: 78,
    commentsCount: 32,
    createdAt: "1 week ago"
  },
  {
    id: "i1",
    title: "Sustainable Energy Monitoring System",
    description: "Looking for collaborators on a system that uses IoT sensors to monitor and optimize energy usage in buildings. Need expertise in IoT and data visualization.",
    author: {
      id: "u6",
      name: "Sophia Lee",
      avatar: "https://i.pravatar.cc/150?img=9",
      school: "ENSCS - Computer Science"
    },
    tags: ["IoT", "Sustainability", "Data Visualization"],
    likesCount: 62,
    commentsCount: 29,
    createdAt: "4 days ago",
    isIdea: true
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    schools: [],
    tags: [],
    verified: false,
  });
  const { toast } = useToast();
  
  const handleNewProject = () => {
    toast({
      title: "Coming Soon",
      description: "The ability to create new projects will be available in a future update.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Projects Hub</h1>
            <Button onClick={handleNewProject} className="tech-btn-gradient">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Projects</DialogTitle>
                  <DialogDescription>
                    Narrow down projects based on your interests and preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Schools</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="enscs" />
                        <Label htmlFor="enscs">ENSCS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ensnn" />
                        <Label htmlFor="ensnn">ENSNN</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ensbs" />
                        <Label htmlFor="ensbs">ENSBS</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ensai" />
                        <Label htmlFor="ensai">ENSAI</Label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Popular Tags</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ai" />
                        <Label htmlFor="ai">AI/ML</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="blockchain" />
                        <Label htmlFor="blockchain">Blockchain</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="iot" />
                        <Label htmlFor="iot">IoT</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="arvr" />
                        <Label htmlFor="arvr">AR/VR</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verified" />
                    <Label htmlFor="verified">Verified Projects Only</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setFilterOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="featured" className="mb-6">
            <TabsList className="grid w-full grid-cols-4 max-w-md">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
