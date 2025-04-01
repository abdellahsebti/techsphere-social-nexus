import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, MessageCircle, ExternalLink } from "lucide-react";

const About = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/abdellah.sebtii",
      color: "text-pink-500 hover:text-pink-600",
      bgColor: "hover:bg-pink-500/10",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/abdellah-sebti",
      color: "text-blue-500 hover:text-blue-600",
      bgColor: "hover:bg-blue-500/10",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/213541174197",
      color: "text-green-500 hover:text-green-600",
      bgColor: "hover:bg-green-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent mb-6">
            About TechSphere Social
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TechSphere Social is an innovative platform designed to bridge the gap between academia and industry,
            fostering collaboration and knowledge sharing among students and faculty members.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2 mb-16"
        >
          <Card className="group hover:shadow-lg transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create a collaborative ecosystem where students and faculty can showcase their projects,
                engage in meaningful discussions, and develop their skills through gamified experiences.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To become the leading platform for academic innovation and collaboration,
                empowering the next generation of tech leaders.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
                Meet the Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="flex flex-col items-center space-y-6">
                <motion.div
                  className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-tech-blue/50 hover:border-tech-blue transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="/abdellah.jpg"
                    alt="Sebti Abdellah"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </motion.div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent">
                    Sebti Abdellah
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 flex items-center justify-center gap-2 hover:text-foreground transition-colors">
                    <span>Student at ENSTSA</span>
                    <ExternalLink className="h-4 w-4 animate-pulse" />
                  </p>
                  <div className="flex justify-center space-x-6">
                    {socialLinks.map((social) => (
                      <motion.div
                        key={social.name}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`rounded-full ${social.color} ${social.bgColor} transition-colors duration-300 shadow-sm hover:shadow-md`}
                          onClick={() => window.open(social.url, "_blank")}
                          title={social.name}
                        >
                          <social.icon className="h-5 w-5" />
                          <span className="sr-only">{social.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 