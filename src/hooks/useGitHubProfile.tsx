
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface GitHubProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export const useGitHubProfile = () => {
  const [username, setUsername] = useState<string | null>(null);

  const fetchGitHubProfile = async (username: string): Promise<GitHubProfile> => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? `User '${username}' not found`
          : `Failed to fetch GitHub profile: ${response.statusText}`
      );
    }
    return response.json();
  };

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["githubProfile", username],
    queryFn: () => (username ? fetchGitHubProfile(username) : Promise.reject("No username provided")),
    enabled: !!username,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const searchProfile = (newUsername: string) => {
    setUsername(newUsername);
  };

  return {
    profile,
    isLoading,
    isError,
    error: error as Error,
    searchProfile,
  };
};
