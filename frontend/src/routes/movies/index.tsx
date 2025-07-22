import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import { fetchMovieGenres, getMoviesByGenre } from "@/queries/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: () => fetchMovieGenres(),
  });

  if (data) console.log(data);

  const moviesByGenreQueries = useQueries({
    queries: (data?.genres ?? []).map((genre) => ({
      queryKey: ["movies", genre],
      queryFn: () => getMoviesByGenre(genre.id.toString(), 1),
      enabled: !!data?.genres,
    })),
  });

  if (moviesByGenreQueries) {
    console.log(moviesByGenreQueries);
  }
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
                className="rounded-md bg-green-500 px-2 py-1 text-black"
              >
                MORE +
              </Link>
            </div>
            <ul className="grid grid-cols-8 gap-4">
              {query.data?.movies.results.slice(0, 8).map((movie) => (
                <li className="transform cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-110">
                  <Link
                    className="flex flex-col gap-2"
                    to="/movies/$movieId"
                    params={{ movieId: movie.id.toString() }}
                  >
                    <img
                      className="rounded-md"
                      src={`${IMAGE_BASE_URL}w185${movie.poster_path}`}
                    />
                    <div className="flex justify-around">
                      <span className="font-semibold">{movie.title}</span>
                      <span>{movie.release_date.split("-")[0]}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
