import type { Meta, StoryObj } from '@storybook/react-vite';
import { MediaCarousel } from './MediaCarousel';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Media Carousel',
  component: MediaCarousel,
  args: {
    items: madeConfigurableProductsAtScale.media!.items,
    breakout: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MediaCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
