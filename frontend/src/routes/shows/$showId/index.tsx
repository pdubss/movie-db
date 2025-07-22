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

  if (data) console.log(data);

  return (
    <div className="w-full py-5 text-white">
      {!isLoading && data ? (
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <div className="flex gap-4">
              <h1 className="text-5xl">{data?.details.name}</h1>
              <span className="self-end text-lg font-semibold">
                {data.details.first_air_date.split("-")[0]}
              </span>
            </div>

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
            <div className="flex flex-col gap-1">
              <div className="h-[13rem] w-[13rem] cursor-pointer rounded-md bg-[#121212] hover:bg-[#282828]">
                <Link
                  className="flex h-full w-full flex-col items-center justify-center gap-2"
                  to="/shows/$showId/videos"
                  params={{ showId }}
                >
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
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                    />
                  </svg>
                  <span>
                    {data.details.videos.results.length}{" "}
                    {data.details.videos.results.length === 1
                      ? "Video"
                      : "Videos"}
                  </span>
                </Link>
              </div>
              <div className="h-[13rem] w-[13rem] cursor-pointer rounded-md bg-[#121212] hover:bg-[#282828]">
                <Link
                  className="flex h-full w-full flex-col items-center justify-center gap-2"
                  to="/shows/$showId/photos"
                  params={{ showId }}
                >
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
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span>
                    {data.details.images.backdrops.length +
                      data.details.images.posters.length}{" "}
                    {data.details.images.backdrops.length +
                      data.details.images.posters.length ===
                    1
                      ? "Photo"
                      : "Photos"}
                  </span>
                </Link>
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

          <p className="text-lg">{data.details.overview}</p>
          <hr />
          <div className="flex gap-4">
            <span className="font-bold">Creator</span>

            <ul className="flex gap-4">
              {data.details.created_by.map((creator, i) => (
                <li key={i}>
                  <Link className="text-blue-500" to="/">
                    {creator.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className="flex gap-4">
            <span className="font-bold">Stars</span>
            <ul className="flex gap-4">
              {data.details.aggregate_credits.cast.slice(0, 5).map((cast) => (
                <Link
                  className="text-blue-500"
                  to="/people/$personId"
                  params={{ personId: cast.id.toString() }}
                >
                  {cast.name}
                </Link>
              ))}
            </ul>
          </div>
          <hr />
          <div className="flex gap-4">
            <span className="font-bold">Writers</span>
            <ul className="flex gap-4">
              {data.details.aggregate_credits.crew
                .filter((crew) => crew.known_for_department === "Writing")
                .slice(0, 4)
                .map((writer) => (
                  <Link
                    className="text-blue-500"
                    to="/people/$personId"
                    params={{ personId: writer.id.toString() }}
                  >
                    {writer.name}
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
