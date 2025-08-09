import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { User } from "@supabase/supabase-js";

function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await supabase.auth.getSession();

      setUser(data?.session?.user ?? null);

      setIsLoading(false);
    };
    checkLoginStatus();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        console.log(event, "event");
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  return { user, isLoading };
}

export default useAuthStatus;
