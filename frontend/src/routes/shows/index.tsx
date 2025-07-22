import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import { fetchShowGenres, fetchShowsByGenre } from "@/queries/queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shows/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["showGenres"],
    queryFn: () => fetchShowGenres(),
  });

  const showsByGenreQueries = useQueries({
    queries: (data?.genres ?? []).map((genre) => ({
      queryKey: ["shows", genre.id],
      queryFn: () => fetchShowsByGenre(genre.id.toString()),
      enabled: !!data?.genres,
    })),
  });

  if (showsByGenreQueries) console.log(showsByGenreQueries);

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="text-center text-3xl font-bold">TV Shows</h1>
      {showsByGenreQueries ? (
        showsByGenreQueries.map((query, i) => (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">{data?.genres[i].name}</h2>
              {data?.genres[i].id && (
                <Link
                  className="rounded-md bg-green-500 px-2 py-1 text-black"
                  to="/shows/genre/$genreId"
                  params={{ genreId: data?.genres[i].id.toString() }}
                >
                  MORE +
                </Link>
              )}
            </div>

            <ul className="grid gap-4 xl:grid-cols-8">
              {query.data?.shows.data.results.slice(0, 8).map((show) => (
                <li className="flex transform cursor-pointer flex-col gap-2 transition-transform duration-300 hover:z-10 hover:scale-110">
                  <Link
                    to="/shows/$showId"
                    params={{ showId: show.id.toString() }}
                  >
                    <img
                      className="rounded-md"
                      src={`${IMAGE_BASE_URL}w185${show.poster_path}`}
                    />
                    <div className="flex justify-between">
                      <span className="font-semibold">{show.name}</span>
                      <span>{show.first_air_date.slice(0, 4)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
