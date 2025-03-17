
import React, { useState } from "react";
import { Github } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "@/components/AnimatedPage";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { useGitHubProfile } from "@/hooks/useGitHubProfile";

const Index: React.FC = () => {
  const { toast } = useToast();
  const { profile, isLoading, isError, error, searchProfile } = useGitHubProfile();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (username: string) => {
    searchProfile(username);
    setHasSearched(true);
    
    if (isError) {
      toast({
        title: "Error",
        description: error?.message || "Failed to fetch GitHub profile",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatedPage className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="container-transition w-full max-w-5xl mx-auto">
        <header className="flex flex-col items-center justify-center text-center mb-12">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
            <Github className="w-6 h-6" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              GitHub Profile Viewer
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-balance">
              Enter a GitHub username to view their profile details, stats, and more.
            </p>
          </motion.div>
          
          <motion.div
            className="w-full max-w-lg mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SearchBar 
              onSearch={handleSearch} 
              isLoading={isLoading} 
              className={hasSearched && profile ? "max-w-sm mx-auto" : ""}
            />
          </motion.div>
        </header>
        
        <main className="w-full">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center p-8"
              >
                <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Fetching profile data...</p>
              </motion.div>
            ) : isError && hasSearched ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="glass-card subtle-shadow rounded-2xl p-8 text-center max-w-md mx-auto"
              >
                <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">!</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
                <p className="text-muted-foreground">
                  {error?.message || "Could not find the GitHub profile you're looking for."}
                </p>
              </motion.div>
            ) : profile ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProfileCard profile={profile} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Built with precision and care. Search for any GitHub profile.</p>
        </footer>
      </div>
    </AnimatedPage>
  );
};

export default Index;
