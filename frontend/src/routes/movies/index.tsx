import MovieDesktopRow from "@/components/ui/MovieDesktopRow";
import MovieMobileRow from "@/components/ui/MovieMobileRow";
import Spinner from "@/components/ui/Spinner";
import useMediaQuery from "@/hooks/useMediaQuery";
import { fetchMovieGenres, getMoviesByGenre } from "@/queries/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { data } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: () => fetchMovieGenres(),
  });

  const moviesByGenreQueries = useQueries({
    queries: (data?.genres ?? []).map((genre) => ({
      queryKey: ["movies", genre],
      queryFn: () => getMoviesByGenre(genre.id.toString(), 1),
      enabled: !!data?.genres,
    })),
  });

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="text-center text-3xl font-bold">Movies</h1>
      {data?.genres ? (
        moviesByGenreQueries.map((query, i) => (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">{data.genres[i].name}</h2>
              <Link
                to="/movies/genre/$genreId"
                params={{ genreId: data?.genres[i].id.toString() }}
                className="h-8 rounded-md bg-green-500 px-2 py-1 font-semibold text-black hover:bg-green-400"
              >
                MORE
              </Link>
            </div>
            {!isMobile ? (
              <MovieDesktopRow query={query} />
            ) : (
              <MovieMobileRow query={query} />
            )}
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
