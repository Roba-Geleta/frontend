import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplayOptions?: {
    playOnInit?: boolean;
    stopOnInteraction?: boolean;
    startDelay?: number; // Delay before autoplay resumes after interaction (in ms)
    speed?: number; // Scroll speed
  };
};

const AutoScrollEmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  autoplayOptions = {
    playOnInit: true,
    stopOnInteraction: false,
    startDelay: 0, // 3 seconds
    speed: 2, // Adjust as needed
  },
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({
      playOnInit: autoplayOptions.playOnInit,
      stopOnInteraction: autoplayOptions.stopOnInteraction,
      startDelay: autoplayOptions.startDelay,
      speed: autoplayOptions.speed,
    }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;

    // No additional logic needed as AutoScroll handles autoplay and resumption
    // Ensure that autoplay resumes after interaction if stopOnInteraction is true
  }, [emblaApi]);

  return (
    <div className="embla__scroll">
      <div className="embla__viewport__scroll" ref={emblaRef}>
        <div className="embla__container__scroll">
          {slides.map((slide, index) => (
            <div className="embla__slide__scroll" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {/* Removed controls and autoplay buttons */}
    </div>
  );
};

export default AutoScrollEmblaCarousel;
