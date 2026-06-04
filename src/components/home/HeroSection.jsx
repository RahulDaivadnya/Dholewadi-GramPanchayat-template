import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

function HeroSection() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { heroSlides, siteMeta } = useSiteContent();

  useEffect(() => {
    if (!playing || !heroSlides.length) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [heroSlides.length, playing]);

  useEffect(() => {
    setIndex((current) => (heroSlides.length ? current % heroSlides.length : 0));
  }, [heroSlides.length]);

  if (!heroSlides.length) {
    return null;
  }

  const current = heroSlides[index];

  return (
    <section className="relative h-[430px] overflow-hidden md:h-[560px] lg:h-[700px]">
      {heroSlides.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="container-shell">
          <div className="max-w-3xl text-white">
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
              {siteMeta.name}
            </div>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-amber-300 to-yellow-100 bg-clip-text text-transparent">
                {current.title}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
              {current.subtitle}
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/30 md:block"
        onClick={() => setIndex((currentIndex) => (currentIndex - 1 + heroSlides.length) % heroSlides.length)}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/30 md:block"
        onClick={() => setIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <button
        type="button"
        className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/30"
        onClick={() => setPlaying((value) => !value)}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            className={`h-3 w-3 rounded-full transition ${slideIndex === index ? "scale-125 bg-white ring-2 ring-amber-400" : "bg-white/60"
              }`}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;
