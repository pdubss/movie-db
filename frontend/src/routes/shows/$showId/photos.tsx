import Overlay from "@/components/ui/Overlay";
import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import { getShowById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Route = createFileRoute("/shows/$showId/photos")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openOverlay, setOpenOverlay] = useState(false);
  const [path, setPath] = useState("");
  const { showId } = Route.useParams();
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["photos", showId],
    queryFn: () => getShowById(showId),
  });

  const resultsPerPage = 30;
  const start = page - 1;
  const end = page * resultsPerPage;

  const merged = data?.details.images.backdrops.concat(
    data?.details.images.posters,
  );

  const onClickHandler = (path: string) => {
    setOpenOverlay(true);
    setPath(path);
  };

  function nextHandler() {
    if (merged) {
      const numPages = Math.ceil(merged?.length / resultsPerPage);
      if (page < numPages) {
        setPage((page) => page + 1);
      }
    }
  }

  function prevHandler() {
    if (page > 1) setPage((page) => page - 1);
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      {openOverlay && (
        <Overlay setOpenOverlay={setOpenOverlay}>
          <img className="rounded-md" src={`${IMAGE_BASE_URL}w500${path}`} />
        </Overlay>
      )}
      <h1 className="text-center text-2xl">
        Showing Photos For{" "}
        <Link className="underline" to="/shows/$showId" params={{ showId }}>
          {" "}
          {data?.details.name}
        </Link>
      </h1>
      {merged?.length ? (
        <div className="flex flex-col gap-6">
          {" "}
          <ul className="grid gap-4 xl:grid-cols-6 xl:grid-rows-5">
            {merged.slice(start * resultsPerPage, end).map((image) => (
              <li
                className="cursor-pointer"
                onClick={() => onClickHandler(image.file_path)}
              >
                <img src={`${IMAGE_BASE_URL}w185${image.file_path}`} />
              </li>
            ))}
          </ul>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={prevHandler} href="#" />
              </PaginationItem>
              {Array.from(
                { length: Math.ceil(merged.length / resultsPerPage) },
                (_, index) => (
                  <PaginationItem>
                    <PaginationLink
                      isActive={page === index + 1}
                      className={page === index + 1 ? "text-black" : ""}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext onClick={nextHandler} href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : (
        <p>Show has no images!</p>
      )}
    </div>
  );
}
