import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { User } from "@supabase/supabase-js";
function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data.session.user);
      } else setUser(null);

      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);
  return { isLoggedIn: !!user, user, isLoading };
}

export default useAuthStatus;
