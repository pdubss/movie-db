import { Link } from "@tanstack/react-router";

interface SlideProps {
  Title: string;
  Poster: string;
  Background?: string;
  Subtext?: string;
  id: number;
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w154";
const BACKDROP_SIZE = "w1280";
const combinedPosterPath = IMAGE_BASE_URL + POSTER_SIZE;
const combinedBackdropPath = IMAGE_BASE_URL + BACKDROP_SIZE;

const Slide = ({ Title, Poster, Background, Subtext, id }: SlideProps) => {
  return (
    <li className="relative mr-5 shrink-0 basis-[90%] cursor-pointer rounded bg-white p-6 text-center text-xl shadow">
      <Link to="/movies/$movieId" params={{ movieId: id.toString() }}>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-10 left-50 z-10 flex flex-col items-start gap-2 p-2">
          <h2 className="text-3xl font-semibold text-white">{Title}</h2>
          <p className="w-[75%] text-start text-base text-white">{Subtext}</p>
        </div>
        <img
          className="absolute bottom-2 left-2 z-10 rounded-md"
          src={combinedPosterPath + Poster}
        />
        <img
          className="absolute inset-0 z-0 h-full w-full"
          src={combinedBackdropPath + Background}
        />
      </Link>
    </li>
  );
};

export default Slide;
