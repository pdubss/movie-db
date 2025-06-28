interface SlideProps {
  Title: string;
  Poster: string;
  Background: string;
  Subtext: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w154";
const BACKDROP_SIZE = "w1280";
const combinedPosterPath = IMAGE_BASE_URL + POSTER_SIZE;
const combinedBackdropPath = IMAGE_BASE_URL + BACKDROP_SIZE;

const Slide = ({ Title, Poster, Background, Subtext }: SlideProps) => {
  return (
    <li className="relative shrink-0 basis-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
      <h2 className="text-3xl absolute inset-0 top-5 z-10 text-white">
        {Title}
      </h2>
      <p className="rounded-lg bg-black/70 w-[75%] text-start text-base absolute z-10 left-55 bottom-10 text-white p-2">
        {Subtext}
      </p>
      <img
        className="rounded-md absolute left-2 bottom-2 z-10"
        src={combinedPosterPath + Poster}
      />
      <img
        className="absolute inset-0 w-full h-full z-0"
        src={combinedBackdropPath + Background}
      />
    </li>
  );
};

export default Slide;
