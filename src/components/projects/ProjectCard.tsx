
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, MessageSquare, ThumbsUp, Lightbulb, FileCode, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
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
  isIdea?: boolean;
}

const ProjectCard = ({
  id,
  title,
  description,
  author,
  tags,
  likesCount,
  commentsCount,
  createdAt,
  isIdea = false,
}: ProjectCardProps) => {
  return (
    <Card className="tech-card overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${author.id}`}>
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col">
                <Link to={`/profile/${author.id}`} className="font-medium hover:underline">
                  {author.name}
                </Link>
                <span className="text-xs text-muted-foreground">{author.school}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{createdAt}</span>
            </div>
          </div>
          
          <Link to={`/projects/${id}`} className="group">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
              {isIdea ? (
                <Lightbulb className="h-5 w-5 text-tech-yellow" />
              ) : (
                <FileCode className="h-5 w-5 text-tech-blue" />
              )}
              {title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 mb-4">{description}</p>
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="bg-muted/50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-auto py-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{likesCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5 h-auto py-1">
              <MessageSquare className="h-4 w-4" />
              <span>{commentsCount}</span>
            </Button>
          </div>
          
          <div>
            {isIdea ? (
              <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                <span>Collaborate</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            ) : (
              <Link to={`/projects/${id}`}>
                <Button size="sm" className="tech-btn-primary">View Project</Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
