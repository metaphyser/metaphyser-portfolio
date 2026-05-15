import './ImpactStrip.css';
import { normalizeHyphenatedWords } from './normalizeText';

type ImpactItem = {
  value: string;
  label: string;
};

type ImpactStripProps = {
  title?: string;
  items: ImpactItem[];
};

export function ImpactStrip({ title, items }: ImpactStripProps) {
  return (
    <section className="impact-strip">
      {title ? <p className="impact-title">{title}</p> : null}
      <div className="impact-stats">
        {items.map((item, index) => (
          <article className="impact-stat" key={`${item.label}-${index}`}>
            <strong>{item.value}</strong>
            <p>{normalizeHyphenatedWords(item.label)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
