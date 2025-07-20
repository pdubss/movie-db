import { getShowById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shows/$showId/videos")({
  component: RouteComponent,
});

function RouteComponent() {
  const { showId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["showDetails", showId],
    queryFn: () => getShowById(showId),
  });

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <h1 className="text-2xl">
        Showing Videos for{" "}
        <Link className="underline" to="/shows/$showId" params={{ showId }}>
          {data?.details.name}
        </Link>{" "}
      </h1>
      {data?.details.videos.results.length ? (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 xl:grid-rows-4">
          {data.details.videos.results.map((vid) => (
            <li>
              <iframe src={`https://www.youtube.com/embed/${vid.key}`} />
            </li>
          ))}
        </ul>
      ) : (
        <span>Show has no videos!</span>
      )}
    </div>
  );
}
