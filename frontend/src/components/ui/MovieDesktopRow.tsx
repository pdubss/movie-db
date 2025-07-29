import type { MovieResponse } from "@/queries/queries";
import { Link } from "@tanstack/react-router";
import { IMAGE_BASE_URL } from "./Slide";
interface MovieDesktopRowProps {
  query: {
    data?: {
      movies: MovieResponse;
    };
  };
}

export default function MovieDesktopRow({ query }: MovieDesktopRowProps) {
  return (
    <ul className="grid grid-cols-8 gap-4">
      {query.data?.movies.results.slice(0, 8).map((movie, i) => (
        <li
          key={i}
          className="transform cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-110"
        >
          <Link
            className="flex flex-col gap-2"
            to="/movies/$movieId"
            params={{ movieId: movie.id.toString() }}
          >
            <img
              className="rounded-md"
              src={`${IMAGE_BASE_URL}w185${movie.poster_path}`}
            />
            <div className="flex flex-col xl:flex-row xl:justify-between">
              <span className="font-semibold">{movie.title}</span>
              <span>{movie.release_date.split("-")[0]}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
