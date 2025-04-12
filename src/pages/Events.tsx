import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar, 
  Clock, 
  Bookmark,
  Share2,
  MoreHorizontal,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  CalendarDays,
  MapPin,
  Users,
  Ticket,
  Video
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

// Mock Data
const mockEvents = [
  {
    id: "e1",
    title: "Tech Career Fair 2024",
    description: "Connect with leading tech companies and explore internship opportunities. Network with industry professionals and showcase your skills.",
    date: "2024-05-15",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Event",
    type: "virtual",
    attendees: 250,
    maxAttendees: 500,
    organizer: {
      name: "Career Services",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "Event Coordinator"
    },
    tags: ["Career", "Networking", "Virtual"],
    status: "upcoming"
  },
  {
    id: "e2",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop on building and deploying machine learning models. Learn from industry experts and get practical experience.",
    date: "2024-04-20",
    time: "2:00 PM - 5:00 PM",
    location: "ENSCS Building, Room 301",
    type: "in-person",
    attendees: 45,
    maxAttendees: 50,
    organizer: {
      name: "AI Research Lab",
      avatar: "https://i.pravatar.cc/150?img=5",
      role: "Research Lead"
    },
    tags: ["AI/ML", "Workshop", "In-Person"],
    status: "upcoming"
  }
];

const EventCard = ({ event, index }) => {
  const { darkMode } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "text-tech-green";
      case "ongoing":
        return "text-tech-blue";
      case "past":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative overflow-hidden rounded-lg ${
        darkMode 
          ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 hover:from-tech-blue/10 hover:to-tech-purple/10"
          : "bg-gradient-to-r from-background to-background/80 hover:from-tech-blue/5 hover:to-tech-purple/5"
      } p-4 transition-all duration-300`}
    >
      {/* Enhanced shimmer effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${
        darkMode ? "via-white/10" : "via-white/5"
      } to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={`h-8 w-8 ${isSaved ? "text-tech-yellow" : ""}`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Organizer Info */}
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
            <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{event.organizer.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{event.organizer.role}</span>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {event.type === "virtual" ? (
              <Video className="h-4 w-4 text-muted-foreground" />
            ) : (
              <MapPin className="h-4 w-4 text-muted-foreground" />
            )}
            <span>{event.location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag, i) => (
            <Badge 
              key={i}
              variant="secondary"
              className={`${
                darkMode ? "bg-slate-700/50" : "bg-muted"
              }`}
            >
              {tag}
            </Badge>
          ))}
          <Badge variant="outline" className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{event.attendees}/{event.maxAttendees} attendees</span>
          </div>
          <Button variant="outline" size="sm">
            Register
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const { darkMode } = useAppContext();

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 md:px-6"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent mb-4"
          >
            Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Discover and participate in exciting tech events and workshops.
          </motion.p>
        </motion.div>

        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className={`pl-10 backdrop-blur-sm ${
              darkMode ? "bg-slate-800/50" : "bg-background/50"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
            <TabsList className={`grid w-full grid-cols-4 max-w-md mx-auto backdrop-blur-sm ${
              darkMode ? "bg-slate-800/50" : "bg-background/50"
            }`}>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              {sortBy === "recent" ? (
                <SortDesc className="h-4 w-4" />
              ) : (
                <SortAsc className="h-4 w-4" />
              )}
              Sort
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="gap-2">
            Load More
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Events; 