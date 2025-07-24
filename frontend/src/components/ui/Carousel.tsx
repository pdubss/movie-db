import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import type { Movie } from "@/queries/queries";
import Slide from "./Slide";

interface CarouselProps {
  data: Movie[] | undefined;
}

const Carousel = ({ data }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay()],
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex h-[600px]">
          {data &&
            data.map((movie, index) => (
              <Slide
                key={index}
                Title={movie.title}
                Poster={movie.poster_path}
                Background={movie.backdrop_path}
                Subtext={movie.overview}
                id={movie.id}
              />
            ))}
        </div>
      </div>
      <div className="flex w-full justify-center gap-4">
        <button
          className="cursor-pointer rounded-lg bg-yellow-400 px-2 py-1 text-black transition-colors duration-300 hover:bg-yellow-200"
          onClick={scrollPrev}
        >
          Prev
        </button>
        <button
          className="cursor-pointer rounded-lg bg-yellow-400 px-2 py-1 text-black transition-colors duration-300 hover:bg-yellow-200"
          onClick={scrollNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
