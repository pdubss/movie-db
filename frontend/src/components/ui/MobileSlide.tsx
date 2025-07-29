import { Link } from "@tanstack/react-router";
import { IMAGE_BASE_URL } from "./Slide";

interface MobileSlideProps {
  poster_path: string;
  id: number;
  type: string;
}
export default function MobileSlide({
  type,
  id,
  poster_path,
}: MobileSlideProps) {
  return (
    <li className="relative mr-5 shrink-0 basis-[70%] overflow-hidden">
      {type === "movie" ? (
        <Link
          className="h-full w-full"
          to="/movies/$movieId"
          params={{ movieId: id.toString() }}
        >
          <img
            className="rounded-lg"
            src={`${IMAGE_BASE_URL}w342${poster_path}`}
          />
        </Link>
      ) : (
        <Link
          className="h-full w-full"
          to="/shows/$showId"
          params={{ showId: id.toString() }}
        >
          <img
            className="rounded-lg"
            src={`${IMAGE_BASE_URL}w342${poster_path}`}
          />
        </Link>
      )}
    </li>
  );
}
