import type { Meta, StoryObj } from '@storybook/react-vite';
import { OverviewSection } from './OverviewSection';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Overview Section',
  component: OverviewSection,
  args: madeConfigurableProductsAtScale.overview,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OverviewSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
