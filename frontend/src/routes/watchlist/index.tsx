import WatchlistItem from "@/components/ui/WatchlistItem";
import useAuthStatus from "@/hooks/useAuthStatus";
import { getMovieById, getShowById } from "@/queries/queries";
import { useQueries } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/watchlist/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, profile } = useAuthStatus();

  const movieDetailQueries = useQueries({
    queries: (profile?.watchlist_movies ?? []).map((movieId) => ({
      queryKey: ["movieDetails", movieId],
      queryFn: () => getMovieById(movieId.toString()),
      enabled: !!profile,
    })),
  });

  const showDetailQueries = useQueries({
    queries: (profile?.watchlist_shows ?? []).map((showId) => ({
      queryKey: ["showDetails", showId],
      queryFn: () => getShowById(showId.toString()),
      enabled: !!profile,
    })),
  });

  if (!user)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span>
          Please{" "}
          <Link className="text-blue-500 hover:text-blue-300" to="/login">
            Log In
          </Link>{" "}
          to access this page
        </span>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 py-4">
      <h1 className="text-4xl font-bold">Watchlist</h1>
      <ul className="flex w-full flex-col gap-4">
        <h2 className="text-2xl font-semibold">Films</h2>
        <div className="flex flex-wrap">
          {profile?.watchlist_movies && profile.watchlist_movies.length > 0 ? (
            movieDetailQueries.map((movie) =>
              movie.data ? (
                <WatchlistItem
                  key={movie.data.movie.id}
                  id={movie.data?.movie.id.toString()}
                  title={movie.data?.movie.title}
                  year={movie.data.movie.release_date}
                  overview={movie.data.movie.overview}
                  poster_path={movie.data.movie.poster_path}
                  type="movie"
                  runtime={movie.data.movie.runtime}
                  vote_average={movie.data.movie.vote_average}
                  vote_count={movie.data.movie.vote_count}
                  director={movie.data.director}
                  stars={movie.data.credits.cast}
                  user_id={user.id}
                />
              ) : null,
            )
          ) : (
            <span className="text-2xl">No Films on Watchlist!</span>
          )}
        </div>
      </ul>
      <ul className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">TV Shows</h2>
        {profile?.watchlist_shows && profile.watchlist_shows.length > 0 ? (
          showDetailQueries.map((show) =>
            show.data ? (
              <WatchlistItem
                key={show.data.details.id}
                title={show.data.details.name}
                id={show.data.details.id.toString()}
                year={show.data.details.first_air_date}
                overview={show.data.details.overview}
                poster_path={show.data.details.poster_path}
                type="show"
                vote_average={show.data.details.vote_average}
                vote_count={show.data.details.vote_count}
                stars={show.data.details.aggregate_credits.cast}
                creator={show.data.details.created_by}
                user_id={user.id}
              />
            ) : null,
          )
        ) : (
          <span className="text-2xl">No Shows on Watchlist!</span>
        )}
      </ul>
    </div>
  );
}
