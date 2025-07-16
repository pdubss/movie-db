import Spinner from "@/components/ui/Spinner";
import { getMovieById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/movies/$movieId/photos")({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["details", movieId],
    queryFn: () => getMovieById(movieId),
  });
  const BASE_URL = "https://image.tmdb.org/t/p/";

  const start = (page - 1) * 20;
  const end = page * 20;
  const numPages = Math.ceil((data?.images.length ?? 0) / 20);

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-8 text-white">
          <h1 className="text-2xl">
            Photos for{" "}
            <Link
              className="underline"
              to="/movies/$movieId"
              params={{ movieId }}
            >
              {data?.movie.title}
            </Link>{" "}
          </h1>
          <ul className="grid grid-cols-5 gap-3">
            {data?.images.slice(start, end).map((image) => (
              <img
                loading="lazy"
                className="cursor-pointer rounded-md"
                src={`${BASE_URL}w342${image.file_path}`}
              />
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {" "}
              <button
                className={`${page === 1 ? "bg-gray-500" : "bg-yellow-400"} rounded-md px-2 py-1 text-black`}
                disabled={page === 1}
                onClick={() => setPage((page) => page - 1)}
              >
                Back
              </button>
              <button
                className={`${page >= numPages ? "bg-gray-500" : "bg-yellow-400"} rounded-md px-2 py-1 text-black`}
                onClick={() => setPage((page) => page + 1)}
                disabled={page >= numPages}
              >
                Next
              </button>{" "}
            </div>

            <select
              value={page}
              onChange={(e) => setPage(+e.target.value)}
              className="w-20 bg-white text-center text-black"
              disabled={numPages === 0}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <option
                  className="bg-black text-center"
                  value={index + 1}
                  key={index}
                >
                  Page {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
