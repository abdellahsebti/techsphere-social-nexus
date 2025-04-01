
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Award, 
  Trophy, 
  Menu 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-sm bg-background/90 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-tech-blue to-tech-purple text-transparent bg-clip-text font-bold text-xl">
              TechSphere
            </span>
          </Link>
          
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link to="/feed">
              <Button variant="ghost" size="sm" className="rounded-full">Feed</Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost" size="sm" className="rounded-full">Projects</Button>
            </Link>
            <Link to="/challenges">
              <Button variant="ghost" size="sm" className="rounded-full">Challenges</Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="ghost" size="sm" className="rounded-full">Leaderboard</Button>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-tech-red"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <Link to="/profile">
              <Avatar className="h-8 w-8 border-2 border-tech-purple">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/feed">Feed</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/projects">Projects</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/challenges">Challenges</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/leaderboard">Leaderboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
