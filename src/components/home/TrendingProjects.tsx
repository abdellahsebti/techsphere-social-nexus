import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Star, 
  Users, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  Sparkles,
  Zap,
  Target,
  Flame
} from "lucide-react";

const trendingProjects = [
  {
    title: "AI Image Recognition",
    description: "Deep learning model for real-time image classification",
    author: "Sarah Chen",
    likes: 234,
    comments: 45,
    tags: ["AI", "Python", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    badge: Sparkles
  },
  {
    title: "Web3 DApp",
    description: "Decentralized application for NFT trading",
    author: "Mike Johnson",
    likes: 189,
    comments: 32,
    tags: ["Web3", "React", "Solidity"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    badge: Zap
  },
  {
    title: "Mobile Game",
    description: "Cross-platform game using Flutter",
    author: "Alex Wong",
    likes: 156,
    comments: 28,
    tags: ["Flutter", "Dart", "Games"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    badge: Target
  },
  {
    title: "Data Analytics Dashboard",
    description: "Real-time analytics visualization platform",
    author: "Emma Davis",
    likes: 145,
    comments: 23,
    tags: ["React", "D3.js", "Data"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    badge: Flame
  }
];

const TrendingProjects = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background/50 to-background"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-tech-blue/10 text-tech-blue text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Trending Projects
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
          >
            Explore Popular Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the most engaging and innovative projects from our community
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProjects.map((project, index) => {
            const BadgeIcon = project.badge;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="group relative"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <motion.div
                  className="relative p-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50 h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative mb-4">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 bg-background rounded-full p-1.5 border border-border/50"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <BadgeIcon className="h-4 w-4 text-tech-blue" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <motion.h3
                      className="text-xl font-semibold mb-2 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground text-sm mb-4 line-clamp-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.description}
                    </motion.p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-tech-blue/10 text-tech-blue"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{project.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-tech-blue" />
                          <span className="text-sm">{project.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="group">
            View All Projects
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProjects;
