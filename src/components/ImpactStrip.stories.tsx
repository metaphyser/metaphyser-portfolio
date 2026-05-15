import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImpactStrip } from './ImpactStrip';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Impact Strip',
  component: ImpactStrip,
  args: madeConfigurableProductsAtScale.impact,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ImpactStrip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
