
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, Users, Award, Zap } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative py-12 md:py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] h-[800px] w-[800px] rounded-full bg-tech-purple/10 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[30%] h-[800px] w-[800px] rounded-full bg-tech-blue/10 blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col gap-6 animate-slide-in-bottom">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-4 text-sm font-medium bg-background">
              <span className="flex h-2 w-2 rounded-full bg-tech-green mr-2"></span>
              Connecting Tech Students & Faculty
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Where Innovation Meets <span className="bg-gradient-to-r from-tech-blue to-tech-purple text-transparent bg-clip-text">Recognition</span>
            </h1>
            <p className="text-xl text-muted-foreground md:w-[85%]">
              Showcase your projects, collaborate on groundbreaking ideas, earn XP, and build your tech network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button className="tech-btn-gradient h-12 px-8" size="lg" asChild>
                <Link to="/signup">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="h-12 px-8" size="lg" asChild>
                <Link to="/explore">
                  Explore Projects
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-tech-purple" />
                <span className="text-sm font-medium">5,000+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-tech-blue" />
                <span className="text-sm font-medium">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-tech-green" />
                <span className="text-sm font-medium">500+ Challenges</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[500px] animate-slide-in-bottom animation-delay-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative rounded-3xl overflow-hidden border shadow-xl w-full max-w-[500px] h-[90%]">
                <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/80 to-tech-purple/80" />
                <div className="relative p-6 flex flex-col h-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm">Level Up Your Tech Career</p>
                      <p className="text-white/70 text-xs">Earn XP & Recognition</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                      <p className="text-white text-xs mb-1">Weekly Leaderboard</p>
                      <p className="text-white font-bold">Top 10</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                      <p className="text-white text-xs mb-1">Active Challenges</p>
                      <p className="text-white font-bold">24 Live Now</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 mb-4">
                    <p className="text-white text-xs mb-1">Featured Project</p>
                    <p className="text-white font-bold mb-2">Quantum Machine Learning</p>
                    <div className="flex gap-2">
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">AI</span>
                      <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Quantum</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white text-sm">Your XP Progress</p>
                        <p className="text-white/80 text-xs">Lvl 12</p>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-[65%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
