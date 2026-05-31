import { useEffect, useState } from 'react';
import { getMediaKind } from './mediaUtils';
import { ResponsiveImage } from './ResponsiveImage';
import './HeroFeature.css';

type HeroFeatureProps = {
  src: string;
  srcDesktop?: string;
  breakout?: boolean;
  label?: string;
  onOpen?: (src: string) => void;
};

export function HeroFeature({ src, srcDesktop, breakout = false, label = 'Open media', onOpen }: HeroFeatureProps) {
  const [isTabletUp, setIsTabletUp] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 640px)').matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');
    const updateMatch = (event: MediaQueryListEvent) => setIsTabletUp(event.matches);

    setIsTabletUp(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateMatch);

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  const activeSrc = isTabletUp && srcDesktop ? srcDesktop : src;
  const activeKind = getMediaKind(activeSrc);

  return (
    <section className={['hero-feature', breakout ? 'hero-feature-breakout' : ''].filter(Boolean).join(' ')}>
      <button className="hero-feature-media" type="button" onClick={() => onOpen?.(activeSrc)} aria-label={label}>
        {activeKind === 'video' ? (
          <video key={activeSrc} autoPlay muted loop playsInline preload="metadata" src={activeSrc} />
        ) : (
          <ResponsiveImage src={activeSrc} alt="" sizes="100vw" />
        )}
      </button>
    </section>
  );
}
