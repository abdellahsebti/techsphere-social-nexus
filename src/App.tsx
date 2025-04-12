import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Challenges from "./pages/Challenges";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import Leaderboard from "./pages/Leaderboard";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import About from "./pages/About";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <AppProvider>
      <NotificationsProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/events" element={<Events />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<Community />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </NotificationsProvider>
    </AppProvider>
  );
};

export default App;
