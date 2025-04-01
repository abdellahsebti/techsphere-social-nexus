import React from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ArrowLeft,
  Search
} from "lucide-react";

const NotFound = () => {
  const { darkMode } = useAppContext();

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <main className="flex-grow flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container px-4 md:px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-9xl font-bold mb-4 ${
              darkMode
                ? "bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
                : "bg-gradient-to-r from-tech-blue via-tech-purple to-tech-red bg-clip-text text-transparent"
            }`}
          >
            404
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Search Site
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
