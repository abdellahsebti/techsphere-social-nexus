
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:items-start md:gap-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-gradient-to-r from-tech-blue to-tech-purple text-transparent bg-clip-text">
              TechSphere
            </span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Where innovation meets recognition. Connect, collaborate, and level up.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
          <div>
            <h3 className="mb-2 text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link to="/roadmap" className="text-muted-foreground hover:text-foreground">Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events" className="text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground">Challenges</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mt-6 border-t pt-6">
        <p className="text-center text-xs text-muted-foreground">
          © 2023 TechSphere Social. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
