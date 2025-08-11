import { supabase } from "@/supabaseClient";

async function addToWatchlist(type: string, movieId: number, userId: string) {
  try {
    if (type === "movie") {
      const { data, error: selectError } = await supabase
        .from("profiles")
        .select("watchlist_movies")
        .eq("user_id", userId)
        .single();

      if (selectError) throw new Error("Error fetching watchlist");

      const isWatchlisted = data.watchlist_movies.includes(movieId);

      let updatedWatchlist;

      if (isWatchlisted) {
        updatedWatchlist = data.watchlist_movies.filter((id) => id !== movieId);
      } else {
        updatedWatchlist = [...data.watchlist_movies, movieId];
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ watchlist_movies: updatedWatchlist })
        .eq("user_id", userId);
      if (updateError) throw new Error("Error updating watchlist");
    }
  } catch (error) {
    console.error(error);
  }
}
export default addToWatchlist;
