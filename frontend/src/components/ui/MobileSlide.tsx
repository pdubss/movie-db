import { Link } from "@tanstack/react-router";
import { IMAGE_BASE_URL } from "./Slide";

interface MobileSlideProps {
  poster_path: string;
  key: number;
  id: number;
}
export default function MobileSlide({
  id,
  poster_path,
  key,
}: MobileSlideProps) {
  return (
    <li className="relative mr-5 shrink-0 basis-[100%] rounded p-2" key={key}>
      <Link to="/movies/$movieId" params={{ movieId: id.toString() }}>
        <img
          className="h-full w-full"
          src={`${IMAGE_BASE_URL}w185${poster_path}`}
        />
      </Link>
    </li>
  );
}
