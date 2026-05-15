import type { Meta, StoryObj } from '@storybook/react-vite';
import { OutcomeSection } from './OutcomeSection';
import { experienceLabsCustomisableEcommerceSystem } from '../content/caseStudies/experience-labs-customisable-ecommerce-system';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Outcome Section',
  component: OutcomeSection,
  args: madeConfigurableProductsAtScale.outcome,
  decorators: [
    (Story) => (
      <main className="page-shell">
        <article className="document">
          <Story />
        </article>
      </main>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OutcomeSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Made: Story = {};

export const ExperienceLabs: Story = {
  args: experienceLabsCustomisableEcommerceSystem.outcome,
};
