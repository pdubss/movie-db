import { supabase } from "@/supabaseClient";

async function addToWatchlist(type: string, id: number, userId: string) {
  try {
    if (type === "movie") {
      const { data, error: selectError } = await supabase
        .from("profiles")
        .select("watchlist_movies")
        .eq("user_id", userId)
        .single();

      if (selectError) throw new Error("Error fetching watchlist");

      const isWatchlisted = data.watchlist_movies.includes(id);

      let updatedWatchlist;

      if (isWatchlisted) {
        updatedWatchlist = data.watchlist_movies.filter(
          (movieId) => movieId !== id,
        );
      } else {
        updatedWatchlist = [...data.watchlist_movies, id];
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ watchlist_movies: updatedWatchlist })
        .eq("user_id", userId);

      if (updateError) throw new Error("Error updating watchlist");
    } else if (type === "show") {
      const { data, error: showError } = await supabase
        .from("profiles")
        .select("watchlist_shows")
        .eq("user_id", userId)
        .single();

      if (showError) throw new Error("Error fetching show watchlist");

      const isWatchlisted = data.watchlist_shows?.includes(id);

      let updatedShowList;

      if (isWatchlisted) {
        updatedShowList = data.watchlist_shows?.filter(
          (showId) => showId !== id,
        );
      } else {
        updatedShowList = [...data.watchlist_shows, id];
      }
      const { error: updateShowError } = await supabase
        .from("profiles")
        .update({ watchlist_shows: updatedShowList })
        .eq("user_id", userId);

      if (updateShowError) throw new Error("Error updating show watchlist");
    }
  } catch (error) {
    console.error(error);
  }
}
export default addToWatchlist;
