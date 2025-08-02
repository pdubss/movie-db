import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import Spinner from "@/components/ui/Spinner";
import useMediaQuery from "@/hooks/useMediaQuery";
import { getShowsByGenre } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/shows/genre/$genreId")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMediaQuery("(max-width:1280px)");
  const { genreId } = Route.useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["movies", genreId, page],
    queryFn: () => getShowsByGenre(genreId, page),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6 py-3">
      <h1 className="text-center text-2xl font-semibold">
        {data?.genre?.name} Shows
      </h1>
      {isMobile ? (
        <ul className="grid grid-cols-1 gap-8">
          {data?.shows.results.map((show, index) => (
            <li key={index}>
              <Link
                className="flex flex-col gap-2"
                to="/shows/$showId"
                params={{ showId: show.id.toString() }}
              >
                <img
                  className="rounded-md"
                  src={`${IMAGE_BASE_URL}w500${show.poster_path}`}
                />
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">{show.name}</span>
                  <span>{show.first_air_date.split("-")[0]}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-8">
          <ul className="grid gap-6 xl:grid-cols-5">
            {data?.shows.results.map((show) => (
              <li className="transform cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-110">
                <Link
                  className="flex flex-col gap-2"
                  to="/shows/$showId"
                  params={{ showId: show.id.toString() }}
                >
                  <img
                    className="rounded-md"
                    src={`${IMAGE_BASE_URL}w185${show.poster_path}`}
                  />
                  <div className="flex justify-between">
                    <span>{show.name}</span>
                    <span>{show.first_air_date.split("-")[0]}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
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
  );
}
