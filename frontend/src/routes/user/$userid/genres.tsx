import { fetchMovieGenres, fetchShowGenres } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/user/$userid/genres")({
  component: RouteComponent,
});

type FormData = {
  showGenres: string[];
  movieGenres: string[];
};

function RouteComponent() {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      showGenres: [],
      movieGenres: [],
    },
  });

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
            {movieGenres && movieGenres.genres.length > 0
              ? movieGenres.genres.map((movieGenre) => (
                  <li className="flex gap-2" key={movieGenre.id}>
                    <input
                      type="checkbox"
                      value={movieGenre.id}
                      id={movieGenre.id.toString()}
                      {...register("movieGenres")}
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
