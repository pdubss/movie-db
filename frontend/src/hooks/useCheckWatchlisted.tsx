import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

function useCheckWatchlisted(type: string, userId: string, id: string) {
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const checkIsWatchlisted = async () => {
      try {
        if (type === "movie") {
          const { data, error } = await supabase
            .from("profiles")
            .select(`watchlist_movies`)
            .eq("user_id", userId)
            .single();

          if (error) throw new Error("Error fetching watchlist");

          setIsWatchlisted(data?.watchlist_movies.includes(+id));
        } else {
          const { data, error } = await supabase
            .from("profiles")
            .select("watchlist_shows")
            .eq("user_id", userId)
            .single();

          if (error) throw new Error("Error fetching watchlist");

          if (data.watchlist_shows) {
            setIsWatchlisted(data.watchlist_shows.includes(+id));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIsWatchlisted();
  }, [userId, type, id]);

  return isWatchlisted;
}

export default useCheckWatchlisted;
