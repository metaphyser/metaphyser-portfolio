import type { ReactNode } from 'react';
import { BodyText, DocumentList, EyebrowLabel, SectionHeading, SerifStatement } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import './KeyDecisionsSection.css';

type Decision = {
  title: string;
  paragraphs: ReactNode[];
  impact?: ReactNode;
};

type KeyDecisionsSectionProps = {
  title: string;
  decisions: Decision[];
};

export function KeyDecisionsSection({ title, decisions }: KeyDecisionsSectionProps) {
  return (
    <PageSection className="key-decisions-section">
      <SectionHeading>{title}</SectionHeading>
      <ul className="decision-list">
        {decisions.map((decision) => (
          <li className="decision-item" key={decision.title}>
            <EyebrowLabel>{decision.title}</EyebrowLabel>
            <DocumentList className="decision-copy">
              {decision.impact ? (
                <li className="decision-impact">
                  <SerifStatement>{decision.impact}</SerifStatement>
                </li>
              ) : null}
              {decision.paragraphs.map((paragraph, index) => (
                <li key={index}>
                  <BodyText>{paragraph}</BodyText>
                </li>
              ))}
            </DocumentList>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
