import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Lock,
  Eye,
  Database,
  Key,
  Mail,
  Bell,
  Cookie,
  Globe,
  Settings
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const PrivacySection = ({ title, icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Privacy = () => {
  const { darkMode } = useAppContext();

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode 
        ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950"
        : "bg-gradient-to-b from-background via-background/95 to-background"
    }`}>
      <main className="flex-grow py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container px-4 md:px-6"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Learn about how we protect and handle your data.
            </motion.p>
          </motion.div>

          {/* Privacy Sections */}
          <div className="max-w-3xl mx-auto">
            <PrivacySection
              title="Data Collection"
              icon={<Database className="h-6 w-6" />}
            >
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email, school)</li>
                <li>Profile information and preferences</li>
                <li>Project and challenge submissions</li>
                <li>Communication preferences</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              title="Data Protection"
              icon={<Shield className="h-6 w-6" />}
            >
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Secure data storage and transmission</li>
                <li>Access controls and authentication</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              title="Data Usage"
              icon={<Eye className="h-6 w-6" />}
            >
              <p>
                Your data is used to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Communicate with you about updates</li>
                <li>Analyze and optimize platform performance</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              title="Data Sharing"
              icon={<Globe className="h-6 w-6" />}
            >
              <p>
                We may share your data with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist our operations</li>
                <li>Educational institutions for verification</li>
                <li>Challenge sponsors (with your consent)</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              title="Your Rights"
              icon={<Settings className="h-6 w-6" />}
            >
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </PrivacySection>

            <PrivacySection
              title="Cookies"
              icon={<Cookie className="h-6 w-6" />}
            >
              <p>
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences</li>
                <li>Analyze site usage</li>
                <li>Improve user experience</li>
                <li>Maintain session information</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings in your browser preferences.
              </p>
            </PrivacySection>

            <PrivacySection
              title="Contact Us"
              icon={<Mail className="h-6 w-6" />}
            >
              <p>
                For privacy-related questions or concerns, please contact us at:
              </p>
              <p className="mt-2">
                Email: privacy@techsphere.com
              </p>
            </PrivacySection>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Privacy; 