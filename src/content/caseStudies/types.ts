import type { ReactNode } from 'react';

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudyDecision = {
  title: string;
  paragraphs: ReactNode[];
  impact?: ReactNode;
};

export type CaseStudyProblemGroup = {
  title: string;
  items: ReactNode[];
};

export type CaseStudyOutcomeGroup = {
  title: string;
  items: ReactNode[];
};

export type CaseStudy = {
  slug: string;
  hero: {
    brand: string;
    brandLinks?: Array<{
      label: string;
      href: string;
    }>;
    title: string;
    subtitle?: string;
    meta?: string[];
    videoSrc?: string;
    videoSrcDesktop?: string;
    reveal?: {
      beforeSrc: string;
      beforeSrcMobile?: string;
      beforeLabel: string;
      afterSrc: string;
      afterSrcMobile?: string;
      afterLabel: string;
    };
  };
  impact?: {
    items: CaseStudyMetric[];
  };
  overview: {
    title: string;
    paragraphs: ReactNode[];
  };
  role: {
    title: string;
    subtitle: string;
    tag?: string;
    points: ReactNode[];
  };
  problem: {
    title: string;
    beginning: {
      title: string;
      statement: ReactNode;
    };
    middle: CaseStudyProblemGroup[];
    end: {
      title: string;
      statement: ReactNode;
    };
  };
  executiveBuyIn?: {
    title: string;
    intro?: ReactNode;
    validationItems: ReactNode[];
    result: ReactNode;
    proofItems: ReactNode[];
  };
  media?: {
    items: Array<{
      src: string;
      label: string;
      displaySize?: 'full' | 'half';
    }>;
  };
  keyDecisions: {
    title: string;
    decisions: CaseStudyDecision[];
  };
  outcome: {
    title: string;
    metrics?: CaseStudyMetric[];
    changes?: ReactNode[];
    groups?: CaseStudyOutcomeGroup[];
  };
};
