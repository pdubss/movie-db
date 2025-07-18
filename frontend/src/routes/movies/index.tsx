import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import { getMoviesByGenre } from "@/queries/queries";
import { useQueries } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

function RouteComponent() {
  const genres = [28, 16, 35, 80, 99, 18, 27, 10749, 878, 37];
  const moviesByGenreQueries = useQueries({
    queries: genres.map((genre) => ({
      queryKey: ["movies", genre],
      queryFn: () => getMoviesByGenre(genre.toString(), 1),
    })),
  });

  if (moviesByGenreQueries) {
    console.log(moviesByGenreQueries);
  }
  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="text-center text-3xl font-bold">Movies</h1>
      {moviesByGenreQueries.map((query, i) => (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold">
              {query.data?.genre?.name}
            </h2>
            <Link
              to="/movies/genre/$genreId"
              params={{ genreId: genres[i].toString() }}
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
                    <span>{movie.title}</span>
                    <span>{movie.release_date.split("-")[0]}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
