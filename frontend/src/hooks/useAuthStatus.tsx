import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkLoginStatus();
  }, []);
  return { isLoggedIn };
}

export default useAuthStatus;
