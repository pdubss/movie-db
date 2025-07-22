import type { TvShow } from "@/queries/queries";
import { IMAGE_BASE_URL } from "./Slide";
import { Link } from "@tanstack/react-router";

interface ShowCardProps extends TvShow {
  key: number;
}

function ShowCard({
  id,
  name,
  key,
  first_air_date,
  poster_path,
  vote_average,
  vote_count,
}: ShowCardProps) {
  return (
    <li
      className="cursor-pointerborder-b w-full border-b-white bg-[rgb(17,17,17)] px-2 py-1"
      key={key}
    >
      <Link
        className="flex gap-4"
        to="/shows/$showId"
        params={{ showId: id.toString() }}
      >
        <img
          className="rounded-md"
          src={`${IMAGE_BASE_URL}w92${poster_path}`}
        />
        <div className="flex flex-col justify-start">
          <h2 className="text-xl">{name}</h2>
          <span>{first_air_date.split("-")[0]}</span>
          <span>{vote_average.toString().slice(0, 4)}⭐</span>
          <span>Rating Count: {vote_count}</span>
        </div>
      </Link>
    </li>
  );
}

export default ShowCard;
