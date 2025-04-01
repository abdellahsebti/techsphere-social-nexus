
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, BookOpen, Video, FileText, Code, Link as LinkIcon, Download, Star, Clock, Users, Calendar, ExternalLink } from "lucide-react";

// Sample resources data
const learningResources = [
  {
    id: "lr1",
    title: "Introduction to Quantum Computing",
    description: "A comprehensive guide to quantum computing concepts for beginners.",
    type: "article",
    author: "Dr. Emily Foster",
    school: "ENSQC",
    views: 1243,
    rating: 4.8,
    date: "Oct 15, 2023",
    tags: ["Quantum Computing", "Beginner"]
  },
  {
    id: "lr2",
    title: "Neural Network Fundamentals",
    description: "Learn the basics of neural networks and deep learning architectures.",
    type: "video",
    author: "Prof. Sarah Johnson",
    school: "ENSNN",
    duration: "45 min",
    views: 3567,
    rating: 4.9,
    date: "Nov 2, 2023",
    tags: ["Neural Networks", "Deep Learning", "AI"]
  },
  {
    id: "lr3",
    title: "Blockchain Technology Explained",
    description: "Understanding the fundamentals of blockchain and its applications.",
    type: "article",
    author: "Michael Zhang",
    school: "ENSBS",
    views: 2105,
    rating: 4.7,
    date: "Oct 28, 2023",
    tags: ["Blockchain", "Cryptocurrency", "Web3"]
  },
  {
    id: "lr4",
    title: "Advanced Algorithms and Data Structures",
    description: "In-depth exploration of complex algorithms and efficient data structures.",
    type: "course",
    author: "Prof. Alan Kim",
    school: "ENSCS",
    modules: 12,
    students: 487,
    rating: 4.8,
    date: "Sep 10, 2023",
    tags: ["Algorithms", "Data Structures", "Programming"]
  },
  {
    id: "lr5",
    title: "AR/VR Development Workshop",
    description: "Hands-on tutorial for building immersive AR/VR experiences.",
    type: "video",
    author: "David Kim",
    school: "ENSAI",
    duration: "1h 20min",
    views: 1876,
    rating: 4.6,
    date: "Nov 5, 2023",
    tags: ["AR/VR", "Unity3D", "Game Development"]
  },
  {
    id: "lr6",
    title: "Ethics in AI: Best Practices",
    description: "Guide to ethical considerations in artificial intelligence development.",
    type: "ebook",
    author: "Dr. Lisa Chen",
    school: "ENSNN",
    pages: 142,
    downloads: 843,
    rating: 4.9,
    date: "Oct 20, 2023",
    tags: ["AI Ethics", "Responsible AI", "Technology Ethics"]
  }
];

const studyMaterials = [
  {
    id: "sm1",
    title: "Quantum Computing Formula Sheet",
    description: "Key formulas and concepts for quantum computing course.",
    type: "pdf",
    uploader: "Prof. Richard Tanaka",
    size: "2.4 MB",
    downloads: 342,
    date: "Oct 12, 2023",
    subject: "Quantum Computing"
  },
  {
    id: "sm2",
    title: "Neural Network Architecture Diagrams",
    description: "Visual representations of common neural network architectures.",
    type: "images",
    uploader: "Sarah Johnson",
    count: 15,
    downloads: 567,
    date: "Nov 3, 2023",
    subject: "Neural Networks"
  },
  {
    id: "sm3",
    title: "Blockchain Consensus Algorithms",
    description: "Comparison of different consensus mechanisms used in blockchain.",
    type: "doc",
    uploader: "Michael Zhang",
    size: "1.8 MB",
    downloads: 213,
    date: "Oct 25, 2023",
    subject: "Blockchain"
  },
  {
    id: "sm4",
    title: "Data Structures Cheat Sheet",
    description: "Quick reference for common data structures and their operations.",
    type: "pdf",
    uploader: "Prof. Alan Kim",
    size: "1.2 MB",
    downloads: 876,
    date: "Sep 28, 2023",
    subject: "Data Structures"
  }
];

