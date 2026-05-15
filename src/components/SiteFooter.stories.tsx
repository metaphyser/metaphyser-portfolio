import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from './SiteFooter';

const meta = {
  title: 'Shell/Site Footer',
  component: SiteFooter,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
