
import React from "react";
import { 
  Users, 
  Sparkles, 
  Lightbulb, 
  Trophy, 
  Code, 
  Award, 
  Rocket,
  Zap
} from "lucide-react";

const features = [
  {
    icon: <Users className="h-6 w-6 text-tech-blue" />,
    title: "Student & Faculty Profiles",
    description: "Create your custom Tech ID with your specialization, skills, and achievements. Build your academic and professional network."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-tech-purple" />,
    title: "Project & Idea Sharing",
    description: "Showcase completed projects, pitch new ideas, request collaboration, and upload rich media content."
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-tech-yellow" />,
    title: "Reactions & Engagement",
    description: "React with 'Genius', 'Collab?', 'Game Changer', and special milestone reactions to recognize innovations."
  },
  {
    icon: <Trophy className="h-6 w-6 text-tech-orange" />,
    title: "XP & Gamification",
    description: "Earn XP for contributions, climb leaderboards, and unlock exclusive perks and recognition."
  },
  {
    icon: <Code className="h-6 w-6 text-tech-green" />,
    title: "Challenges & Tournaments",
    description: "Participate in school-specific contests, cross-school battles, hackathons, and skill-based missions."
  },
  {
    icon: <Rocket className="h-6 w-6 text-tech-red" />,
    title: "AI-Curated Feed",
    description: "Discover personalized content based on your skills, interests, and potential collaboration matches."
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-muted mb-4">
            <Zap className="h-4 w-4 mr-2 text-tech-purple" />
            Platform Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to <span className="bg-gradient-to-r from-tech-blue to-tech-purple text-transparent bg-clip-text">Thrive</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px]">
            TechSphere Social combines collaboration, recognition, and skill development in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="tech-card p-6 flex flex-col items-start animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4 border">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
