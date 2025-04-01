
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Code, Trophy, BookOpen } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color }) => (
  <Card className="border-0 shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const StatsSection: React.FC = () => {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Our Growing Community</h2>
          <p className="text-muted-foreground mt-2">Join thousands of students and educators in the TechSphere</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Users"
            value="12,500+"
            description="Students and educators from top universities"
            icon={<Users className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-tech-blue"
          />
          <StatCard
            title="Projects"
            value="8,200+"
            description="Innovative student projects across all domains"
            icon={<Code className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-tech-purple to-purple-500"
          />
          <StatCard
            title="Challenges Completed"
            value="34,120+"
            description="Technical challenges solved by our community"
            icon={<Trophy className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-amber-500 to-yellow-400"
          />
          <StatCard
            title="Learning Resources"
            value="5,340+"
            description="Shared resources to help you master new skills"
            icon={<BookOpen className="h-4 w-4 text-white" />}
            color="bg-gradient-to-r from-green-500 to-teal-400"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
