import type { ReactNode } from 'react';
import { BodyText, DocumentList, DocumentQuote, EyebrowLabel, SectionHeading } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import { SectionFlow } from './SectionFlow';
import './ExecutiveBuyInSection.css';

type ExecutiveBuyInSectionProps = {
  title: string;
  intro?: ReactNode;
  validationItems: ReactNode[];
  result: ReactNode;
  proofItems: ReactNode[];
};

export function ExecutiveBuyInSection({
  title,
  intro,
  validationItems,
  result,
  proofItems,
}: ExecutiveBuyInSectionProps) {
  return (
    <PageSection className="executive-buy-in-section">
      <SectionHeading>{title}</SectionHeading>
      {intro ? <BodyText>{intro}</BodyText> : null}

      <SectionFlow className="executive-buy-in-flow">
        <SectionFlow className="executive-buy-in-block">
          <EyebrowLabel>Validating the opportunity</EyebrowLabel>
          <DocumentList>
            {validationItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </DocumentList>
        </SectionFlow>

        <SectionFlow className="executive-buy-in-block executive-buy-in-result">
          <EyebrowLabel>Result</EyebrowLabel>
          <DocumentQuote>{result}</DocumentQuote>
        </SectionFlow>

        <SectionFlow className="executive-buy-in-block">
          <EyebrowLabel>What this proved</EyebrowLabel>
          <DocumentList>
            {proofItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </DocumentList>
        </SectionFlow>
      </SectionFlow>
    </PageSection>
  );
}
