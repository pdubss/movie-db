interface SlideProps {
  Title: string;
  Poster: string;
  Background: string;
  Subtext: string;
}

const Slide = ({ Title, Poster, Background, Subtext }: SlideProps) => {
  return (
    <div className="shrink-0 basis-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
      <h2 className="text-2xl">{Title}</h2>
      <p>{Subtext}</p>
      <img src={Poster} />
      <img src={Background} />
    </div>
  );
};

export default Slide;
