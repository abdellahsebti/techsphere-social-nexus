import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, Code, Trophy, BookOpen } from "lucide-react";

const stats = [
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Projects Created", value: "5K+", icon: Code },
  { label: "Challenges Won", value: "1K+", icon: Trophy },
  { label: "Learning Resources", value: "500+", icon: BookOpen }
];

const StatsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section 
      ref={ref}
      style={{ opacity, y, scale }}
      className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-tech-blue/5 via-tech-purple/5 to-tech-red/5"
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
        className="absolute -top-40 -left-40 w-80 h-80 bg-tech-blue/10 rounded-full blur-3xl"
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
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-tech-purple/10 rounded-full blur-3xl"
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

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Impact
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join thousands of tech enthusiasts who are learning, building, and growing together
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="text-center group relative"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-tech-blue/10 to-tech-purple/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <motion.div
                  className="relative inline-block"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-tech-blue/20 to-tech-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <div className="relative p-4 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
                    <Icon className="h-8 w-8 text-tech-blue" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-3xl font-bold mb-2 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
