
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ChallengesSection from "@/components/home/ChallengesSection";
import TrendingProjects from "@/components/home/TrendingProjects";
import StatsSection from "@/components/home/StatsSection";
import ProjectCard from "@/components/projects/ProjectCard";
import LeaderboardCard from "@/components/leaderboard/LeaderboardCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

// Sample data for demonstration
const featuredProjects = [
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
  }
];

const trendingProjects = [
  {
    id: "tp1",
    title: "AI-Powered Energy Optimization",
    description: "A machine learning system that optimizes energy usage in smart buildings, reducing costs by up to 30%.",
    author: {
      id: "u5",
      name: "Maria Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=6",
      school: "ENSAI - Artificial Intelligence"
    },
    tags: ["AI", "Energy", "IoT"],
    likesCount: 156,
    commentsCount: 47,
    createdAt: "1 day ago"
  },
  {
    id: "tp2",
    title: "Blockchain Voting System",
    description: "A secure, transparent voting platform built on blockchain technology for organizational elections.",
    author: {
      id: "u3",
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "ENSBS - Blockchain Studies"
    },
    tags: ["Blockchain", "Security", "Web3"],
    likesCount: 143,
    commentsCount: 31,
    createdAt: "3 days ago"
  },
  {
    id: "tp3",
    title: "AR Learning Environment",
    description: "An augmented reality application that transforms any space into an interactive learning environment.",
    author: {
      id: "u7",
      name: "James Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
      school: "ENSBS - AR Studies"
    },
    tags: ["AR", "Education", "Mobile"],
    likesCount: 121,
    commentsCount: 26,
    createdAt: "4 days ago"
  }
];

const featuredIdeas = [
  {
    id: "i1",
    title: "Blockchain-Based Academic Credential System",
    description: "Creating a secure, decentralized platform for academic credential verification using blockchain technology.",
    author: {
      id: "u3",
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "ENSBS - Blockchain Studies"
    },
    tags: ["Blockchain", "Security", "Web3"],
    likesCount: 84,
    commentsCount: 37,
    createdAt: "3 days ago",
    isIdea: true
  }
];

const leaderboardUsers = [
  {
    id: "u1",
    rank: 1,
    name: "Alex Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    school: "ENSCS",
    level: 28,
    xp: 28450
  },
  {
    id: "u4",
    rank: 2,
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=10",
    school: "ENSNN",
    level: 27,
    xp: 27200
  },
  {
    id: "u5",
    rank: 3,
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=7",
    school: "ENSAI",
    level: 26,
    xp: 26100
  },
  {
    id: "u6",
    rank: 4,
    name: "Sophia Lee",
    avatar: "https://i.pravatar.cc/150?img=9",
    school: "ENSCS",
    level: 25,
    xp: 25300
  },
  {
    id: "u7",
    rank: 5,
    name: "James Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=4",
    school: "ENSBS",
    level: 24,
    xp: 24600
  }
];

const Index = () => {
  const { addNotification } = useAppContext();

  const handleJoinChallenge = () => {
    addNotification({
      id: Math.random().toString(36).substring(7),
      title: "Challenge Joined!",
      message: "You've successfully joined the latest challenge. Check your profile for details.",
      type: "success",
      read: false
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <StatsSection />
        <Features />
        
        <TrendingProjects projects={trendingProjects} />
        
        {/* Featured Projects Section */}
        <section className="py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">Discover innovative projects from our community.</p>
              </div>
              <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link to="/projects">
                  Explore All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </section>
        
        <ChallengesSection onJoinChallenge={handleJoinChallenge} />
        
        {/* Ideas & Leaderboard Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Fresh Ideas</h2>
                    <p className="text-muted-foreground">Seeking collaboration or feedback.</p>
                  </div>
                  <Button asChild variant="outline" className="mt-4 md:mt-0">
                    <Link to="/ideas">
                      See All Ideas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {featuredIdeas.map(idea => (
                    <ProjectCard key={idea.id} {...idea} />
                  ))}
                </div>
              </div>
              
              <div>
                <LeaderboardCard 
                  title="Weekly Leaderboard" 
                  period="This Week" 
                  users={leaderboardUsers} 
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
