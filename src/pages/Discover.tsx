import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/projects/ProjectCard";
import SkillBadge from "@/components/profile/SkillBadge";
import { Search, Compass, Zap, Users, Lightbulb, BookOpen, Briefcase, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Sample discover data
const trendingProjects = [
  {
    id: "tp1",
    title: "Quantum Machine Learning Framework",
    description: "A framework that combines quantum computing principles with machine learning algorithms to enhance predictive capabilities.",
    author: {
      id: "u1",
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      school: "ENSCS - Computer Science"
    },
    tags: ["Quantum", "Machine Learning", "Python"],
    likesCount: 128,
    commentsCount: 42,
    createdAt: "2 days ago"
  },
  {
    id: "tp2",
    title: "Blockchain-Based Academic Credential System",
    description: "A secure, decentralized platform for academic credential verification using blockchain technology.",
    author: {
      id: "u3",
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "ENSBS - Blockchain Studies"
    },
    tags: ["Blockchain", "Security", "Web3"],
    likesCount: 84,
    commentsCount: 37,
    createdAt: "3 days ago"
  }
];

const recommendedMentors = [
  {
    id: "m1",
    name: "Dr. Emily Foster",
    position: "Professor of AI Ethics",
    school: "ENSNN",
    avatar: "https://i.pravatar.cc/150?img=20",
    expertise: ["AI Ethics", "Neural Networks", "Machine Learning"],
    rating: 4.9,
    students: 24
  },
  {
    id: "m2",
    name: "Prof. Richard Tanaka",
    position: "Quantum Computing Researcher",
    school: "ENSQC",
    avatar: "https://i.pravatar.cc/150?img=12",
    expertise: ["Quantum Algorithms", "Computational Physics", "Mathematics"],
    rating: 4.8,
    students: 18
  },
  {
    id: "m3",
    name: "Dr. Nadia El-Amin",
    position: "Blockchain Innovation Lead",
    school: "ENSBS",
    avatar: "https://i.pravatar.cc/150?img=25",
    expertise: ["Blockchain", "Cryptography", "Distributed Systems"],
    rating: 4.7,
    students: 32
  }
];

const upcomingEvents = [
  {
    id: "e1",
    title: "AI Ethics Workshop",
    description: "A hands-on workshop exploring ethical considerations in AI development.",
    date: "Nov 15, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual",
    organizer: "ENSNN Ethics Committee",
    attendees: 87
  },
  {
    id: "e2",
    title: "Blockchain Development Bootcamp",
    description: "Intensive three-day bootcamp covering blockchain fundamentals and smart contract development.",
    date: "Nov 18-20, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "ENSBS Innovation Lab",
    organizer: "Blockchain Student Association",
    attendees: 45
  },
  {
    id: "e3",
    title: "Quantum Computing Industry Panel",
    description: "Industry experts discuss the future of quantum computing in various sectors.",
    date: "Nov 22, 2023",
    time: "6:30 PM - 8:30 PM",
    location: "Main Auditorium",
    organizer: "ENSQC Department",
    attendees: 120
  }
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
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
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Discover</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore personalized recommendations, find collaborators, and discover new opportunities across TechSphere.
            </p>
            
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for projects, people, skills, events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="recommendations" className="mb-8">
            <TabsList className="w-full grid grid-cols-4 sm:w-auto sm:inline-grid">
              <TabsTrigger value="recommendations">
                <Zap className="h-4 w-4 mr-2 hidden sm:inline" />
                For You
              </TabsTrigger>
              <TabsTrigger value="people">
                <Users className="h-4 w-4 mr-2 hidden sm:inline" />
                People
              </TabsTrigger>
              <TabsTrigger value="projects">
                <Lightbulb className="h-4 w-4 mr-2 hidden sm:inline" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="opportunities">
                <Briefcase className="h-4 w-4 mr-2 hidden sm:inline" />
                Opportunities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Trending Projects */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Trending Projects</CardTitle>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                          View All <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>Projects you might be interested in based on your skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trendingProjects.map(project => (
                          <ProjectCard key={project.id} {...project} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Recommended Collaborators */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>People You Might Know</CardTitle>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                          View All <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>Students and faculty with similar interests and skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={`https://i.pravatar.cc/150?img=${30 + i}`} />
                              <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <h4 className="font-medium">Student {i + 1}</h4>
                              <p className="text-xs text-muted-foreground">ENSCS - Level 18</p>
                              <div className="flex gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">AI</Badge>
                                <Badge variant="outline" className="text-xs">Python</Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="ml-auto">Connect</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {/* Events and Opportunities */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Workshops, seminars, and networking opportunities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {event.attendees} attending
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground mb-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {event.date} • {event.time}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs">{event.organizer}</span>
                            <Button size="sm" variant="outline">RSVP</Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full flex items-center gap-1">
                        View All Events <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Recommended Skills */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle>Skills to Explore</CardTitle>
                      <CardDescription>Based on your interests and current skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <SkillBadge name="Quantum Computing" level={2} endorsements={156} />
                        <SkillBadge name="React Native" level={3} endorsements={234} />
                        <SkillBadge name="Rust" level={4} endorsements={187} />
                        <SkillBadge name="Data Visualization" level={3} endorsements={243} />
                        <SkillBadge name="GraphQL" level={2} endorsements={176} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full flex items-center gap-1">
                        Explore More Skills <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="people" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mentor Section */}
                <Card className="md:col-span-2 mb-6">
                  <CardHeader>
                    <CardTitle>Find a Mentor</CardTitle>
                    <CardDescription>Connect with faculty and experienced students for guidance and support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recommendedMentors.map(mentor => (
                        <Card key={mentor.id} className="tech-hover-card">
                          <CardHeader className="text-center pb-2">
                            <Avatar className="h-20 w-20 mx-auto mb-2">
                              <AvatarImage src={mentor.avatar} />
                              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg">{mentor.name}</CardTitle>
                            <CardDescription>{mentor.position}</CardDescription>
                            <Badge variant="outline" className="mt-2">
                              {mentor.school}
                            </Badge>
                          </CardHeader>
                          <CardContent className="text-center pt-0">
                            <div className="flex flex-wrap justify-center gap-1 mb-3">
                              {mentor.expertise.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex justify-center items-center text-sm mb-4">
                              <span className="flex items-center">
                                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1">{mentor.rating}/5.0</span>
                              </span>
                              <span className="mx-2">•</span>
                              <span>{mentor.students} mentees</span>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 justify-center">
                            <Button size="sm">Request Mentorship</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* People with similar interests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Similar Interests</CardTitle>
                    <CardDescription>People working on projects similar to yours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${40 + i}`} />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-grow">
                            <h4 className="font-medium">Student Name</h4>
                            <p className="text-xs text-muted-foreground">ENSCS - Level 22</p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="outline" className="text-xs">Blockchain</Badge>
                              <Badge variant="outline" className="text-xs">Security</Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* People from your school */}
                <Card>
                  <CardHeader>
                    <CardTitle>From Your School</CardTitle>
                    <CardDescription>Connect with others from ENSCS</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${50 + i}`} />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-grow">
                            <h4 className="font-medium">ENSCS Student</h4>
                            <p className="text-xs text-muted-foreground">Year 3 - Level 19</p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="outline" className="text-xs">Python</Badge>
                              <Badge variant="outline" className="text-xs">Data Science</Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Projects You Might Like</CardTitle>
                      <CardDescription>Based on your skills and interests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                          <ProjectCard 
                            key={i}
                            id={`rec-p-${i}`}
                            title={`Recommended Project ${i + 1}`}
                            description="This is a project that matches your interests and skills profile."
                            author={{
                              id: `u-${i}`,
                              name: `Author ${i + 1}`,
                              avatar: `https://i.pravatar.cc/150?img=${60 + i}`,
                              school: "ENSCS - Computer Science"
                            }}
                            tags={["AI", "Web Development", "Data Science"]}
                            likesCount={Math.floor(Math.random() * 100) + 20}
                            commentsCount={Math.floor(Math.random() * 40) + 10}
                            createdAt={`${Math.floor(Math.random() * 7) + 1} days ago`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Categories</CardTitle>
                      <CardDescription>Browse by technology or field</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {["Artificial Intelligence", "Blockchain", "Cybersecurity", "Data Science", "AR/VR", "IoT", "Quantum Computing", "Robotics"].map(category => (
                          <Button key={category} variant="outline" className="w-full justify-start text-left" size="sm">
                            {category}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Looking for Collaborators</CardTitle>
                      <CardDescription>Projects seeking your expertise</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                            <h4 className="font-medium">Collaboration Opportunity {i + 1}</h4>
                            <p className="text-xs text-muted-foreground mb-2">
                              Seeking {i === 0 ? "ML engineers" : i === 1 ? "UI designers" : "backend developers"}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <Badge variant="outline" className="text-xs">
                                {i === 0 ? "AI Project" : i === 1 ? "Web App" : "Mobile App"}
                              </Badge>
                              <Button size="sm" variant="outline">Learn More</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="opportunities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Featured Opportunities</CardTitle>
                    <CardDescription>Challenges, internships, and research positions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <Badge className="w-fit mb-2 bg-tech-blue">Challenge</Badge>
                          <CardTitle className="text-lg">AI Ethics Hackathon</CardTitle>
                          <CardDescription>Nov 15-17, 2023</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm mb-4">
                            Create AI solutions that address ethical concerns in technology. Focus on bias detection, transparency, or privacy-preserving ML.
                          </p>
                          <div className="flex justify-between text-sm text-muted-foreground mb-4">
                            <span>87 participants</span>
                            <span>100 XP reward</span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full">Register Now</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <Badge className="w-fit mb-2 bg-tech-green">Internship</Badge>
                          <CardTitle className="text-lg">Quantum Computing Lab</CardTitle>
                          <CardDescription>Applications due Dec 1</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm mb-4">
                            Work with leading researchers on quantum algorithms and applications. Open to advanced undergraduate and graduate students.
                          </p>
                          <div className="flex justify-between text-sm text-muted-foreground mb-4">
                            <span>3 month position</span>
                            <span>Paid opportunity</span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full">Apply Now</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <Badge className="w-fit mb-2 bg-tech-purple">Research</Badge>
                          <CardTitle className="text-lg">AR/VR Research Team</CardTitle>
                          <CardDescription>Applications due Nov 30</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm mb-4">
                            Join a multidisciplinary team researching immersive technology applications in education and healthcare.
                          </p>
                          <div className="flex justify-between text-sm text-muted-foreground mb-4">
                            <span>5 positions open</span>
                            <span>Undergraduate/Graduate</span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button className="w-full">Apply Now</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Workshops, seminars, and networking opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="flex flex-col md:flex-row p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <div className="md:w-32 flex-shrink-0 flex flex-col items-center justify-center text-center mb-3 md:mb-0 md:border-r md:pr-3">
                            <div className="text-2xl font-bold">
                              {event.date.split(',')[0].split(' ')[1]}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {event.date.split(',')[0].split(' ')[0]}
                            </div>
                          </div>
                          <div className="md:ml-4 flex-grow">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                            <div className="flex items-center text-xs text-muted-foreground mb-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {event.time} • {event.location}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs">{event.organizer}</span>
                              <Button size="sm">RSVP</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Career Resources</CardTitle>
                    <CardDescription>Tools to prepare for your future career</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Resume Builder
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Mock Interviews
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Internship Directory
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Compass className="h-4 w-4 mr-2" />
                        Career Assessment
                      </Button>
                    </div>
                    
                    <div className="mt-6 p-3 border rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-2">Get Personalized Guidance</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Schedule a session with a career counselor for personalized advice and feedback.
                      </p>
                      <Button className="w-full">Schedule Session</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Discover;
