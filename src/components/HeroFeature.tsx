import { useEffect, useState } from 'react';
import { getMediaKind } from './mediaUtils';
import { getVideoDimensions } from '../mediaAssets';
import { ResponsiveImage } from './ResponsiveImage';
import './HeroFeature.css';

type HeroFeatureProps = {
  src: string;
  srcTablet?: string;
  srcDesktop?: string;
  breakout?: boolean;
  label?: string;
  onOpen?: () => void;
};

export function HeroFeature({
  src,
  srcTablet,
  srcDesktop,
  breakout = false,
  label = 'Open media',
  onOpen,
}: HeroFeatureProps) {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') {
      return 'mobile';
    }

    if (window.matchMedia('(min-width: 1100px)').matches) {
      return 'desktop';
    }

    return window.matchMedia('(min-width: 640px)').matches ? 'tablet' : 'mobile';
  });

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

  const activeSrc =
    viewport === 'desktop'
      ? (srcDesktop ?? srcTablet ?? src)
      : viewport === 'tablet'
        ? (srcTablet ?? src)
        : src;
  const activeKind = getMediaKind(activeSrc);
  const activeVideoDimensions = activeKind === 'video' ? getVideoDimensions(activeSrc) : null;

  return (
    <section className={['hero-feature', breakout ? 'hero-feature-breakout' : ''].filter(Boolean).join(' ')}>
      <button className="hero-feature-media" type="button" onClick={() => onOpen?.()} aria-label={label}>
        {activeKind === 'video' ? (
          <video
            key={activeSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src={activeSrc}
            width={activeVideoDimensions?.width}
            height={activeVideoDimensions?.height}
          />
        ) : (
          <ResponsiveImage src={activeSrc} alt="" sizes="100vw" />
        )}
      </button>
    </section>
  );
}
