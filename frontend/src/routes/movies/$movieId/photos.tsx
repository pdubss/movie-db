import Spinner from "@/components/ui/Spinner";
import { getMovieById } from "@/queries/queries";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Overlay from "@/components/ui/Overlay";
import { queryClient } from "@/queryClient";

export const Route = createFileRoute("/movies/$movieId/photos")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      data: await queryClient.ensureQueryData({
        queryKey: ["details", params.movieId],
        queryFn: () => getMovieById(params.movieId),
      }),
    };
  },
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const data = Route.useLoaderData();

  const [openOverlay, setOpenOverlay] = useState(false);
  const [path, setPath] = useState("");
  const [page, setPage] = useState(1);
  const BASE_URL = "https://image.tmdb.org/t/p/";

  const start = (page - 1) * 20;
  const end = page * 20;
  const numPages = Math.ceil((data.data.images.length ?? 0) / 20);

  function onClickHandler(path: string) {
    setOpenOverlay(true);
    setPath(path);
  }

  return (
    <div className="h-full w-full">
      {openOverlay && (
        <Overlay setOpenOverlay={setOpenOverlay}>
          <img className="rounded-md" src={`${BASE_URL}w500${path}`} />
        </Overlay>
      )}
      (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-8 text-white">
        <h1 className="text-2xl">
          Photos for{" "}
          <Link
            className="underline"
            to="/movies/$movieId"
            params={{ movieId }}
          >
            {data.data.movie.title}
          </Link>{" "}
        </h1>
        <ul className="grid grid-cols-5 gap-3">
          {data.data.images.slice(start, end).map((image, i) => (
            <li key={i} onClick={() => onClickHandler(image.file_path)}>
              <img
                loading="lazy"
                className="cursor-pointer rounded-md"
                src={`${BASE_URL}w342${image.file_path}`}
              />
            </li>
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
      )
    </div>
  );
}
