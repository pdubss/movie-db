import Spinner from "@/components/ui/Spinner";
import { getMoviesByGenre } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/genre/$genreId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { genreId } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["movies", genreId],
    queryFn: () => getMoviesByGenre(genreId),
  });
  console.log(data);
  return (
    <div className="flex flex-col items-center gap-2 text-white">
      <h2 className="text-2xl">{data?.genre?.name} Movies</h2>
      {isLoading && data ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-6">
          {" "}
          {data?.movies.results.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
