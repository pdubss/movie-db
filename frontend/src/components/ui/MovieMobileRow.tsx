import type { Movie } from "@/queries/queries";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import MobileSlide from "./MobileSlide";

interface MovieMobileRow {
  query: {
    data?: {
      movies: {
        results: Movie[];
      };
    };
  };
}
export default function MovieMobileRow({ query }: MovieMobileRow) {
  const [mobileEmblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay(),
  ]);
  if (query) {
    console.log(query.data);
  }
  return (
    <div className="overflow-x-hidden" ref={mobileEmblaRef}>
      <div className="flex h-full">
        {query?.data &&
          query.data?.movies.results.map((movie) => (
            <MobileSlide
              type="movie"
              key={crypto.randomUUID()}
              poster_path={movie.poster_path}
              id={movie.id}
            />
          ))}
      </div>
    </div>
  );
}
