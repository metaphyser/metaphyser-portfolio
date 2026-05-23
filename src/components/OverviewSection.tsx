import type { ReactNode } from 'react';
import { BodyText, SectionHeading } from './DocumentPrimitives';
import './OverviewSection.css';

type OverviewSectionProps = {
  title: string;
  paragraphs: ReactNode[];
  leadingContent?: ReactNode;
};

export function OverviewSection({ title, paragraphs, leadingContent }: OverviewSectionProps) {
  return (
    <section
      className={['overview-feature', 'page-shell', leadingContent ? '' : 'overview-feature-no-leading']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['overview-copy', leadingContent ? 'overview-copy-with-leading' : ''].filter(Boolean).join(' ')}>
        <SectionHeading>{title}</SectionHeading>
        {leadingContent ? <div className="overview-leading">{leadingContent}</div> : null}
        <div className="overview-body">
          {paragraphs.map((paragraph, index) => (
            <BodyText key={index}>{paragraph}</BodyText>
          ))}
        </div>
      </div>
    </section>
  );
}
