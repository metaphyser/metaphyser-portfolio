import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeyDecisionsSection } from './KeyDecisionsSection';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Key Decisions Section',
  component: KeyDecisionsSection,
  args: madeConfigurableProductsAtScale.keyDecisions,
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
} satisfies Meta<typeof KeyDecisionsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
