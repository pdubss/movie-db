import Spinner from "@/components/ui/Spinner";
import { getMovieById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$movieId/videos")({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["details", movieId],
    queryFn: () => getMovieById(movieId),
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="text-white">
          <h2 className="my-6 text-center text-2xl">
            Showing videos for{" "}
            <Link
              className="underline"
              to="/movies/$movieId"
              params={{ movieId }}
            >
              {data?.movie.title}
            </Link>
          </h2>
          <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {data &&
              data.videos.length > 0 &&
              data.videos.map((vid, index) => (
                <li key={index} className="mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="mx-auto aspect-[16/9] w-[80%]"
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
