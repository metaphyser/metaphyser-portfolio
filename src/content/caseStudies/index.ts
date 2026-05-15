import { experienceLabsCustomisableEcommerceSystem } from './experience-labs-customisable-ecommerce-system';
import { madeConfigurableProductsAtScale } from './made-configurable-products-at-scale';
import { productMlMakingMachineLearningUsable } from './product-ml-making-machine-learning-usable';
import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  madeConfigurableProductsAtScale,
  experienceLabsCustomisableEcommerceSystem,
  productMlMakingMachineLearningUsable,
];

export const defaultCaseStudy = madeConfigurableProductsAtScale;

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
