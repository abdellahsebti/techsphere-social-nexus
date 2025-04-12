import React from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2,
  Clock,
  Code,
  Users,
  Trophy,
  Lightbulb,
  ArrowRight,
  Star,
  Zap,
  BookOpen,
  Target
} from "lucide-react";

const RoadmapItem = ({ title, description, status, icon: Icon, features }) => {
  const { darkMode } = useAppContext();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative ${
        darkMode 
          ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50"
          : "bg-gradient-to-r from-background to-background/80"
      } rounded-lg p-6`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${
          darkMode ? "bg-slate-800" : "bg-muted"
        }`}>
          <Icon className="h-6 w-6 text-tech-blue" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">{title}</h3>
            <Badge variant={status === "completed" ? "default" : "secondary"}>
              {status === "completed" ? "Completed" : "In Progress"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                {status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-500" />
                )}
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Roadmap = () => {
  const { darkMode } = useAppContext();

  const roadmapItems = [
    {
      title: "Platform Launch",
      description: "Initial release of TechSphere with core features",
      status: "completed",
      icon: Target,
      features: [
        "User authentication and profiles",
        "Project showcase functionality",
        "Basic collaboration tools",
        "Community features"
      ]
    },
    {
      title: "Enhanced Collaboration",
      description: "Improved tools for team collaboration and project management",
      status: "completed",
      icon: Users,
      features: [
        "Real-time collaboration",
        "Project templates",
        "Team management",
        "File sharing"
      ]
    },
    {
      title: "Learning Platform",
      description: "Integration of learning resources and tutorials",
      status: "in-progress",
      icon: BookOpen,
      features: [
        "Interactive tutorials",
        "Video courses",
        "Progress tracking",
        "Certification system"
      ]
    },
    {
      title: "Competition System",
      description: "Launch of coding competitions and hackathons",
      status: "in-progress",
      icon: Trophy,
      features: [
        "Competition platform",
        "Judging system",
        "Prize distribution",
        "Leaderboards"
      ]
    },
    {
      title: "AI Integration",
      description: "Implementation of AI-powered features",
      status: "in-progress",
      icon: Zap,
      features: [
        "Code suggestions",
        "Project recommendations",
        "Automated code review",
        "Smart matching"
      ]
    },
    {
      title: "Mobile App",
      description: "Development of mobile applications",
      status: "in-progress",
      icon: Star,
      features: [
        "iOS application",
        "Android application",
        "Offline support",
        "Push notifications"
      ]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
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
              Roadmap
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Explore our development roadmap and upcoming features.
            </motion.p>
          </motion.div>

          <div className="grid gap-6">
            {roadmapItems.map((item, index) => (
              <RoadmapItem key={item.title} {...item} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-12 p-6 rounded-lg ${
              darkMode 
                ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50"
                : "bg-gradient-to-r from-background to-background/80"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Future Plans</h2>
            <p className="text-muted-foreground">
              We're constantly working on improving TechSphere. Stay tuned for more exciting features and updates!
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Roadmap; 