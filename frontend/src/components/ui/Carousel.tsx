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
    <div className="overflow-x-hidden" ref={emblaRef}>
      <div className="flex h-[400px]">
        <div className="shrink-0 basis-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
          Slide 2
        </div>
        <div className="shrink-0 basis-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
          Slide 3
        </div>
        <div className="shrink-0 basis-[90%] mr-5 bg-white rounded shadow p-6 text-center text-xl">
          Slide 4
        </div>
      </div>
      <button onClick={scrollPrev}>Prev</button>
      <button onClick={scrollNext}>Next</button>
    </div>
  );
};

export default Carousel;
