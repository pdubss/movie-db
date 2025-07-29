import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import MobileSlide from "./MobileSlide";
import type { TvShow } from "@/queries/queries";

interface ShowCarousel {
  shows?: TvShow[];
}

export default function ShowCarousel({ shows }: ShowCarousel) {
  const [mobileEmblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay(),
  ]);
  return (
    <div className="overflow-x-hidden" ref={mobileEmblaRef}>
      <div className="flex h-full">
        {shows &&
          shows.map((show) => (
            <MobileSlide
              key={crypto.randomUUID()}
              poster_path={show.poster_path}
              id={show.id}
            />
          ))}
      </div>
    </div>
  );
}
