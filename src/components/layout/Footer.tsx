import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Globe,
  Heart,
  ArrowRight
} from "lucide-react";

const FooterLink = ({ to, children }) => {
  return (
    <Link 
      to={to}
      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
    >
      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </Link>
  );
};

const FooterSection = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const { darkMode } = useAppContext();

  return (
    <footer className={`border-t ${
      darkMode 
        ? "border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950"
        : "border-border bg-gradient-to-b from-background to-background/95"
    }`}>
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <FooterSection title="TechSphere">
            <p className="text-muted-foreground">
              Empowering students to build the future through technology, collaboration, and innovation.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/projects">Projects</FooterLink>
            <FooterLink to="/challenges">Challenges</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/leaderboard">Leaderboard</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
          </FooterSection>

          {/* Resources */}
          <FooterSection title="Resources">
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/roadmap">Roadmap</FooterLink>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Contact">
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p>support@techsphere.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p>+213541174197</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p>123 Tech Street, Innovation City</p>
                </div>
              </div>
            </div>
          </FooterSection>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${
          darkMode ? "border-slate-800" : "border-border"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 TechSphere. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
