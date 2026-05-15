import type { ReactNode } from 'react';
import { BodyText, DocumentList, EyebrowLabel, SectionHeading, SerifStatement } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import { SectionFlow } from './SectionFlow';
import './ProblemSection.css';

type ProblemGroup = {
  title: string;
  items: ReactNode[];
};

type ProblemSectionProps = {
  title: string;
  beginning: {
    title: string;
    statement: ReactNode;
  };
  middle: ProblemGroup[];
  end: {
    title: string;
    statement: ReactNode;
  };
};

function ProblemList({ title, items }: { title: string; items: ReactNode[] }) {
  return (
    <SectionFlow className="problem-list">
      <EyebrowLabel className="problem-subtitle">{title}</EyebrowLabel>
      <DocumentList className="problem-points">
        {items.map((item, index) => (
          <li key={index}>
            <BodyText>{item}</BodyText>
          </li>
        ))}
      </DocumentList>
    </SectionFlow>
  );
}

export function ProblemSection({ title, beginning, middle, end }: ProblemSectionProps) {
  return (
    <PageSection className="problem-section" spacing="compact">
      <SectionHeading>{title}</SectionHeading>

      <SectionFlow className="problem-brief">
        <EyebrowLabel className="problem-subtitle">{beginning.title}</EyebrowLabel>
        <SerifStatement>{beginning.statement}</SerifStatement>
      </SectionFlow>

      {middle.length > 0 ? (
        <div className="problem-grid">
          <div className="problem-panel">
            {middle.map((group) => (
              <ProblemList key={group.title} title={group.title} items={group.items} />
            ))}
          </div>
        </div>
      ) : null}

      <SectionFlow className="problem-reframe">
        <EyebrowLabel className="problem-subtitle">{end.title}</EyebrowLabel>
        <SerifStatement>{end.statement}</SerifStatement>
      </SectionFlow>
    </PageSection>
  );
}
