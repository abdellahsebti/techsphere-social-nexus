
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Search, Send, PlusCircle, Image, Paperclip, Smile, Mic, MoreHorizontal, Check, Phone, Video } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-4 md:py-6">
        <div className="container h-[calc(100vh-13rem)] max-h-[800px]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full gap-4">
            {/* Conversations List */}
            <div className="md:col-span-1 h-full">
              <Card className="h-full flex flex-col">
                <div className="p-3 border-b">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold text-lg">Messages</h2>
                    <Button variant="ghost" size="sm">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <Tabs defaultValue="all" className="flex-grow flex flex-col">
                  <div className="px-2 border-b">
                    <TabsList className="w-full mt-2">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                      <TabsTrigger value="groups" className="flex-1">Groups</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="flex-grow overflow-y-auto p-0">
                    <div className="space-y-1 p-2">
                      {conversations.map(conversation => (
                        <div
                          key={conversation.id}
                          className={`p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${activeConversation.id === conversation.id ? 'bg-muted' : ''}`}
                          onClick={() => setActiveConversation(conversation)}
                        >
                          <div className="flex items-start">
                            <div className="relative">
                              {conversation.user.isGroup ? (
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                  <i className="text-xl">👥</i>
                                </div>
                              ) : (
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={conversation.user.avatar} />
                                  <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              
                              {conversation.user.isOnline && !conversation.user.isGroup && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-tech-green border-2 border-background" />
                              )}
                            </div>
                            
                            <div className="ml-3 flex-grow overflow-hidden">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium text-sm truncate">
                                  {conversation.user.name}
                                </h3>
                                <span className="text-xs text-muted-foreground">
                                  {conversation.lastMessage.time}
                                </span>
                              </div>
                              
                              <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-muted-foreground truncate">
                                  {conversation.lastMessage.isFromMe && "You: "}
                                  {conversation.lastMessage.text}
                                </p>
                                
                                {conversation.unreadCount > 0 && (
                                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="unread" className="flex-grow overflow-y-auto p-0">
                    <div className="space-y-1 p-2">
                      {conversations
                        .filter(c => c.unreadCount > 0)
                        .map(conversation => (
                          <div
                            key={conversation.id}
                            className={`p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${activeConversation.id === conversation.id ? 'bg-muted' : ''}`}
                            onClick={() => setActiveConversation(conversation)}
                          >
                            <div className="flex items-start">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={conversation.user.avatar} />
                                <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              
                              <div className="ml-3 flex-grow overflow-hidden">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium text-sm truncate">
                                    {conversation.user.name}
                                  </h3>
                                  <span className="text-xs text-muted-foreground">
                                    {conversation.lastMessage.time}
                                  </span>
                                </div>
                                
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-muted-foreground truncate">
                                    {conversation.lastMessage.text}
                                  </p>
                                  
                                  <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                    {conversation.unreadCount}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="groups" className="flex-grow overflow-y-auto p-0">
                    <div className="space-y-1 p-2">
                      {conversations
                        .filter(c => c.user.isGroup)
                        .map(conversation => (
                          <div
                            key={conversation.id}
                            className={`p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${activeConversation.id === conversation.id ? 'bg-muted' : ''}`}
                            onClick={() => setActiveConversation(conversation)}
                          >
                            <div className="flex items-start">
                              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                <i className="text-xl">👥</i>
                              </div>
                              
                              <div className="ml-3 flex-grow overflow-hidden">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium text-sm truncate">
                                    {conversation.user.name}
                                  </h3>
                                  <span className="text-xs text-muted-foreground">
                                    {conversation.lastMessage.time}
                                  </span>
                                </div>
                                
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-muted-foreground truncate">
                                    {conversation.lastMessage.text}
                                  </p>
                                  
                                  {conversation.unreadCount > 0 && (
                                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                      {conversation.unreadCount}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
            
            {/* Chat Area */}
            <div className="md:col-span-2 lg:col-span-3 h-full">
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-3 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    {activeConversation.user.isGroup ? (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <i className="text-xl">👥</i>
                      </div>
                    ) : (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activeConversation.user.avatar} />
                        <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="ml-3">
                      <h3 className="font-medium">{activeConversation.user.name}</h3>
                      {activeConversation.user.isGroup ? (
                        <p className="text-xs text-muted-foreground">
                          {activeConversation.user.participants?.join(", ")}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {activeConversation.user.isOnline ? (
                            <span className="text-tech-green">Online</span>
                          ) : (
                            "Offline"
                          )} 
                          {activeConversation.user.school && ` • ${activeConversation.user.school}`}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {activeConversationMessages.map(message => (
                    <div key={message.id} className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex ${message.isFromMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className={`mx-2 max-w-xs sm:max-w-md space-y-1 ${message.isFromMe ? 'items-end' : 'items-start'}`}>
                          <div className={`rounded-lg p-3 ${message.isFromMe ? 'bg-tech-blue text-white' : 'bg-muted'}`}>
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {message.time}
                            {message.isFromMe && (
                              <Check className="h-3 w-3 inline ml-1 text-tech-green" />
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                    <div className="relative flex-grow">
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="pr-20"
                      />
                      <div className="absolute right-2 top-2 flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Image className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      size="icon" 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
