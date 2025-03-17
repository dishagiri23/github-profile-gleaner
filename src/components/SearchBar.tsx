
import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  isLoading = false,
  className 
}) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative w-full max-w-md transition-all duration-300",
        className
      )}
    >
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className={cn(
            "w-full h-14 px-5 pl-12 pr-16",
            "bg-white/80 dark:bg-black/30 backdrop-blur-lg",
            "border border-border/50 rounded-full",
            "text-foreground placeholder:text-gray-600",
            "transition-all duration-300 ease-spring",
            "focus:border-primary/50 focus:ring-primary/20 focus:ring-offset-0",
            "hover:shadow-md hover:border-primary/30",
            isLoading && "opacity-80"
          )}
          disabled={isLoading}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        
        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "rounded-full h-8 px-3",
            "bg-primary text-primary-foreground",
            "transition-all duration-300 ease-spring",
            "font-medium text-sm",
            "hover:bg-primary/90 active:scale-95",
            "disabled:opacity-50 disabled:pointer-events-none",
            "focus:outline-none focus:ring-2 focus:ring-primary/30"
          )}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
