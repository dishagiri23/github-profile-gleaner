
import React from "react";
import { MapPin, Link as LinkIcon, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import Stats from "./Stats";

interface ProfileCardProps {
  profile: {
    avatar_url: string;
    name: string | null;
    login: string;
    bio: string | null;
    location: string | null;
    html_url: string;
    followers: number;
    following: number;
    public_repos: number;
    blog?: string;
  };
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto",
        "glass-card rounded-3xl subtle-shadow p-8",
        "animate-scale-in",
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <div className="relative flex-shrink-0">
          <img
            src={profile.avatar_url}
            alt={`${profile.login}'s avatar`}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white/20"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full shadow-inner" />
        </div>
        
        <div className="flex flex-col">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {profile.name || profile.login}
            </h1>
            <h2 className="text-lg text-muted-foreground">@{profile.login}</h2>
          </div>
          
          {profile.bio && (
            <p className="mt-3 text-sm text-balance">
              {profile.bio}
            </p>
          )}
          
          <div className="flex flex-wrap mt-4 gap-4 justify-center md:justify-start">
            {profile.location && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.blog && (
              <a
                href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Website</span>
              </a>
            )}
            
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Stats
          followers={profile.followers}
          following={profile.following}
          repos={profile.public_repos}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
