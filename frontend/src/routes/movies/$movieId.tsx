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
  const { data, isLoading } = useQuery({
    queryKey: ["details"],
    queryFn: () => getMovieById(movieId),
  });
  console.log(data);

  return (
    <div className="w-full h-full flex flex-col gap-2 text-white">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-4xl font-semibold">{data?.movie.title}</h1>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <span>{data?.movie.release_date.split("-")[0]}</span>
              <span>{data?.movie.runtime}m</span>
            </div>
            <div className="flex gap-4">
              <span>your rating</span>
              <span>popularity</span>
            </div>
          </div>
          <div className="flex gap-2">
            <img
              className="h-82 w-56"
              src={`${IMAGE_BASE_URL}w500${data?.movie.poster_path}`}
            />
            {data?.trailerKey && (
              <iframe
                src={`https://www.youtube.com/embed/${data?.trailerKey}`}
                title={`${data?.movie.title} movie trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-[1080px] h-[600px]"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
