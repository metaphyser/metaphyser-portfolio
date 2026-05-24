import { experienceLabsCustomisableEcommerceSystem } from './experience-labs-customisable-ecommerce-system';
import { madeConfigurableProductsAtScale } from './made-configurable-products-at-scale';
import { productMlMakingMachineLearningUsable } from './product-ml-making-machine-learning-usable';
import type { CaseStudy } from './types';

export type CaseStudyCardMeta = {
  brand: string;
  title: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export const caseStudies: CaseStudy[] = [
  madeConfigurableProductsAtScale,
  experienceLabsCustomisableEcommerceSystem,
  productMlMakingMachineLearningUsable,
];

export const caseStudyCards: CaseStudyCardMeta[] = [
  {
    brand: 'MADE.com',
    title: 'Configurable Products at Scale',
    summary: 'Redesigning PDP & PLP for configuration and product exploration.',
    href: '/case-study/made-configurable-products-at-scale',
    imageSrc: '/made-pdp/thumb-made-configurator.png',
    imageAlt: 'MADE.com case study preview',
  },
  {
    brand: 'Experience Labs',
    title: 'Ecommerce as a System',
    summary: 'A multi-brand design system for online retail.',
    href: '/case-study/experience-labs-customisable-ecommerce-system',
    imageSrc: '/xplabs/thumb-xp-labs.png',
    imageAlt: 'Experience Labs case study thumbnail',
  },
  {
    brand: 'Product ML',
    title: 'Machine Learning for Player Experience',
    summary:
      'A web platform designed for Product Managers and Game Designers to shape the player experience with machine learning.',
    href: '/case-study/product-ml-making-machine-learning-usable',
    imageSrc: '/product-ml/01-Product ML Game Health@2x.jpg',
    imageAlt: 'Product ML case study preview',
  },
];

export const defaultCaseStudy = madeConfigurableProductsAtScale;

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getCaseStudyCardBySlug(slug: string) {
  return caseStudyCards.find((card) => card.href === `/case-study/${slug}`);
}

export function getNextCaseStudyCard(slug: string) {
  const currentHref = `/case-study/${slug}`;
  const currentIndex = caseStudyCards.findIndex((card) => card.href === currentHref);

  if (currentIndex < 0) {
    return null;
  }

  return caseStudyCards[(currentIndex + 1) % caseStudyCards.length];
}
