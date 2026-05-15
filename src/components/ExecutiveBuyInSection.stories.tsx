import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExecutiveBuyInSection } from './ExecutiveBuyInSection';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Executive Buy-In Section',
  component: ExecutiveBuyInSection,
  args: madeConfigurableProductsAtScale.executiveBuyIn,
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
} satisfies Meta<typeof ExecutiveBuyInSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
