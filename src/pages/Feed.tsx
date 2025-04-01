import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, MessageCircle, ThumbsUp, Share2, Bookmark, 
  Award, Zap, Users, Flame, Brain, Lightbulb, HandshakeIcon,
  TrendingUp, Filter, Code, FileText, Video, Image as ImageIcon
} from "lucide-react";

// Sample feed data
const feedPosts = [
  {
    id: "post1",
    author: {
      name: "Dr. Emily Foster",
      school: "ENSQC",
      avatar: "https://i.pravatar.cc/150?u=emily",
      badge: "Verified Researcher",
      xp: 2500,
      level: 15
    },
    content: {
      text: "Just published our latest findings on quantum error correction using machine learning! Check out the full paper and interactive demo. Looking for collaborators to extend this work into practical applications. #QuantumComputing #ML",
      media: {
        type: "pdf",
        url: "/papers/quantum-ml-paper.pdf",
        thumbnail: "/thumbnails/quantum-paper.png"
      }
    },
    stats: {
      genius: 45,
      collab: 12,
      gameChanger: 28,
      comments: 15
    },
    tags: ["Quantum Computing", "Machine Learning", "Research"],
    timestamp: "2h ago",
    xpEarned: 120
  },
  {
    id: "post2",
    author: {
      name: "Alex Chen",
      school: "ENSAI",
      avatar: "https://i.pravatar.cc/150?u=alex",
      badge: "Rising Star",
      xp: 1800,
      level: 10
    },
    content: {
      text: "🚀 Built a real-time 3D visualization system for autonomous drone navigation! Using WebGL and custom SLAM algorithms. Need help optimizing the point cloud processing - any computer vision experts interested? Code in the repo below.",
      media: {
        type: "video",
        url: "/videos/drone-demo.mp4",
        thumbnail: "/thumbnails/drone-demo.png"
      }
    },
    stats: {
      genius: 32,
      collab: 8,
      gameChanger: 15,
      comments: 23
    },
    tags: ["Computer Vision", "Robotics", "WebGL"],
    timestamp: "5h ago",
    xpEarned: 85
  }
];

// Sample trending topics
const trendingTopics = [
  { name: "Quantum ML", posts: 1234 },
  { name: "Green Tech", posts: 890 },
  { name: "Cybersecurity", posts: 756 },
  { name: "AI Ethics", posts: 645 },
  { name: "Robotics", posts: 532 }
];

const Feed = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [postType, setPostType] = useState("all");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          {/* Create Post Section */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?u=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <Input 
                    placeholder="Share your latest project or idea..." 
                    className="mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                      <Button variant="outline" size="sm">
                        <Code className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Document
                      </Button>
                    </div>
                    <Button className="tech-btn-gradient">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feed Filters */}
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="all" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="school">My School</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                Sort
              </Button>
            </div>
          </div>

          {/* Main Feed Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed Posts */}
            <div className="lg:col-span-2 space-y-6">
              {feedPosts.map(post => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* XP Progress Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold">Level 12</div>
                    <div className="text-sm text-muted-foreground">2,345 XP</div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-4">
                    <div className="h-full w-3/4 bg-gradient-to-r from-tech-blue to-tech-purple rounded-full" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    755 XP to Level 13
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trendingTopics.map(topic => (
                      <div key={topic.name} className="flex justify-between items-center p-2 hover:bg-muted rounded-lg cursor-pointer">
                        <span className="font-medium">#{topic.name}</span>
                        <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Collaborators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Suggested Collaborators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Add suggested collaborators here */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const FeedPost = ({ post }) => {
  return (
    <Card className="tech-hover-card">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author.name}</span>
                <Badge variant="outline" className="text-tech-blue border-tech-blue">
                  {post.author.badge}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{post.author.school}</span>
                <span>•</span>
                <span>Level {post.author.level}</span>
                <span>•</span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-wrap">{post.content.text}</p>
        {post.content.media && (
          <div className="rounded-lg overflow-hidden mb-4 bg-muted aspect-video flex items-center justify-center">
            {/* Add media preview here */}
            <div className="text-muted-foreground">Media Preview</div>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="text-tech-red">
            <Flame className="h-4 w-4 mr-1" />
            {post.stats.genius}
          </Button>
          <Button variant="ghost" size="sm" className="text-tech-blue">
            <HandshakeIcon className="h-4 w-4 mr-1" />
            {post.stats.collab}
          </Button>
          <Button variant="ghost" size="sm" className="text-tech-purple">
            <Lightbulb className="h-4 w-4 mr-1" />
            {post.stats.gameChanger}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.stats.comments}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-tech-green">
            +{post.xpEarned} XP
          </Badge>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Feed;