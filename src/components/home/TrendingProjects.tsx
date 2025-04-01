
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ExternalLink } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

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
    <section className="py-10">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-tech-purple" />
              Trending Projects
            </h2>
            <p className="text-muted-foreground">Discover what's hot in the community right now</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleFavorite(project.id)}
                    className={favorites.includes(project.id) ? "text-yellow-500" : ""}
                  >
                    <Star className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.author.avatar} alt={project.author.name} />
                    <AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{project.author.name}</span>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <ExternalLink className="h-3 w-3 mr-1" /> View
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
