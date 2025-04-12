import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BookOpen,
  Code,
  Lightbulb,
  Trophy,
  Zap
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Mock Data
const mockPosts = [
  {
    id: "b1",
    title: "The Future of Quantum Computing in Education",
    excerpt: "Explore how quantum computing is revolutionizing the way we teach and learn computer science, from basic concepts to advanced applications.",
    content: "Quantum computing represents a paradigm shift in how we process information...",
    author: {
      name: "Dr. Emily Foster",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Research Lead"
    },
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Technology",
    tags: ["Quantum Computing", "Education", "Future Tech"],
    likes: 128,
    comments: 42,
    image: "https://picsum.photos/800/400"
  },
  {
    id: "b2",
    title: "Building Sustainable Tech Solutions",
    excerpt: "Learn about the latest trends in sustainable technology and how students can contribute to a greener future through innovative projects.",
    content: "As the world faces increasing environmental challenges...",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Sustainability Expert"
    },
    date: "2024-03-10",
    readTime: "4 min read",
    category: "Sustainability",
    tags: ["Green Tech", "Innovation", "Environment"],
    likes: 96,
    comments: 28,
    image: "https://picsum.photos/800/400"
  }
];

const BlogCard = ({ post, index }) => {
  const { darkMode } = useAppContext();
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
      } transition-all duration-300`}
    >
      {/* Enhanced shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
        darkMode ? "via-white/10" : "via-white/5"
      } to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
      
      <div className="relative">
        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4"
          >
            {post.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className={`h-8 w-8 ${isSaved ? "text-tech-yellow" : ""}`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{post.author.name}</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{post.author.role}</span>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

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

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Blog = () => {
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
            Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Read the latest articles and insights from our community.
          </motion.p>
        </motion.div>

        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className={`pl-10 backdrop-blur-sm ${
              darkMode ? "bg-slate-800/50" : "bg-background/50"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-4 max-w-md mx-auto backdrop-blur-sm ${
              darkMode ? "bg-slate-800/50" : "bg-background/50"
            }`}>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
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
    </div>
  );
};

export default Blog; 