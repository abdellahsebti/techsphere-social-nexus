
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, Trophy, BookOpen } from "lucide-react";
import { cardStyles, animations } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  color,
  delay = 0 
}) => (
  <Card 
    className={cn(
      "border-0 overflow-hidden relative",
      animations.fadeIn,
      animations.slideUp
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`absolute inset-0 opacity-5 ${color}`} />
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`p-2 rounded-full ${color} shadow-glow`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tech-blue to-tech-purple opacity-30" />
      <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-tech-blue/5 blur-3xl" />
      <div className="absolute -bottom-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-tech-purple/5 blur-3xl" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Our Growing Community</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Join thousands of students and educators in the TechSphere network to collaborate, 
            learn, and showcase your technical skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Active Users"
            value="12,500+"
            description="Students and educators from top universities worldwide"
            icon={<Users className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-tech-blue"
            delay={100}
          />
          <StatCard
            title="Projects"
            value="8,200+"
            description="Innovative student projects across all technical domains"
            icon={<Code className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-tech-purple to-purple-500"
            delay={200}
          />
          <StatCard
            title="Challenges Completed"
            value="34,120+"
            description="Technical challenges solved by our community members"
            icon={<Trophy className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-amber-500 to-yellow-400"
            delay={300}
          />
          <StatCard
            title="Learning Resources"
            value="5,340+"
            description="Shared resources to help you master new skills faster"
            icon={<BookOpen className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-green-500 to-teal-400"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
