import './HeroIntro.css';
import { normalizeHyphenatedWords } from './normalizeText';

type HeroIntroProps = {
  brand: string;
  title: string;
  subtitle?: string;
  meta?: string[];
};

export function HeroIntro({ brand, title, subtitle, meta = [] }: HeroIntroProps) {
  const [year, ...details] = meta;

  return (
    <section className="hero-intro page-shell">
      <div className="hero-title-block">
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta" aria-label="Project details">
          <p className="hero-meta-line hero-meta-line-primary">
            {normalizeHyphenatedWords(brand)}
            {year ? <span className="hero-meta-separator">•</span> : null}
            {normalizeHyphenatedWords(year)}
          </p>
          {details.map((item) => (
            <p className="hero-meta-line" key={item}>
              {normalizeHyphenatedWords(item)}
            </p>
          ))}
        </div>
        {subtitle ? <p className="hero-subtitle">{normalizeHyphenatedWords(subtitle)}</p> : null}
      </div>
    </section>
  );
}
