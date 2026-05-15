import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from './SiteHeader';

const meta = {
  title: 'Shell/Site Header',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
