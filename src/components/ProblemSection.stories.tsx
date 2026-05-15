import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProblemSection } from './ProblemSection';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Problem Section',
  component: ProblemSection,
  args: madeConfigurableProductsAtScale.problem,
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
} satisfies Meta<typeof ProblemSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
