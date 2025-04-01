import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2
} from "lucide-react";

const ContactCard = ({ icon: Icon, title, content, link }) => {
  const { darkMode } = useAppContext();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-lg ${
        darkMode 
          ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 hover:from-tech-blue/10 hover:to-tech-purple/10"
          : "bg-gradient-to-r from-background to-background/80 hover:from-tech-blue/5 hover:to-tech-purple/5"
      } transition-all duration-300`}
    >
      <div className="p-6">
        <div className={`p-3 rounded-full w-fit mb-4 ${
          darkMode ? "bg-slate-800" : "bg-muted"
        }`}>
          <Icon className="h-6 w-6 text-tech-blue" />
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        {link ? (
          <a 
            href={link} 
            className="text-sm text-muted-foreground hover:text-tech-blue transition-colors"
          >
            {content}
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">{content}</p>
        )}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const { darkMode } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <main className="flex-grow py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground">
              Have questions or want to learn more? We're here to help. Reach out to us through any of the following channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ContactCard
              icon={Mail}
              title="Email"
              content="support@techsphere.com"
              link="mailto:support@techsphere.com"
            />
            <ContactCard
              icon={Phone}
              title="Phone"
              content="+1 (555) 123-4567"
              link="tel:+15551234567"
            />
            <ContactCard
              icon={MapPin}
              title="Location"
              content="San Francisco, CA"
            />
            <ContactCard
              icon={Clock}
              title="Hours"
              content="Mon-Fri: 9am-6pm PST"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`${
                darkMode 
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-background/50"
              }`}>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        required
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full gap-2"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`${
                darkMode 
                  ? "bg-slate-800/50 border-slate-700"
                  : "bg-background/50"
              }`}>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">How do I get started?</h3>
                      <p className="text-sm text-muted-foreground">
                        Simply create an account, complete your profile, and start exploring projects and challenges.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                      <p className="text-sm text-muted-foreground">
                        We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">How can I report an issue?</h3>
                      <p className="text-sm text-muted-foreground">
                        You can report issues through our support portal or by emailing support@techsphere.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact; 