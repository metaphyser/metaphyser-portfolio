import type { CaseStudyCardMeta } from '../content/caseStudies';
import { EyebrowLabel } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import './NextCaseStudySection.css';

type NextCaseStudySectionProps = {
  caseStudy: CaseStudyCardMeta;
};

export function NextCaseStudySection({ caseStudy }: NextCaseStudySectionProps) {
  return (
    <PageSection className="next-case-study-section">
      <div className="next-case-study-content">
        <EyebrowLabel className="next-case-study-label">Continue to</EyebrowLabel>
        <a className="next-case-study-link" href={caseStudy.href}>
          <div className="next-case-study-copy">
            <h3 className="next-case-study-title">{caseStudy.title}</h3>
            <EyebrowLabel className="next-case-study-meta">{caseStudy.brand}</EyebrowLabel>
          </div>
          <img className="next-case-study-arrow" src="/icons/small/arrow-right.svg" alt="" aria-hidden="true" />
        </a>
      </div>
    </PageSection>
  );
}
