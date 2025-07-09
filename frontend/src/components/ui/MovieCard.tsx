import { Link } from "@tanstack/react-router";
import { IMAGE_BASE_URL } from "./Slide";
import type { Movie } from "@/queries/queries";
interface MovieCardProps extends Movie {
  key: number;
  setQuery: (x: string) => void;
}

export default function MovieCard({
  key,
  poster_path,
  popularity,
  title,
  vote_average,
  vote_count,
  release_date,
  id,
  setQuery,
}: MovieCardProps) {
  return (
    <li
      className="w-full cursor-pointer border-b border-b-white bg-[rgb(17,17,17)] px-2 py-1"
      key={key}
      onClick={() => setQuery("")}
    >
      <Link
        className="flex h-full w-full gap-4"
        to="/movies/$movieId"
        params={{ movieId: id.toString() }}
      >
        <img
          className="rounded-md"
          src={`${IMAGE_BASE_URL}w92${poster_path}`}
        />
        <div className="flex flex-col justify-start">
          <h2 className="text-xl">{title}</h2>
          <span>{release_date.split("-")[0]}</span>
          <span>Average Rating: {vote_average.toString().slice(0, 4)}⭐</span>
          <span>Rating Count: {vote_count}</span>
          <span>Popularity: {popularity.toString().slice(0, 4)}</span>
        </div>
      </Link>
    </li>
  );
}
