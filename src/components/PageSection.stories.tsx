import { BodyText, SectionHeading } from './DocumentPrimitives';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageSection } from './PageSection';

const meta = {
  title: 'Foundations/Page Section',
  component: PageSection,
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
} satisfies Meta<typeof PageSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SectionHeading>Page Section</SectionHeading>
        <BodyText>Use this wrapper for article sections so spacing and borders are consistent.</BodyText>
      </>
    ),
  },
};
