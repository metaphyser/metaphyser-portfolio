import type { ReactNode } from 'react';
import './PageSection.css';

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  spacing?: 'default' | 'compact';
};

export function PageSection({ children, className, spacing = 'default' }: PageSectionProps) {
  const classes = ['page-section', `page-section-${spacing}`, className].filter(Boolean).join(' ');

  return <section className={classes}>{children}</section>;
}
