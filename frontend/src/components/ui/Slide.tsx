interface SlideProps {
  Title: string;
  Poster: string;
  Background: string;
  Subtext: string;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w92";
const combinedPosterPath = IMAGE_BASE_URL + POSTER_SIZE;

const Slide = ({ Title, Poster, Background, Subtext }: SlideProps) => {
  return (
    <li className="shrink-0 basis-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
      <h2 className="text-2xl">{Title}</h2>
      <p>{Subtext}</p>
      <img src={combinedPosterPath + Poster} />
      <img src={combinedPosterPath + Background} />
    </li>
  );
};

export default Slide;
