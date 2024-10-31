import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { NextButton, PrevButton } from "./EmblaCarouselArrowButtons";
import { usePrevNextButtons } from "../../../hooks/usePrevNextButtons";

type AutoplayPropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplayOptions?: {
    playOnInit?: boolean;
    stopOnInteraction?: boolean;
    startDelay?: number; // Delay before autoplay resumes after interaction (in ms)
  };
};

const AutoplayEmblaCarousel: React.FC<AutoplayPropType> = ({
  slides,
  options = {
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  },
  autoplayOptions = {
    playOnInit: true,
    stopOnInteraction: false,
    startDelay: 4000,
  },
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: autoplayOptions.playOnInit,
      stopOnInteraction: autoplayOptions.stopOnInteraction,
      delay: autoplayOptions.startDelay,
    }),
  ]);
  const [, setIsPlaying] = useState(false);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setIsPlaying(true))
      .on("autoplay:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="embla w-full h-full">
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container w-full h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide w-full h-full hover:z-10" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default AutoplayEmblaCarousel;
