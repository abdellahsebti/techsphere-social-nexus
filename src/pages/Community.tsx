import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Community = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      description: "Learn the fundamentals of web development and start your journey in tech.",
      author: "Sebti Abdellah",
      date: "2024-04-01",
      readTime: "5 min read",
      image: "/blog/web-dev.jpg",
      category: "Web Development",
    },
    {
      id: 2,
      title: "The Future of AI in Education",
      description: "Exploring how artificial intelligence is transforming the educational landscape.",
      author: "TechSphere Team",
      date: "2024-03-28",
      readTime: "8 min read",
      image: "/blog/ai-education.jpg",
      category: "Artificial Intelligence",
    },
    {
      id: 3,
      title: "Building a Strong Developer Portfolio",
      description: "Tips and tricks to create an impressive portfolio that stands out to employers.",
      author: "Sebti Abdellah",
      date: "2024-03-25",
      readTime: "6 min read",
      image: "/blog/portfolio.jpg",
      category: "Career Development",
    },
  ];

  return (
    <div className="container py-8">
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
          Community Blog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Discover insights, tutorials, and stories from our community of developers and tech enthusiasts.
        </motion.p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-tech-blue/90 text-white rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold hover:text-tech-blue transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <Button
                  variant="ghost"
                  className="group/button text-tech-blue hover:text-tech-purple"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover/button:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-tech-blue to-tech-purple hover:from-tech-blue/90 hover:to-tech-purple/90 text-white"
        >
          View All Posts
        </Button>
      </motion.div>
    </div>
  );
};

export default Community; 