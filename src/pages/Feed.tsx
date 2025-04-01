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
  Search, 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark,
  MoreHorizontal,
  Sparkles,
  Lightbulb,
  Code,
  Trophy,
  Zap,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  Play
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Mock Data
const mockPosts = [
  {
    id: "p1",
    content: "Just completed my quantum computing project! Check out the implementation details and let me know what you think. #QuantumComputing #Innovation",
    author: {
      id: "u1",
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      school: "ENSCS - Computer Science"
    },
    likesCount: 128,
    commentsCount: 42,
    createdAt: "2 hours ago",
    type: "project",
    tags: ["Quantum", "Machine Learning", "Python"],
    media: {
      type: "image",
      url: "https://picsum.photos/800/400"
    }
  },
  {
    id: "p2",
    content: "Looking for collaborators on a new AR educational platform. Need expertise in Unity3D and educational content creation. DM if interested!",
    author: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      school: "ENSNN - Neural Networks"
    },
    likesCount: 96,
    commentsCount: 28,
    createdAt: "5 hours ago",
    type: "idea",
    tags: ["AR/VR", "Education", "Unity3D"],
    media: {
      type: "video",
      url: "https://example.com/video.mp4",
      thumbnail: "https://picsum.photos/800/400"
    }
  }
];

const PostCard = ({ post, index }) => {
  const { darkMode } = useAppContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-tech-purple">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.author.school}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <p className="text-sm mb-4">{post.content}</p>

        {/* Media */}
        {post.media && (
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img 
              src={post.media.type === "video" ? post.media.thumbnail : post.media.url} 
              alt="Post media"
              className="w-full h-auto object-cover"
            />
            {post.media.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                  <Play className="h-6 w-6 text-white" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, i) => (
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

        {/* Actions */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`gap-2 ${isLiked ? "text-tech-red" : ""}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{post.likesCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentsCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsSaved(!isSaved)}
            className={`gap-2 ${isSaved ? "text-tech-yellow" : ""}`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Feed = () => {
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
              Feed
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Discover and engage with the latest projects, ideas, and achievements from our community
            </motion.p>
            
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
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
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="ideas">Ideas</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
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

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
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

export default Feed;