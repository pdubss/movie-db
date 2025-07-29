import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import type { Movie } from "@/queries/queries";
import Slide from "./Slide";
import MobileSlide from "./MobileSlide";
import useMediaQuery from "@/hooks/useMediaQuery";

interface CarouselProps {
  data: Movie[] | undefined;
}

const Carousel = ({ data }: CarouselProps) => {
  const isMobile = useMediaQuery("(max-width:1280px)");
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay()],
  );
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [Autoplay()],
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    if (mobileEmblaApi) mobileEmblaApi.scrollPrev();
  }, [emblaApi, mobileEmblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    if (mobileEmblaApi) mobileEmblaApi.scrollNext();
  }, [emblaApi, mobileEmblaApi]);

  return (
    <div className="flex flex-col gap-10">
      {isMobile ? (
        <div className="overflow-x-hidden md:hidden" ref={mobileEmblaRef}>
          <div className="flex h-full md:hidden">
            {data &&
              data.map((movie) => (
                <MobileSlide
                  key={crypto.randomUUID()}
                  poster_path={movie.poster_path}
                  id={movie.id}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="hidden overflow-x-hidden md:block" ref={emblaRef}>
          <div className="hidden h-[600px] md:flex">
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
      )}

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
