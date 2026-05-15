import type { ReactNode } from 'react';
import './DocumentPrimitives.css';
import { normalizeHyphenatedWords } from './normalizeText';

type PrimitiveProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ children, className }: PrimitiveProps) {
  return (
    <h2 className={['document-section-heading', className].filter(Boolean).join(' ')}>
      {normalizeHyphenatedWords(children)}
    </h2>
  );
}

export function SubsectionHeading({ children, className }: PrimitiveProps) {
  return (
    <h3 className={['document-subsection-heading', className].filter(Boolean).join(' ')}>
      {normalizeHyphenatedWords(children)}
    </h3>
  );
}

export function EyebrowLabel({ children, className }: PrimitiveProps) {
  return <p className={['document-eyebrow', className].filter(Boolean).join(' ')}>{normalizeHyphenatedWords(children)}</p>;
}

export function BodyText({ children, className }: PrimitiveProps) {
  return <p className={['document-body', className].filter(Boolean).join(' ')}>{normalizeHyphenatedWords(children)}</p>;
}

export function SerifStatement({ children, className }: PrimitiveProps) {
  return (
    <p className={['document-serif-statement', className].filter(Boolean).join(' ')}>
      {normalizeHyphenatedWords(children)}
    </p>
  );
}

export function DocumentList({ children, className }: PrimitiveProps) {
  return <ul className={['document-list', className].filter(Boolean).join(' ')}>{normalizeHyphenatedWords(children)}</ul>;
}

export function DocumentQuote({ children, className }: PrimitiveProps) {
  return (
    <blockquote className={['document-quote', className].filter(Boolean).join(' ')}>
      {normalizeHyphenatedWords(children)}
    </blockquote>
  );
}
