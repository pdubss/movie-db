import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

const Carousel = () => {
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
        <div className="flex h-[400px]">
          <div className="shrink-0 w-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
            Slide 1
          </div>
          <div className="shrink-0 w-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
            Slide 2
          </div>
          <div className="shrink-0 w-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
            Slide 3
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-center">
        <button
          className="bg-yellow-400 px-2 py-1 text-black rounded-lg"
          onClick={scrollPrev}
        >
          Prev
        </button>
        <button
          className="bg-yellow-400 px-2 py-1 text-black rounded-lg"
          onClick={scrollNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
