import { Link } from "@tanstack/react-router";
import { IMAGE_BASE_URL } from "./Slide";

interface MobileSlideProps {
  poster_path: string;
  id: number;
}
export default function MobileSlide({ id, poster_path }: MobileSlideProps) {
  return (
    <li className="relative mr-5 shrink-0 basis-[70%] overflow-hidden">
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
    </li>
  );
}
