import type { TvShow } from "@/queries/queries";
import { IMAGE_BASE_URL } from "./Slide";

interface ShowCardProps extends TvShow {
  key: number;
}

function ShowCard({
  name,
  key,
  first_air_date,
  poster_path,
  vote_average,
  vote_count,
}: ShowCardProps) {
  return (
    <li
      className="bg-[rgb(17,17,17)] gap-4 border-b-white border-b py-1 px-2 w-full flex cursor-pointer"
      key={key}
    >
      <img className="rounded-md" src={`${IMAGE_BASE_URL}w92${poster_path}`} />
      <div className="flex flex-col justify-start">
        <h2 className="text-xl">{name}</h2>
        <span>{first_air_date.split("-")[0]}</span>
        <span>{vote_average.toString().slice(0, 4)}⭐</span>
        <span>Rating Count: {vote_count}</span>
      </div>
    </li>
  );
}

export default ShowCard;
