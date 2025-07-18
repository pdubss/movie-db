import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import { getShowsByGenre } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shows/genre/$genreId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { genreId } = Route.useParams();
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["movies", genreId, page],
    queryFn: () => getShowsByGenre(genreId, page),
  });

  if (data) console.log(data);

  return (
    <div className="py-5 text-white">
      {data ? (
        <div className="flex flex-col gap-8">
          <h1 className="text-center text-2xl font-bold">
            {data?.genre?.name} Movies
          </h1>
          <ul className="grid gap-6 xl:grid-cols-5">
            {data.shows.results.map((show) => (
              <li className="flex flex-col gap-2">
                <img
                  className="rounded-md"
                  src={`${IMAGE_BASE_URL}w185${show.poster_path}`}
                />
                <div className="flex gap-2">
                  {" "}
                  <span>{show.name}</span>
                  <span>{show.first_air_date.split("-")[0]}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center gap-4">
            {" "}
            <button
              className="cursor-pointer rounded-lg border border-white px-2 py-1"
              onClick={() => setPage((page) => page - 1)}
            >
              BACK
            </button>
            <button
              className="cursor-pointer rounded-lg border border-white px-2 py-1"
              onClick={() => setPage((page) => page + 1)}
            >
              NEXT
            </button>{" "}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
