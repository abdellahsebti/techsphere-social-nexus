
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ExternalLink, MessageSquare, ThumbsUp } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { animations } from "@/lib/theme";

type TrendingProject = {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    school: string;
  };
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
};

interface TrendingProjectsProps {
  projects: TrendingProject[];
}

const TrendingProjects: React.FC<TrendingProjectsProps> = ({ projects }) => {
  const { favorites, toggleFavorite } = useAppContext();

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-[250px] -right-[250px] w-[500px] h-[500px] rounded-full bg-tech-blue/5 blur-3xl" />
      <div className="absolute -bottom-[250px] -left-[250px] w-[500px] h-[500px] rounded-full bg-tech-purple/5 blur-3xl" />
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center mb-2">
              <Sparkles className="mr-2 h-6 w-6 text-tech-purple" />
              Trending Projects
            </h2>
            <p className="text-muted-foreground">Discover the most exciting work happening in our tech community</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={cn(
                "overflow-hidden transition-all hover:shadow-md border border-border/50 group",
                animations.fadeIn,
                animations.slideUp
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-tech-blue to-tech-purple transform origin-left transition-transform scale-x-0 group-hover:scale-x-100" />
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold tracking-tight">{project.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleFavorite(project.id)}
                    className={cn(
                      "h-8 w-8 rounded-full transition-all",
                      favorites.includes(project.id) ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground"
                    )}
                  >
                    <Star className="h-[18px] w-[18px]" fill={favorites.includes(project.id) ? "currentColor" : "none"} />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2 mt-1">{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="bg-muted/70 hover:bg-muted text-xs font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {project.likesCount}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {project.commentsCount}
                  </div>
                  <div className="text-sm">{project.createdAt}</div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-4 border-t border-border/50">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage src={project.author.avatar} alt={project.author.name} />
                    <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{project.author.name}</span>
                    <span className="text-xs text-muted-foreground">{project.author.school}</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                  <ExternalLink className="h-3 w-3" /> View Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProjects;
