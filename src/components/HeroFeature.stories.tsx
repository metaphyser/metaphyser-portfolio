import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroFeature } from './HeroFeature';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Hero Feature',
  component: HeroFeature,
  args: {
    src: madeConfigurableProductsAtScale.hero.videoSrc!,
    srcDesktop: madeConfigurableProductsAtScale.hero.videoSrcDesktop,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroFeature>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
