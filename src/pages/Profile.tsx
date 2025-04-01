
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import XpCard from "@/components/profile/XpCard";
import SkillBadge from "@/components/profile/SkillBadge";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Mail, 
  FileCode, 
  Lightbulb, 
  Trophy,
  MapPin,
  Briefcase,
  Sparkles,
  Calendar,
  Link as LinkIcon,
  Github,
  Twitter,
  Linkedin,
  Zap
} from "lucide-react";

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

const Profile = () => {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Cover Photo */}
        <div 
          className="w-full h-48 md:h-64 lg:h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${userProfile.cover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        {/* Profile Header */}
        <div className="container px-4 md:px-6 -mt-16 md:-mt-20 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            {/* Profile Info */}
            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                    <div className="flex items-center h-6 px-2 rounded-full bg-tech-purple/20 text-tech-purple text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Level {userProfile.stats.level}
                    </div>
                  </div>
                  <p className="text-muted-foreground">@{userProfile.username}</p>
                </div>
                
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button className="tech-btn-primary">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
              
              <p className="my-4">{userProfile.bio}</p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{userProfile.position}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {userProfile.website.replace('https://', '')}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userProfile.joinedDate}</span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <a href={`https://${userProfile.socialLinks.github}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
                <a href={`https://${userProfile.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </a>
                <a href={`https://${userProfile.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Stats */}
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <XpCard 
              level={userProfile.stats.level}
              xp={userProfile.stats.xp}
              nextLevelXp={userProfile.stats.nextLevelXp}
              rank={userProfile.stats.rank}
              badges={userProfile.stats.badges}
              achievements={userProfile.stats.achievements}
            />
            
            <div className="md:col-span-2">
              <div className="tech-card p-6">
                <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.skills.map((skill, index) => (
                    <SkillBadge 
                      key={index}
                      name={skill.name}
                      level={skill.level as 1 | 2 | 3 | 4 | 5}
                      endorsements={skill.endorsements}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for Projects/Ideas */}
        <div className="container px-4 md:px-6 py-8">
          <Tabs defaultValue="projects">
            <TabsList className="mb-8">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                Projects ({userProjects.length})
              </TabsTrigger>
              <TabsTrigger value="ideas" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Ideas ({userIdeas.length})
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Achievements
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-6">
              {userProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </TabsContent>
            
            <TabsContent value="ideas" className="space-y-6">
              {userIdeas.map(idea => (
                <ProjectCard key={idea.id} {...idea} />
              ))}
            </TabsContent>
            
            <TabsContent value="achievements" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="tech-card p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-tech-purple/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-tech-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium">Achievement {index + 1}</h4>
                    <p className="text-sm text-muted-foreground">Earned on May {10 + index}, 2023</p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
