import Spinner from "@/components/ui/Spinner";
import { getMovieById } from "@/queries/queries";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { queryClient } from "@/queryClient";

export const Route = createFileRoute("/movies/$movieId/videos")({
  component: RouteComponent,
  loader: async ({ params }) =>
    queryClient.ensureQueryData({
      queryKey: ["details", params.movieId],
      queryFn: () => getMovieById(params.movieId),
    }),
  pendingComponent: () => <Spinner />,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  const [page, setPage] = useState(1);
  const data = Route.useLoaderData();

  const start = (page - 1) * 4;
  const end = page * 4;
  const numPages = Math.ceil((data.videos.length ?? 0) / 4);

  function nextHandler() {
    if (page <= numPages) {
      setPage((page) => page + 1);
    }
  }
  function prevHandler() {
    if (page >= 2) {
      setPage((page) => page - 1);
    }
  }

  return (
    <div>
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
        <ul className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:grid-rows-2">
          {data &&
            data.videos.length > 0 &&
            data.videos.slice(start, end).map((vid, index) => (
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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={prevHandler} href="#" />
            </PaginationItem>
            {Array.from({ length: numPages }, (_, i) => (
              <PaginationItem className="active:text-black" key={i}>
                <PaginationLink
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                  className={page === i + 1 ? "text-black" : ""}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={nextHandler} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
