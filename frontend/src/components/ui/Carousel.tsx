import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay(),
  ]);
  return (
    <div className="overflow-x-hidden" ref={emblaRef}>
      <div className="h-[400px] flex w-screen">
        <div className="lg:flex-[0_0_60%] flex-[0_0_80%] min-w-0 bg-white border mr-5">
          Slide 1
        </div>
        <div className="lg:flex-[0_0_60%] flex-[0_0_80%] min-w-0 bg-white border mr-5">
          Slide 2
        </div>
        <div className="lg:flex-[0_0_60%] flex-[0_0_80%] min-w-0 bg-white border mr-5">
          Slide 3
        </div>
      </div>
    </div>
  );
};

export default Carousel;
