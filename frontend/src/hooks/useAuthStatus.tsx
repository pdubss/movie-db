import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

// interface Profile {
//   avatar_url: string | null;
//   user_id: string;
//   name: string | null;
//   created_at: string;
//   watchlist_movies: number[] | null;
//   watchlist_shows: number[] | null;
// }

const fetchProfile = async (userId: string) => {
  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return profileData;
};

function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    checkLoginStatus();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === "SIGNED_IN" && session?.user) {
          checkLoginStatus();
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfile(user!.id),
    enabled: !!user,
  });

  return { user, isLoading, profile, checkLoginStatus };
}

export default useAuthStatus;
