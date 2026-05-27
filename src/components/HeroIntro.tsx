import './HeroIntro.css';
import { normalizeHyphenatedWords } from './normalizeText';

type HeroIntroProps = {
  brand: string;
  brandLinks?: Array<{
    label: string;
    href: string;
  }>;
  title: string;
  subtitle?: string;
  meta?: string[];
};

export function HeroIntro({ brand, brandLinks = [], title, subtitle, meta = [] }: HeroIntroProps) {
  const [year, ...details] = meta;

  return (
    <section className="hero-intro page-shell">
      <div className="hero-title-block">
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta" aria-label="Project details">
          <p className="hero-meta-line hero-meta-line-primary">
            <span>{normalizeHyphenatedWords(brand)}</span>
          </p>
          {year ? (
            <p className="hero-meta-line" key={year}>
              {normalizeHyphenatedWords(year)}
            </p>
          ) : null}
          {details.map((item) => (
            <p className="hero-meta-line" key={item}>
              {normalizeHyphenatedWords(item)}
            </p>
          ))}
        </div>
        {subtitle ? <p className="hero-subtitle">{normalizeHyphenatedWords(subtitle)}</p> : null}
        {brandLinks.length > 0 ? (
          <div className="hero-meta-links-group">
            <img
              className="hero-meta-links-arrow hero-meta-links-arrow-mobile"
              src="/icons/mini/arrow-right.svg"
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-meta-links-arrow hero-meta-links-arrow-tablet"
              src="/icons/small/arrow-right.svg"
              alt=""
              aria-hidden="true"
            />
            {brandLinks.map((link) => (
              <a className="hero-meta-tag" href={link.href} key={link.href} target="_blank" rel="noreferrer">
                <span>{normalizeHyphenatedWords(link.label)}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
