import type { CaseStudy } from './types';

export const experienceLabsCustomisableEcommerceSystem: CaseStudy = {
  slug: 'experience-labs-customisable-ecommerce-system',
  hero: {
    brand: 'Experience Labs',
    brandLinks: [
      { label: 'Live Platform', href: 'https://scoochliving.com' },
      { label: 'Company', href: 'https://www.experience-labs.co.uk/' },
    ],
    title: 'Ecommerce as a System',
    subtitle: 'A multi-brand design system for online retail',
    reveal: {
      beforeSrc: '/xplabs/DesktopPDP-Sedu.png',
      beforeSrcMobile: '/xplabs/MobilePDP-Sedu.png',
      beforeLabel: 'Sedu',
      afterSrc: '/xplabs/DesktopPDP-Scooch.png',
      afterSrcMobile: '/xplabs/MobilePDP-Scooch.png',
      afterLabel: 'Scooch',
    },
  },
  media: {
    items: [
      { src: '/xplabs/MobilePDP-Sedu.png', label: 'Sedu mobile product page', displaySize: 'half' },
      { src: '/xplabs/MobilePDP-Scooch.png', label: 'Scooch mobile product page', displaySize: 'half' },
      { src: '/xplabs/MobilePLP-Sedu.png', label: 'Sedu mobile listing page', displaySize: 'half' },
      { src: '/xplabs/MobilePLP-Scooch.png', label: 'Scooch mobile listing page', displaySize: 'half' },
      { src: '/xplabs/Colors.png', label: 'Colour token system', displaySize: 'full' },
      { src: '/xplabs/Text.png', label: 'Typography token system', displaySize: 'full' },
      { src: '/xplabs/Buttons.png', label: 'Button components', displaySize: 'full' },
      { src: '/xplabs/Inputs.png', label: 'Input components', displaySize: 'full' },
      { src: '/xplabs/Displays.png', label: 'Display components', displaySize: 'full' },
      { src: '/xplabs/Icons.png', label: 'Icon system', displaySize: 'full' },
    ],
  },
  overview: {
    title: 'Overview',
    paragraphs: [
      <>A production-connected ecommerce platform designed to power different brands from the same system.</>,
      <>
        <strong>Orders move directly into the factory queue, with live updates</strong> on materials, production status, and delivery
        shaping what can be sold and when.
      </>,
      <>
        <strong>I defined the product model, design system, and frontend architecture</strong> to make that possible, creating a stable
        foundation where brands could adapt the experience without redesigning the platform each time.
      </>,
    ],
  },
  role: {
    title: 'My Role',
    subtitle: 'Co-founder, Product Design and Engineering',
    points: [
      <>Defined the <strong>product model and system architecture</strong></>,
      <><strong>Designed the full experience</strong> in Figma</>,
      <>Built the frontend in React, HTML, and CSS</>,
      <>Defined the <strong>design system, tokens, and composition rules</strong></>,
      <>Integrated the platform with factory APIs</>,
    ],
  },
  problem: {
    title: 'The Problem',
    beginning: {
      title: 'Goal',
      statement:
        'Build a single product that adapts to different brand identities without redesigning or breaking the experience.',
    },
    middle: [
      {
        title: 'Product scope',
        items: [
          <><strong>One platform powers the customer website, POS, and backend</strong></>,
          <>The same system supports discovery, product pages, checkout, and order management</>,
        ],
      },
      {
        title: 'Production logic',
        items: [
          <>Orders go straight into the factory queue</>,
          <>Stock, materials, and lead times directly define what can be offered to the user</>,
        ],
      },
      {
        title: 'Brand challenge',
        items: [
          <><strong>Each brand needs its own identity</strong></>,
          <>Rebuilding the product for every brand does not scale</>,
        ],
      },
      {
        title: 'Core problem',
        items: [
          <>Too much freedom breaks consistency</>,
          <>Too much structure removes brand expression</>,
          <><strong>The system needs both control and flexibility</strong></>,
        ],
      },
    ],
    end: {
      title: 'System',
      statement:
        'A defined site structure built from predefined components, with data and performance guiding composition and tokens shaping each brand’s experience.',
    },
  },
  keyDecisions: {
    title: 'Key Decisions',
    decisions: [
      {
        title: 'Brand identity',
        impact: 'A small set of variables shapes the brand.',
        paragraphs: [
          <>
            Colour
            <br />
            Typography
            <br />
            Spacing
            <br />
            Border radius
            <br />
            Imagery
          </>,
        ],
      },
      {
        title: 'Structured but flexible',
        impact: 'Components are predefined, but pages are fluid.',
        paragraphs: [
          <>Each component has a fixed structure and behaviour</>,
          <>Components can have multiple layouts</>,
          <>Pages are built by combining and ordering components</>,
          <>Consistency at component level, flexibility at page level</>,
        ],
      },
      {
        title: 'Abstraction layer',
        impact: 'A shared layer connects design decisions to implementation.',
        paragraphs: [
          <>Design teams can work from Figma templates tied to the same system</>,
          <>Brand values flow through the back-end into the live platform</>,
          <>
            Clients without a design team can still customise content and styling through the CMS and admin tools
          </>,
          <>The product changes visually, while structure and behaviour stay consistent</>,
        ],
      },
      {
        title: 'Semantic tokens',
        impact: 'Prevents unreadable combinations and keeps meaning consistent.',
        paragraphs: [
          <>
            Light -&gt; Mid -&gt; Dark scale
            <br />
            Each level has a role
            <br />
            Built-in contrast rules
          </>,
        ],
      },
    ],
  },
  outcome: {
    title: 'Outcome',
    changes: [
      <>Launch new branded experiences without redesigning the product</>,
      <><strong>Keep the UX consistent</strong> while changing visual identity</>,
      <>Adapt pages and content without changing component behaviour</>,
      <><strong>Support continuous optimisation</strong> without rebuilding the site</>,
    ],
  },
};
