import type { ReactNode } from 'react';
import { DocumentList, EyebrowLabel, SectionHeading } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import { SectionFlow } from './SectionFlow';
import './OutcomeSection.css';

type Metric = {
  value: string;
  label: string;
};

type OutcomeSectionProps = {
  title: string;
  metrics?: Metric[];
  changes?: ReactNode[];
  groups?: Array<{
    title: string;
    items: ReactNode[];
  }>;
};

export function OutcomeSection({ title, metrics = [], changes = [], groups }: OutcomeSectionProps) {
  const outcomeGroups = groups ?? [{ title: 'What changed', items: changes }];

  return (
    <PageSection className="outcome-section">
      <SectionHeading>{title}</SectionHeading>

      {metrics.length > 0 ? (
        <ul className="outcome-metrics">
          {metrics.map((metric) => (
            <li className="outcome-metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </li>
          ))}
        </ul>
      ) : null}

      <SectionFlow className="outcome-changes">
        {outcomeGroups.map((group) => (
          <SectionFlow className="outcome-change-group" key={group.title}>
            <EyebrowLabel>{group.title}</EyebrowLabel>
            <DocumentList>
              {group.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </DocumentList>
          </SectionFlow>
        ))}
      </SectionFlow>
    </PageSection>
  );
}
