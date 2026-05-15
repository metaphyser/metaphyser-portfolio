import type { Meta, StoryObj } from '@storybook/react-vite';
import { experienceLabsCustomisableEcommerceSystem } from '../content/caseStudies/experience-labs-customisable-ecommerce-system';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';
import { productMlMakingMachineLearningUsable } from '../content/caseStudies/product-ml-making-machine-learning-usable';
import { CaseStudyPage } from './CaseStudyPage';

const meta = {
  title: 'Case Study/Case Study Page',
  component: CaseStudyPage,
  args: {
    caseStudy: madeConfigurableProductsAtScale,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CaseStudyPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Made: Story = {};

export const ExperienceLabs: Story = {
  args: {
    caseStudy: experienceLabsCustomisableEcommerceSystem,
  },
};

export const ProductMl: Story = {
  args: {
    caseStudy: productMlMakingMachineLearningUsable,
  },
};
