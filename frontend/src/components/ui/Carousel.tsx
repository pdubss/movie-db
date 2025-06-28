import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import type { Movie } from "@/queries/queries";
import Slide from "./Slide";

interface CarouselProps {
  trending: Movie[] | undefined;
}

const Carousel = ({ trending }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay()]
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-hidden " ref={emblaRef}>
        <div className="flex h-[550px]">
          {trending &&
            trending.map((movie) => (
              <Slide
                Title={movie.title}
                Poster={movie.poster_path}
                Background={movie.backdrop_path}
                Subtext={movie.overview}
              />
            ))}
        </div>
      </div>
      <div className="flex gap-2 w-full justify-center">
        <button
          className="bg-yellow-400 transition-colors duration-300 hover:bg-yellow-200 px-2 py-1 text-black rounded-lg cursor-pointer"
          onClick={scrollPrev}
        >
          Prev
        </button>
        <button
          className="bg-yellow-400 transition-colors duration-300 hover:bg-yellow-200 px-2 py-1 text-black rounded-lg cursor-pointer"
          onClick={scrollNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
