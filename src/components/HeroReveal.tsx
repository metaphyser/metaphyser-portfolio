import { useState, type CSSProperties, type PointerEvent } from 'react';
import './HeroReveal.css';

type HeroRevealProps = {
  beforeSrc: string;
  beforeSrcMobile?: string;
  beforeLabel: string;
  afterSrc: string;
  afterSrcMobile?: string;
  afterLabel: string;
};

export function HeroReveal({
  beforeSrc,
  beforeSrcMobile,
  beforeLabel,
  afterSrc,
  afterSrcMobile,
  afterLabel,
}: HeroRevealProps) {
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updatePosition = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextPosition = ((event.clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, nextPosition)));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setHasInteracted(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event);
  };

  return (
    <section className="hero-reveal" aria-label={`${beforeLabel} and ${afterLabel} comparison`}>
      <div
        className={['hero-reveal-frame', hasInteracted ? 'has-interacted' : 'is-intro'].filter(Boolean).join(' ')}
        onPointerDown={handlePointerDown}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            updatePosition(event);
          }
        }}
        style={{ '--hero-reveal-position': `${position}%` } as CSSProperties}
      >
        <picture>
          {afterSrcMobile ? <source media="(max-width: 639px)" srcSet={afterSrcMobile} /> : null}
          <img className="hero-reveal-image" src={afterSrc} alt={afterLabel} draggable={false} />
        </picture>
        <div className="hero-reveal-before" aria-hidden="true">
          <picture>
            {beforeSrcMobile ? <source media="(max-width: 639px)" srcSet={beforeSrcMobile} /> : null}
            <img className="hero-reveal-image" src={beforeSrc} alt="" draggable={false} />
          </picture>
        </div>
        <div className="hero-reveal-divider" aria-hidden="true">
          <span className="hero-reveal-handle" />
        </div>
      </div>
    </section>
  );
}
