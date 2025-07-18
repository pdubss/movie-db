import Spinner from "@/components/ui/Spinner";
import { fetchShowGenres, fetchShowsByGenre } from "@/queries/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shows/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchShowGenres(),
  });

  if (data) console.log(data);

  const showsByGenreQueries = useQueries({
    queries: (data?.genres ?? []).map((genre) => ({
      queryKey: ["shows", genre.id],
      queryFn: () => fetchShowsByGenre(genre.id.toString()),
      enabled: !!data?.genres,
    })),
  });

  if (showsByGenreQueries)
    console.log(showsByGenreQueries[0].data?.shows.data.results);

  return (
    <div className="text-white">
      <h1>TV Shows</h1>
      <ul>
        {showsByGenreQueries ? (
          showsByGenreQueries.map((query, i) => (
            <li>{query.data?.shows.data.results[i].name}</li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </div>
  );
}
