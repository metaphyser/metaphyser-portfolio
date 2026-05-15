import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroReveal } from './HeroReveal';

const meta = {
  title: 'Case Study/Hero Reveal',
  component: HeroReveal,
  args: {
    beforeSrc: '/xplabs/DesktopPDP-Sedu.png',
    beforeLabel: 'Sedu',
    afterSrc: '/xplabs/DesktopPDP-Scooch.png',
    afterLabel: 'Scooch',
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
