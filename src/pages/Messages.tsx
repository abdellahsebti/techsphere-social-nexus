import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Send, PlusCircle, Image, Paperclip, Smile, Mic, MoreHorizontal, Check, Phone, Video, Filter, SortAsc, SortDesc, ChevronRight, User, Settings, Bell, Lock, Mail, Globe, MapPin, Briefcase, GraduationCap, UserPlus, Link as LinkIcon, Github, Twitter, Linkedin, Sparkles, FileCode, Lightbulb, Trophy, Zap, Edit2, Camera, Heart, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Sample conversations and messages
const conversations = [
  {
    id: "c1",
    user: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5",
      school: "ENSNN",
      isOnline: true
    },
    lastMessage: {
      text: "Can you help me with the neural network architecture for my project?",
      time: "5 min ago",
      isRead: false,
      isFromMe: false
    },
    unreadCount: 2
  },
  {
    id: "c2",
    user: {
      id: "u3",
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3",
      school: "ENSCS",
      isOnline: true
    },
    lastMessage: {
      text: "Thanks for your feedback on my blockchain implementation!",
      time: "Yesterday",
      isRead: true,
      isFromMe: true
    },
    unreadCount: 0
  },
  {
    id: "c3",
    user: {
      id: "u4",
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=10",
      school: "ENSIA",
      isOnline: false
    },
    lastMessage: {
      text: "Let's meet tomorrow to discuss the research proposal.",
      time: "2 days ago",
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0
  },
  {
    id: "c4",
    user: {
      id: "u5",
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=7",
      school: "ENSTSA",
      isOnline: false
    },
    lastMessage: {
      text: "I've shared the AR prototype with you. Let me know what you think!",
      time: "3 days ago",
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0
  },
  {
    id: "c5",
    user: {
      id: "g1",
      name: "Quantum Computing Group",
      avatar: "",
      participants: ["Sarah Johnson", "Michael Zhang", "You", "+2 others"],
      isGroup: true
    },
    lastMessage: {
      text: "Michael: I've found a paper on quantum error correction that might help.",
      time: "1 day ago",
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0
  },
  {
    id: "c6",
    user: {
      id: "u7",
      name: "Aisha Patel",
      avatar: "https://i.pravatar.cc/150?img=23",
      school: "ENSNN",
      isOnline: false
    },
    lastMessage: {
      text: "What do you think about collaborating on the AI ethics project?",
      time: "1 week ago",
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0
  }
];

const activeConversationMessages = [
  {
    id: "m1",
    sender: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    text: "Hey there! I'm working on a neural network for emotion detection from facial expressions, but I'm having trouble with the model accuracy.",
    time: "Yesterday, 3:45 PM",
    isFromMe: false
  },
  {
    id: "m2",
    sender: {
      id: "me",
      name: "Me",
      avatar: "https://github.com/shadcn.png"
    },
    text: "Hi Sarah! What architecture are you using? CNNs usually work well for facial expression recognition.",
    time: "Yesterday, 3:50 PM",
    isFromMe: true
  },
  {
    id: "m3",
    sender: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    text: "I'm using a CNN with 3 convolutional layers followed by max pooling, but I'm only getting around 70% accuracy. Do you think I need more layers or a different architecture?",
    time: "Yesterday, 4:02 PM",
    isFromMe: false
  },
  {
    id: "m4",
    sender: {
      id: "me",
      name: "Me",
      avatar: "https://github.com/shadcn.png"
    },
    text: "70% isn't too bad for emotion detection, but you could try a few things:\n\n1. Add batch normalization after each convolutional layer\n2. Try a pre-trained model like VGG or ResNet and fine-tune it\n3. Data augmentation (rotation, flipping, brightness adjustments)\n\nDo you have enough training data?",
    time: "Yesterday, 4:15 PM",
    isFromMe: true
  },
  {
    id: "m5",
    sender: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    text: "I'm using the FER2013 dataset which has about 35K images. I haven't tried batch normalization yet, so I'll add that. Do you have any experience with transfer learning for this task?",
    time: "Yesterday, 4:30 PM",
    isFromMe: false
  },
  {
    id: "m6",
    sender: {
      id: "me",
      name: "Me",
      avatar: "https://github.com/shadcn.png"
    },
    text: "Yes, I've had good results using a pre-trained VGG16 with the top layers replaced for emotion classification. It reached about 85% accuracy after fine-tuning. I can share some code examples if that would help.",
    time: "Yesterday, 4:45 PM",
    isFromMe: true
  },
  {
    id: "m7",
    sender: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    text: "That would be incredible! Thank you so much for offering. Can you help me with the neural network architecture for my project?",
    time: "Today, 9:23 AM",
    isFromMe: false
  },
  {
    id: "m8",
    sender: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    text: "I've been stuck on this for a while and would really appreciate your expertise.",
    time: "Today, 9:24 AM",
    isFromMe: false
  }
];

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const handleSendMessage = () => {
    if (messageText.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container h-[calc(100vh-4rem)]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
            {/* Conversations List */}
            <div className="md:col-span-1 h-full border-r border-border/10">
              <div className="h-full flex flex-col">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg text-foreground">Messages</h2>
                    <Button variant="ghost" size="sm" className="hover:bg-accent">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-9 bg-accent/50 border-0 focus-visible:ring-1 focus-visible:ring-accent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        activeConversation.id === conversation.id
                          ? "bg-accent/50"
                          : "hover:bg-accent/20"
                      }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.user.avatar} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.user.isOnline && (
                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#0B0F19]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">{conversation.user.name}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.lastMessage.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage.isFromMe && "You: "}
                              {conversation.lastMessage.text}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary/80 px-1.5 h-5">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 lg:col-span-3 h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activeConversation.user.avatar} />
                      <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm">{activeConversation.user.name}</h3>
                      <p className="text-xs text-muted-foreground">{activeConversation.user.school}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="hover:bg-accent w-8 h-8 p-0">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-accent w-8 h-8 p-0">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-accent w-8 h-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${message.isFromMe ? "flex-row-reverse" : "flex-row"}`}>
                      {!message.isFromMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div 
                        className={`rounded-2xl px-4 py-2.5 ${
                          message.isFromMe
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                        <span className="text-[11px] opacity-70 mt-1 block">
                          {message.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border/10">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-accent w-8 h-8 p-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      className="pr-24 bg-accent/50 border-0 focus-visible:ring-1 focus-visible:ring-accent"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="hover:bg-accent w-7 h-7 p-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-accent w-7 h-7 p-0">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-accent w-7 h-7 p-0">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 w-7 h-7 p-0"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