const upcomingWorkshops = [
  {
    id: "ws1",
    title: "Deep Learning with PyTorch",
    description: "Hands-on workshop covering PyTorch fundamentals for deep learning projects.",
    date: "Nov 20, 2023",
    time: "2:00 PM - 5:00 PM",
    instructor: "Dr. Sarah Johnson",
    location: "Virtual",
    capacity: 100,
    registered: 78
  },
  {
    id: "ws2",
    title: "Blockchain Smart Contract Development",
    description: "Learn to write and deploy secure smart contracts on Ethereum.",
    date: "Nov 25, 2023",
    time: "1:00 PM - 4:00 PM",
    instructor: "Michael Zhang",
    location: "ENSBS Lab 302",
    capacity: 30,
    registered: 25
  },
  {
    id: "ws3",
    title: "AR/VR Prototyping Session",
    description: "Create rapid prototypes for AR/VR applications using industry tools.",
    date: "Dec 2, 2023",
    time: "10:00 AM - 2:00 PM",
    instructor: "David Kim",
    location: "ENSAI Innovation Studio",
    capacity: 25,
    registered: 18
  }
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2">Learning Resources</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore educational materials, study guides, and community knowledge to enhance your skills.
            </p>
            
            <div className="relative max-w-xl mx-auto mt-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for resources..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="learning" className="mb-8">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="learning" className="mt-6">
              {/* Featured Resource */}
              <Card className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 p-6">
                    <Badge className="mb-4 bg-tech-blue">Featured Resource</Badge>
                    <h2 className="text-2xl font-bold mb-2">AI Foundations: From Theory to Practice</h2>
                    <p className="text-muted-foreground mb-4">
                      A comprehensive learning path that takes you from AI fundamentals to advanced applications,
                      with hands-on projects and expert guidance.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">Artificial Intelligence</Badge>
                      <Badge variant="outline">Machine Learning</Badge>
                      <Badge variant="outline">Neural Networks</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span className="flex items-center mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        40+ hours of content
                      </span>
                      <span className="flex items-center mr-4">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        4.9/5.0 (243 ratings)
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        1,245 students
                      </span>
                    </div>
                    <Button className="tech-btn-gradient">
                      Start Learning Path
                    </Button>
                  </div>
                  <div className="hidden md:flex md:items-center md:justify-center bg-muted/30 rounded-r-lg">
                    <div className="text-center p-6">
                      <div className="text-6xl mb-4">🧠</div>
                      <p className="font-medium">Created by ENSNN Faculty</p>
                      <p className="text-xs text-muted-foreground">Updated: November 5, 2023</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Learning Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Study Materials */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Study Materials</CardTitle>
                      <CardDescription>
                        Downloadable resources to help with your studies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {studyMaterials.map(material => (
                          <div key={material.id} className="flex items-center border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              {material.type === 'pdf' && <FileText className="h-5 w-5 text-tech-blue" />}
                              {material.type === 'doc' && <FileText className="h-5 w-5 text-tech-purple" />}
                              {material.type === 'images' && <Image className="h-5 w-5 text-tech-green" />}
                            </div>
                            
                            <div className="ml-3 flex-grow">
                              <h4 className="font-medium">{material.title}</h4>
                              <p className="text-xs text-muted-foreground">{material.description}</p>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <span className="mr-3">{material.uploader}</span>
                                <span className="mr-3">
                                  {material.type === 'images' ? `${material.count} images` : material.size}
                                </span>
                                <span className="flex items-center">
                                  <Download className="h-3 w-3 mr-1" />
                                  {material.downloads}
                                </span>
                              </div>
                            </div>
                            
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* External Resources */}
                  <Card>
                    <CardHeader>
                      <CardTitle>External Resources</CardTitle>
                      <CardDescription>
                        Curated links to valuable external learning materials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">MIT OpenCourseWare - Introduction to Algorithms</h4>
                            <Badge variant="outline">Course</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground my-2">
                            Complete course materials including video lectures, assignments, and exams.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">MIT Computer Science</span>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Stanford CS231n - Convolutional Neural Networks</h4>
                            <Badge variant="outline">Course</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground my-2">
                            Stanford's popular course on deep learning for computer vision applications.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Stanford University</span>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">IBM Quantum Computing Tutorials</h4>
                            <Badge variant="outline">Tutorials</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground my-2">
                            Hands-on tutorials for quantum computing using IBM's quantum platform.
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">IBM Research</span>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Visit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {/* Subject Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Subject Categories</CardTitle>
                      <CardDescription>
                        Browse materials by subject
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {["Artificial Intelligence", "Blockchain", "Cybersecurity", "Data Structures & Algorithms", "Neural Networks", "Quantum Computing", "Software Engineering", "Web Development"].map(subject => (
                          <Button key={subject} variant="outline" className="w-full justify-start text-left" size="sm">
                            {subject}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Upload Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Share Your Knowledge</CardTitle>
                      <CardDescription>
                        Contribute study materials to help others
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Have useful notes, guides, or resources? Share them with the TechSphere community.
                      </p>
                      <Button className="w-full">
                        Upload Materials
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="workshops" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Workshops Calendar */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Upcoming Workshops & Webinars</CardTitle>
                      <CardDescription>
                        Interactive learning events hosted by experts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {upcomingWorkshops.map(workshop => (
                          <div key={workshop.id} className="border rounded-lg overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-4">
                              <div className="md:col-span-1 bg-muted p-4 flex flex-col justify-center items-center text-center">
                                <div className="text-xl font-bold">
                                  {workshop.date.split(',')[0].split(' ')[1]}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {workshop.date.split(',')[0].split(' ')[0]}
                                </div>
                                <div className="mt-2 text-xs">
                                  {workshop.time}
                                </div>
                              </div>
                              <div className="md:col-span-3 p-4">
                                <h3 className="font-bold text-lg">{workshop.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{workshop.description}</p>
                                <div className="flex flex-wrap items-center text-xs text-muted-foreground mb-3">
                                  <span className="flex items-center mr-4">
                                    <Users className="h-3 w-3 mr-1" />
                                    Instructor: {workshop.instructor}
                                  </span>
                                  <span className="flex items-center mr-4">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Location: {workshop.location}
                                  </span>
                                  <span className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {workshop.registered}/{workshop.capacity} registered
                                  </span>
                                </div>
                                <Button>Register Now</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Past Workshops */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Past Workshops & Recordings</CardTitle>
                      <CardDescription>
                        Catch up on workshops you might have missed
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Quantum Computing for Beginners</h3>
                            <Badge variant="outline">Workshop Recording</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Introduction to quantum computing concepts and practical implementations.
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <span className="mr-4">Dr. Richard Tanaka</span>
                            <span className="mr-4">Oct 10, 2023</span>
                            <span>1h 45min</span>
                          </div>
                          <Button variant="outline">
                            <Video className="h-4 w-4 mr-1" />
                            Watch Recording
                          </Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Advanced Neural Network Architectures</h3>
                            <Badge variant="outline">Workshop Recording</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Deep dive into cutting-edge neural network designs and applications.
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mb-3">
                            <span className="mr-4">Dr. Sarah Johnson</span>
                            <span className="mr-4">Oct 5, 2023</span>
                            <span>2h 10min</span>
                          </div>
                          <Button variant="outline">
                            <Video className="h-4 w-4 mr-1" />
                            Watch Recording
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {/* Host a Workshop */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Host a Workshop</CardTitle>
                      <CardDescription>
                        Share your expertise with the community
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Are you knowledgeable in a technical area? Host a workshop or webinar to teach others and earn XP!
                      </p>
                      <Button className="w-full">
                        Propose a Workshop
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Workshop Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Workshop Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {["Hands-on Labs", "Technical Deep Dives", "Career Development", "Project Kickstarters", "Tool Tutorials", "Research Presentations"].map(category => (
                          <Button key={category} variant="outline" className="w-full justify-start text-left" size="sm">
                            {category}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Workshop Benefits */}
                  <Card className="bg-muted/30">
                    <CardHeader>
                      <CardTitle>Benefits of Attending</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">✓</div>
                          <span>Learn practical skills directly from experts</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">✓</div>
                          <span>Network with like-minded students and faculty</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">✓</div>
                          <span>Earn XP for workshop participation</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">✓</div>
                          <span>Get hands-on experience with new technologies</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">✓</div>
                          <span>Receive certification for your portfolio</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Community Knowledge Sharing</CardTitle>
                  <CardDescription>Coming Soon</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">Community Knowledge Base Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We're building a collaborative knowledge base where the TechSphere community can share insights, answer questions, and learn together.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Get Notified When Launched</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ResourceCard = ({ resource }) => {
  // Helper function to get icon based on resource type
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'course':
        return <BookOpen className="h-5 w-5" />;
      case 'ebook':
        return <FileText className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <Card className="tech-hover-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className={`
              ${resource.type === 'article' ? 'border-tech-blue text-tech-blue' : 
                resource.type === 'video' ? 'border-tech-red text-tech-red' : 
                resource.type === 'course' ? 'border-tech-purple text-tech-purple' : 
                resource.type === 'ebook' ? 'border-tech-green text-tech-green' : ''}
            `}
          >
            <div className="flex items-center">
              {getResourceTypeIcon(resource.type)}
              <span className="ml-1 capitalize">{resource.type}</span>
            </div>
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm">{resource.rating}</span>
          </div>
        </div>
        <CardTitle className="mt-2 text-lg">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center mb-3">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${resource.author}`} />
            <AvatarFallback>{resource.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{resource.author}</p>
            <p className="text-xs text-muted-foreground">{resource.school}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground">
          {resource.type === 'video' ? (
            <span className="flex items-center mr-3">
              <Clock className="h-3 w-3 mr-1" />
              {resource.duration}
            </span>
          ) : resource.type === 'course' ? (
            <span className="flex items-center mr-3">
              <BookOpen className="h-3 w-3 mr-1" />
              {resource.modules} modules
            </span>
          ) : resource.type === 'ebook' ? (
            <span className="flex items-center mr-3">
              <FileText className="h-3 w-3 mr-1" />
              {resource.pages} pages
            </span>
          ) : null}
          
          <span className="flex items-center mr-3">
            {resource.type === 'course' ? (
              <>
                <Users className="h-3 w-3 mr-1" />
                {resource.students} students
              </>
            ) : resource.type === 'ebook' ? (
              <>
                <Download className="h-3 w-3 mr-1" />
                {resource.downloads} downloads
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                {resource.views} views
              </>
            )}
          </span>
          
          <span>{resource.date}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full">
          {resource.type === 'course' ? 'Enroll' : 
           resource.type === 'video' ? 'Watch' :
           resource.type === 'ebook' ? 'Download' : 'Read'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Eye = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};

const Image = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );
};

export default Resources;
