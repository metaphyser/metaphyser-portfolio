import type { Meta, StoryObj } from '@storybook/react-vite';
import { RoleSection } from './RoleSection';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Role Section',
  component: RoleSection,
  args: madeConfigurableProductsAtScale.role,
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
} satisfies Meta<typeof RoleSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
