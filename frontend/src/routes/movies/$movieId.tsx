import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import { getMovieById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$movieId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data: movie, isLoading } = useQuery({
    queryKey: ["details"],
    queryFn: () => getMovieById(movieId),
  });
  if (movie) {
    console.log(movie);
  }

  return (
    <div className="w-full h-screen text-white">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>{movie?.title}</h2>
          <img src={`${IMAGE_BASE_URL}w500${movie?.poster_path}`} />
        </>
      )}
    </div>
  );
}
