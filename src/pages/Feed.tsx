
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Feed = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold">Feed</h1>
          <p className="mt-4">This page is under construction. Stay tuned for updates!</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feed;
