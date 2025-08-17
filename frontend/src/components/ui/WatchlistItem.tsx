import type { CrewMember, Person } from "@/queries/queries";

import { Link } from "@tanstack/react-router";
import { IMAGE_BASE_URL } from "./Slide";
import addToWatchlist from "@/utils/addToWatchlist";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";

export interface WatchlistItemData {
  id: string;
  title: string;
  year: string;
  user_id: string;
  overview: string;
  poster_path: string;
  type: "movie" | "show";
  runtime?: number;
  vote_average: number;
  vote_count: number;
  stars: Person[];
  director?: CrewMember;
  creator?: {
    id: number;
    credit_id: string;
    name: string;
    profile_path: string;
  }[];
}

export default function WatchlistItem({
  id,
  title,
  year,
  overview,
  poster_path,
  type,
  runtime,
  vote_average,
  vote_count,
  director,
  creator,
  stars,
  user_id,
}: WatchlistItemData) {
  const mutation = useMutation({
    mutationFn: () => addToWatchlist(type, +id, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user_id] });
    },
  });

  return (
    <li className="relative flex gap-2 rounded-lg border border-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="absolute top-2 left-2 size-8 cursor-pointer"
        onClick={() => mutation.mutate()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>

      <img
        className="w-30 rounded-lg"
        src={`${IMAGE_BASE_URL}w185${poster_path}`}
        alt="movie poster"
      />
      <div className="flex flex-col justify-around p-2">
        {type === "movie" ? (
          <Link
            className="text-lg font-bold hover:text-gray-200"
            to="/movies/$movieId"
            params={{ movieId: id }}
          >
            {title}
          </Link>
        ) : (
          <Link to="/shows/$showId" params={{ showId: id }}>
            {title}
          </Link>
        )}
        <div className="flex gap-2">
          <span>{year.split("-")[0]}</span>
          {type === "movie" ? <span>{runtime}m</span> : null}
        </div>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 fill-yellow-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{vote_average.toString().slice(0, 3)}</span>
          <span className="text-xs">({vote_count})</span>
        </div>

        <span className="text-sm">{overview}</span>
        <div className="flex gap-2">
          {type === "movie" ? (
            <div className="flex gap-2">
              <h3 className="font-semibold">Director</h3>
              {director ? (
                <Link
                  to="/people/$personId"
                  params={{ personId: director?.id.toString() }}
                  className="text-blue-500 hover:text-blue-400"
                >
                  {director?.name}
                </Link>
              ) : null}
            </div>
          ) : null}

          {type === "show" ? (
            <div className="flex gap-2">
              <h3 className="font-semibold">
                {creator && creator?.length > 1 ? "Creators" : "Creator"}
              </h3>
              <ul className="flex gap-2">
                {creator?.map((creator) => (
                  <Link
                    key={creator.id}
                    to="/people/$personId"
                    params={{ personId: creator.id.toString() }}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    {creator.name}
                  </Link>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex gap-2">
            <h3 className="font-semibold">Starring</h3>
            <ul className="flex gap-2">
              {stars.slice(0, 6).map((actor) => (
                <Link
                  key={actor.id}
                  className="text-blue-500 hover:text-blue-400"
                  to="/people/$personId"
                  params={{ personId: actor.id.toString() }}
                >
                  {actor.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
