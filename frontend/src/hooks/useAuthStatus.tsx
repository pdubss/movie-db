import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface Profile {
  avatar_url: string | null;
  user_id: string;
  name: string | null;
  created_at: string;
  watchlist_movies: number[] | null;
  watchlist_shows: number[] | null;
}

function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async (id: string) => {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", id)
      .single();

    setProfile(profileData);
  };

  useEffect(() => {
    checkLoginStatus();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session?.user);
          fetchProfile(session?.user.id);
        }
        if (event === "SIGNED_OUT") {
          setProfile(null);
          setUser(null);
        }
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  return { user, isLoading, profile };
}

export default useAuthStatus;
