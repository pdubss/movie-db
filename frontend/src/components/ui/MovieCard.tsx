import { IMAGE_BASE_URL } from "./Slide";
import type { Movie } from "@/queries/queries";
interface MovieCardProps extends Movie {
  key: number;
}

export default function MovieCard({
  key,
  poster_path,
  popularity,
  title,
  vote_average,
  vote_count,
  release_date,
}: MovieCardProps) {
  return (
    <li
      className="bg-[rgb(17,17,17)] gap-4 border-b-white border-b py-1 px-2 w-full flex cursor-pointer"
      key={key}
    >
      <img className="rounded-md" src={`${IMAGE_BASE_URL}w92${poster_path}`} />
      <div className="flex flex-col justify-start">
        <h2 className="text-xl">{title}</h2>
        <span>{release_date.split("-")[0]}</span>
        <span>Average Rating: {vote_average.toString().slice(0, 4)}⭐</span>
        <span>Rating Count: {vote_count}</span>
        <span>Popularity: {popularity.toString().slice(0, 4)}</span>
      </div>
    </li>
  );
}
