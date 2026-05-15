import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroIntro } from './HeroIntro';
import { madeConfigurableProductsAtScale } from '../content/caseStudies/made-configurable-products-at-scale';

const meta = {
  title: 'Case Study/Hero Intro',
  component: HeroIntro,
  args: {
    brand: madeConfigurableProductsAtScale.hero.brand,
    title: madeConfigurableProductsAtScale.hero.title,
    subtitle: madeConfigurableProductsAtScale.hero.subtitle,
    meta: madeConfigurableProductsAtScale.hero.meta,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroIntro>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
