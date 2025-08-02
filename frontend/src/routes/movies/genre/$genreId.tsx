import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import useMediaQuery from "@/hooks/useMediaQuery";

import { getMovieById, getMoviesByGenre } from "@/queries/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/movies/genre/$genreId")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { genreId } = Route.useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["movies", genreId, page],
    queryFn: () => getMoviesByGenre(genreId, page),
  });

  console.log(isMobile);

  const movieDetailQueries = useQueries({
    queries: (data?.movies.results ?? []).map((movie) => ({
      queryKey: ["movieDetails", movie.id],
      queryFn: () => getMovieById(movie.id.toString()),
      enabled: !!movie.id,
    })),
  });

  console.log(movieDetailQueries[0], "movie queries");

  function PrevHandler() {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  }

  function NextHandler() {
    setPage((page) => page + 1);
  }

  if (!data && isLoading) return <Spinner />;

  return (
    <div className="w-full text-white">
      {isMobile && data && movieDetailQueries ? (
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-center text-2xl font-semibold">
            {data?.genre?.name} Movies
          </h1>
          <ul className="grid grid-cols-1 place-items-center gap-10">
            {movieDetailQueries.map((query, index) => (
              <li key={index}>
                <Link
                  className="flex flex-col gap-2"
                  to="/movies/$movieId"
                  params={{
                    movieId: query.data?.movie.id
                      ? query.data.movie.id.toString()
                      : "",
                  }}
                >
                  <img
                    className="rounded-lg"
                    src={`${IMAGE_BASE_URL}w500${query.data?.movie.poster_path}`}
                  />
                  <div className="flex flex-col gap-2">
                    {" "}
                    <span className="text-lg font-semibold">
                      {query.data?.movie.title}
                    </span>
                    <div className="flex gap-4">
                      <span>
                        {query.data?.movie.release_date.split("-")[0]}
                      </span>
                      <span>{query.data?.movie.runtime}m</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          <h2 className="text-2xl">{data?.genre?.name} Movies</h2>
          <ul className="grid grid-cols-5 grid-rows-4 gap-5">
            {data &&
              data.movies.results.map((movie, index) => {
                const movieDetail = movieDetailQueries[index];
                const runtime = movieDetail.data?.movie.runtime;

                return (
                  <li
                    className="transform cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-110"
                    key={movie.id}
                  >
                    <Link
                      className="flex flex-col gap-1"
                      to={`/movies/$movieId`}
                      params={{ movieId: movie.id.toString() }}
                    >
                      <img
                        className="rounded-md"
                        src={`${IMAGE_BASE_URL}w342${movie.poster_path}`}
                      />
                      <div className="flex flex-col p-1">
                        <span className="text-lg font-semibold">
                          {movie.title}
                        </span>
                        <div className="flex gap-3">
                          <span>{movie.release_date.split("-")[0]}</span>
                          <span>{runtime}m</span>
                          <div className="flex gap-1">
                            <span>
                              {movie.vote_average.toString().slice(0, 4)}
                            </span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 fill-yellow-300"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      <div className="my-10 flex justify-center gap-4">
        <button
          className={`${page === 1 ? "bg-gray-500" : "bg-yellow-400"} rounded-md px-2 py-1 font-semibold text-black`}
          disabled={page === 1}
          onClick={PrevHandler}
        >
          BACK
        </button>
        <button
          className="rounded-md bg-yellow-400 px-2 py-1 font-semibold text-black"
          onClick={NextHandler}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
