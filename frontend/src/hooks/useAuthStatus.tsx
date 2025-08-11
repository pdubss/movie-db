import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { User } from "@supabase/supabase-js";

interface Profile {
  user_id: string;
  name: string;
}

function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        setUser(data?.session?.user ?? null);

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", data.session?.user.id)
          .single();

        setProfile(profileData);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    checkLoginStatus();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        console.log(session);
        console.log(event, "event");
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  return { user, isLoading, profile };
}

export default useAuthStatus;
