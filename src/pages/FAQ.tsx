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
  HelpCircle,
  QuestionMark,
  BookOpen,
  Lightbulb,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Code,
  Shield,
  Trophy
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-lg ${
        darkMode 
          ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50"
          : "bg-gradient-to-r from-background to-background/80"
      }`}
    >
      <Button
        variant="ghost"
        className={`w-full flex justify-between items-center p-6 ${
          isOpen ? "bg-tech-blue/10" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-left font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useAppContext();

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Sparkles className="h-6 w-6" />,
      faqs: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click the 'Sign Up' button in the top right corner. You'll need to provide your email address, create a password, and verify your student status."
        },
        {
          question: "What are the benefits of joining TechSphere?",
          answer: "TechSphere offers access to exclusive projects, networking opportunities with industry professionals, skill development resources, and the chance to showcase your work to potential employers."
        }
      ]
    },
    {
      title: "Projects & Collaboration",
      icon: <Code className="h-6 w-6" />,
      faqs: [
        {
          question: "How can I start a new project?",
          answer: "Click the 'New Project' button on the Projects page. You can then set up your project details, add collaborators, and start building your solution."
        },
        {
          question: "How do I collaborate with other students?",
          answer: "You can invite other students to your project through their email or username. They'll receive a notification and can join your project team."
        }
      ]
    },
    {
      title: "Challenges & Competitions",
      icon: <Trophy className="h-6 w-6" />,
      faqs: [
        {
          question: "How do I participate in challenges?",
          answer: "Browse the Challenges page to find competitions that interest you. Click 'Join Challenge' to participate and follow the provided guidelines."
        },
        {
          question: "What are the prizes for winning challenges?",
          answer: "Prizes vary by challenge and can include XP points, cash rewards, mentorship opportunities, and exclusive access to resources or events."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="h-6 w-6" />,
      faqs: [
        {
          question: "How is my data protected?",
          answer: "We use industry-standard encryption and security measures to protect your data. Your information is never shared with third parties without your consent."
        },
        {
          question: "Can I control my privacy settings?",
          answer: "Yes, you can manage your privacy settings in your account settings. You can control who can see your profile, projects, and activity."
        }
      ]
    }
  ];

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
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-5xl font-bold mb-2 ${
              darkMode
                ? "bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
                : "bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
            }`}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Find answers to common questions about TechSphere and how to make the most of your experience
          </motion.p>
          
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              className={`pl-10 backdrop-blur-sm ${
                darkMode ? "bg-slate-800/50" : "bg-background/50"
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqCategories.map((category, categoryIndex) => (
            <Card 
              key={category.title}
              className={`${
                darkMode 
                  ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50"
                  : "bg-gradient-to-r from-background to-background/80"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    index={categoryIndex * category.faqs.length + faqIndex}
                  />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? Our support team is here to help
          </p>
          <Button className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ; 