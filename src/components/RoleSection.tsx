import type { ReactNode } from 'react';
import { BodyText, SectionHeading } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import './RoleSection.css';

type RoleSectionProps = {
  title: string;
  subtitle: string;
  tag?: string;
  points: ReactNode[];
};

export function RoleSection({ title, subtitle, tag, points }: RoleSectionProps) {
  return (
    <PageSection className="role-section">
      <div className="role-header">
        <SectionHeading>{title}</SectionHeading>
        <p className="role-subtitle">{subtitle}</p>
        {tag ? <p className="role-tag">{tag}</p> : null}
      </div>
      <ul className="role-points">
        {points.map((point, index) => (
          <li key={index}>
            <BodyText>{point}</BodyText>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
