import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { getMediaKind, resolveMediaSrc, type CaseStudyMediaItem, type MediaViewport } from './mediaUtils';
import { getVideoDimensions } from '../mediaAssets';
import { ResponsiveImage } from './ResponsiveImage';
import './MediaCarousel.css';

type MediaCarouselProps = {
  items: CaseStudyMediaItem[];
  breakout?: boolean;
  onItemOpen?: (item: CaseStudyMediaItem) => void;
};

function MediaPreview({ item, viewport }: { item: CaseStudyMediaItem; viewport: MediaViewport }) {
  const activeSrc = resolveMediaSrc(item, viewport);
  const kind = getMediaKind(activeSrc);
  const videoDimensions = kind === 'video' ? getVideoDimensions(activeSrc) : null;

  return kind === 'video' ? (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      src={activeSrc}
      width={videoDimensions?.width}
      height={videoDimensions?.height}
    />
  ) : (
    <ResponsiveImage
      src={activeSrc}
      alt=""
      sizes={(item.displaySize ?? 'full') === 'half' ? '(min-width: 640px) 22rem, 100vw' : '100vw'}
    />
  );
}

type MediaSlide = {
  items: CaseStudyMediaItem[];
  size: 'full' | 'half-pair';
};

function createMediaSlides(items: CaseStudyMediaItem[]) {
  const slides: MediaSlide[] = [];

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];

    if (item.displaySize === 'full') {
      slides.push({ items: [item], size: 'full' });
      continue;
    }

    const nextItem = items[index + 1];

    if (nextItem && nextItem.displaySize !== 'full') {
      slides.push({ items: [item, nextItem], size: 'half-pair' });
      index += 1;
      continue;
    }

    slides.push({ items: [item], size: 'half-pair' });
  }

  return slides;
}

export function MediaCarousel({ items, breakout = false, onItemOpen }: MediaCarouselProps) {
  const [viewport, setViewport] = useState<MediaViewport>(() => {
    if (typeof window === 'undefined') {
      return 'mobile';
    }

    if (window.matchMedia('(min-width: 1100px)').matches) {
      return 'desktop';
    }

    return window.matchMedia('(min-width: 640px)').matches ? 'tablet' : 'mobile';
  });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false });
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isTabletUp = viewport !== 'mobile';
  const slides = isTabletUp
    ? createMediaSlides(items)
    : items.map((item) => ({
        items: [item],
        size: item.displaySize === 'full' ? ('full' as const) : ('half-pair' as const),
      }));

  if (!items.length) {
    return null;
  }

  useEffect(() => {
    const tabletQuery = window.matchMedia('(min-width: 640px)');
    const desktopQuery = window.matchMedia('(min-width: 1100px)');
    const updateViewport = () => {
      if (desktopQuery.matches) {
        setViewport('desktop');
        return;
      }

      setViewport(tabletQuery.matches ? 'tablet' : 'mobile');
    };

    updateViewport();
    tabletQuery.addEventListener('change', updateViewport);
    desktopQuery.addEventListener('change', updateViewport);

    return () => {
      tabletQuery.removeEventListener('change', updateViewport);
      desktopQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const hasControls = slides.length > 1;

  return (
    <section
      className={[
        'media-carousel',
        breakout ? 'media-carousel-breakout' : '',
        hasControls ? 'media-carousel-has-controls' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="media-carousel-frame" ref={emblaRef}>
        <div className="media-carousel-track">
          {slides.map((slide) => (
            <div
              className={[
                'media-carousel-slide',
                slide.size === 'full' ? 'media-carousel-slide-full' : 'media-carousel-slide-half-pair',
              ]
                .filter(Boolean)
                .join(' ')}
              key={slide.items.map((item) => `${item.src}:${item.displaySize ?? 'full'}`).join('|')}
            >
              <div className="media-carousel-slide-inner">
                {slide.items.map((item) => (
                  <button
                    className="media-carousel-card"
                    type="button"
                    onClick={() => onItemOpen?.(item)}
                    aria-label={`Open ${item.label}`}
                    key={`${item.src}:${item.displaySize ?? 'full'}`}
                  >
                    <MediaPreview item={item} viewport={viewport} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasControls ? (
        <div className="media-carousel-controls" aria-label="Media carousel controls">
          <button
            className="media-carousel-arrow"
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <span className="media-carousel-arrow-icon media-carousel-arrow-icon-prev" aria-hidden="true" />
          </button>
          <div className="media-carousel-nav" aria-label="Media carousel">
            {slides.map((slide, index) => (
              <button
                key={slide.items.map((item) => `${item.src}:${item.displaySize ?? 'full'}`).join('|')}
                type="button"
                className={['media-carousel-tab', index === activeIndex ? 'is-active' : ''].filter(Boolean).join(' ')}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-pressed={index === activeIndex}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className="media-carousel-dot" />
              </button>
            ))}
          </div>
          <button
            className="media-carousel-arrow"
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <span className="media-carousel-arrow-icon media-carousel-arrow-icon-next" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
