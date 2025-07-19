import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import { getShowById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shows/$showId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { showId } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["showDetails", showId],
    queryFn: () => getShowById(showId),
  });

  console.log(data);

  return (
    <div className="w-full py-5 text-white">
      {!isLoading && data ? (
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <h1 className="text-5xl">{data?.details.name}</h1>{" "}
            <div className="flex gap-2 text-center">
              <div className="flex flex-col gap-1">
                <span>tmDb Rating</span>
                <span>
                  {data.details.vote_average.toString().slice(0, 4)}/10
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span>Your Rating</span>

                <button className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>{" "}
                  Rate
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <span>Popularity</span>
                <span>{data.details.popularity.toString().split(".")[0]}</span>
              </div>
            </div>
          </div>
          <ul className="flex gap-2">
            {data.details.genres.map((genre) => (
              <li className="rounded-xl border border-white px-2 py-0.5 hover:bg-[#282828]">
                <Link
                  to="/shows/genre/$genreId"
                  params={{ genreId: genre.id.toString() }}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <img
              className="h-[26.25em] w-70 rounded-md"
              src={`${IMAGE_BASE_URL}w500${data.details.poster_path}`}
            />{" "}
            <iframe
              title={`${data.details.name} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-[26.25rem] w-[48rem] rounded-md"
              src={`https://www.youtube.com/embed/${data.trailer ? data.trailer?.key : data.details.videos.results[0]}`}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
