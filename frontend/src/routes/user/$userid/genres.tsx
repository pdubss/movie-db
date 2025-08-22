import useAuthStatus from "@/hooks/useAuthStatus";
import { fetchMovieGenres, fetchShowGenres } from "@/queries/queries";
import { queryClient } from "@/queryClient";
import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/user/$userid/genres")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      userMovieGenres: await queryClient.ensureQueryData({
        queryKey: ["userMovieGenres", params.userid],
        queryFn: () => fetchUserMovieGenres(params.userid),
      }),
      userShowGenres: await queryClient.ensureQueryData({
        queryKey: ["userShowGenres", params.userid],
        queryFn: () => fetchUserShowGenres(params.userid),
      }),
    };
  },
});

type FormData = {
  showGenres: string[];
  movieGenres: string[];
};
type MovieGenreId =
  | "28"
  | "12"
  | "16"
  | "35"
  | "80"
  | "99"
  | "18"
  | "10751"
  | "14"
  | "36"
  | "27"
  | "10402"
  | "9648"
  | "10749"
  | "878"
  | "10770"
  | "53"
  | "10752"
  | "37";

type ShowGenreId =
  | "10759"
  | "16"
  | "35"
  | "80"
  | "99"
  | "18"
  | "10751"
  | "10762"
  | "9648"
  | "10763"
  | "10764"
  | "10765"
  | "10766"
  | "10767"
  | "10768"
  | "37";

const fetchUserMovieGenres = async (userId: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("movie_genres")
    .eq("user_id", userId)
    .single();

  return data;
};

const fetchUserShowGenres = async (userId: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("show_genres")
    .eq("user_id", userId)
    .single();

  return data;
};

function RouteComponent() {
  const { userMovieGenres, userShowGenres } = Route.useLoaderData();
  const [savedMovieGenres, setSavedMovieGenres] = useState<MovieGenreId[]>([]);
  const [savedShowGenres, setSavedShowGenres] = useState<ShowGenreId[]>([]);

  const { user } = useAuthStatus();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      showGenres: [],
      movieGenres: [],
    },
  });

  useEffect(() => {
    setSavedMovieGenres(
      userMovieGenres?.movie_genres ? userMovieGenres.movie_genres : [],
    );
    setSavedShowGenres(
      userShowGenres?.show_genres ? userShowGenres.show_genres : [],
    );
  }, [userMovieGenres, userShowGenres]);

  console.log(savedMovieGenres, savedShowGenres);

  const onSubmit = (data: FormData) => {
    console.log("Selected Movie Genres", data.movieGenres);
    console.log("Selected Show Genres", data.showGenres);
  };

  const { data: showGenres, error: showError } = useQuery({
    queryKey: ["showGenres"],
    queryFn: () => fetchShowGenres(),
  });

  const { data: movieGenres, error: movieError } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: () => fetchMovieGenres(),
  });

  if (!user)
    return <p className="text-center">Must be logged in to view this page</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
      <h1 className="text-center text-3xl font-bold">Favorite Genres</h1>
      <div className="flex justify-center gap-16">
        <div>
          <h2 className="text-xl font-semibold">Shows</h2>
          <ul className="flex flex-col">
            {showGenres && showGenres.genres.length > 0
              ? showGenres.genres.map((showGenre) => (
                  <li className="flex gap-2" key={showGenre.id}>
                    <input
                      type="checkbox"
                      value={showGenre.id}
                      id={showGenre.id.toString()}
                      {...register("showGenres")}
                    />
                    <label htmlFor={showGenre.id.toString()}>
                      {showGenre.name}
                    </label>
                  </li>
                ))
              : null}
            {showError && <p className="text-red-500">{showError.message}</p>}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Movies</h2>
          <ul>
            {movieGenres && userMovieGenres && movieGenres.genres.length > 0
              ? movieGenres.genres.map((movieGenre) => (
                  <li className="flex gap-2" key={movieGenre.id}>
                    <input
                      checked={savedMovieGenres.includes(
                        movieGenre.id.toString() as MovieGenreId,
                      )}
                      type="checkbox"
                      value={movieGenre.id}
                      id={movieGenre.id.toString()}
                      {...register("movieGenres")}
                      onChange={() => {
                        setSavedMovieGenres((prev) =>
                          prev.includes(
                            movieGenre.id.toString() as MovieGenreId,
                          )
                            ? prev.filter((x) => x !== movieGenre.id.toString())
                            : [
                                ...prev,
                                movieGenre.id.toString() as MovieGenreId,
                              ],
                        );
                      }}
                    />
                    <label htmlFor={movieGenre.id.toString()}>
                      {movieGenre.name}
                    </label>
                  </li>
                ))
              : null}
            {movieError && <p className="text-red-500">{movieError.message}</p>}
          </ul>
        </div>
      </div>
      <button className="cursor-pointer font-semibold" type="submit">
        Submit
      </button>
    </form>
  );
}
