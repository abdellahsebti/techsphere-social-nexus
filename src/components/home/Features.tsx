import React from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Users, 
  Trophy, 
  BookOpen, 
  Zap, 
  Target, 
  Sparkles, 
  Shield,
  Star,
  Heart,
  Lightbulb,
  Brain,
  Rocket,
  GraduationCap
} from "lucide-react";

const features = [
  {
    title: "Project Showcase",
    description: "Showcase your projects and get feedback from the community",
    icon: Code,
    color: "from-tech-blue to-tech-purple",
    badge: Star
  },
  {
    title: "Community Learning",
    description: "Learn from others and share your knowledge",
    icon: Users,
    color: "from-tech-purple to-tech-red",
    badge: Heart
  },
  {
    title: "Achievement System",
    description: "Earn badges and recognition for your contributions",
    icon: Trophy,
    color: "from-tech-red to-tech-green",
    badge: Sparkles
  },
  {
    title: "Learning Resources",
    description: "Access curated learning materials and tutorials",
    icon: BookOpen,
    color: "from-tech-green to-tech-blue",
    badge: Lightbulb
  },
  {
    title: "Skill Challenges",
    description: "Test your skills with coding challenges",
    icon: Target,
    color: "from-tech-blue to-tech-purple",
    badge: Brain
  },
  {
    title: "Mentorship",
    description: "Connect with experienced developers for guidance",
    icon: Zap,
    color: "from-tech-purple to-tech-red",
    badge: Rocket
  }
];

const Features = () => {
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
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-tech-purple/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
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
            Platform Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Our platform provides all the tools and resources you need to grow your tech career
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const BadgeIcon = feature.badge;
            return (
              <motion.div
                key={feature.title}
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
                  <div className="flex flex-col flex-grow">
                    <motion.div
                      className="relative inline-block mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                      <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 flex items-center justify-center">
                        <Icon className={`h-6 w-6 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <BadgeIcon className="h-3 w-3 text-tech-blue" />
                        </motion.div>
                      </div>
                    </motion.div>
                    <motion.h3
                      className="text-xl font-semibold mb-2 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent"
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground"
                      whileHover={{ scale: 1.02 }}
                    >
                      {feature.description}
                    </motion.p>
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
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 border border-border/50">
            <Shield className="w-5 h-5 text-tech-blue mr-2" />
            <span className="text-sm font-medium">
              Secure & Reliable Platform
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
