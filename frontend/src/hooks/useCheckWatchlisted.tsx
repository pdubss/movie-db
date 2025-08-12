import { supabase } from "@/supabaseClient";
import { useEffect } from "react";

function useCheckWatchlisted(
  type: string,
  userId: string | undefined,
  id: string,
  setIsWatchlist: (x: boolean) => void,
) {
  useEffect(() => {
    if (!userId) {
      return;
    }

    const checkIsWatchlisted = async () => {
      try {
        if (type === "movie") {
          const { data, error } = await supabase
            .from("profiles")
            .select(`watchlist_movies`)
            .eq("user_id", userId)
            .single();

          if (error) throw new Error("Error fetching watchlist");

          setIsWatchlist(data?.watchlist_movies.includes(+id));
        } else {
          const { data, error } = await supabase
            .from("profiles")
            .select("watchlist_shows")
            .eq("user_id", userId)
            .single();

          if (error) throw new Error("Error fetching watchlist");

          if (data.watchlist_shows) {
            setIsWatchlist(data.watchlist_shows.includes(+id));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkIsWatchlisted();
  }, [userId, type, id, setIsWatchlist]);
}

export default useCheckWatchlisted;
