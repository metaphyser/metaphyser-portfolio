import type { CaseStudy } from './types';

const impactItems = [
  { value: '+13%', label: 'Conversion' },
  { value: '+22%', label: 'Revenue' },
  { value: '+8%', label: 'AOV' },
];

export const madeConfigurableProductsAtScale: CaseStudy = {
  slug: 'made-configurable-products-at-scale',
  hero: {
    brand: 'MADE.com',
    title: 'Configurable Products at Scale',
    subtitle: 'Redesigning PDP & PLP to support configuration and product exploration',
    videoSrc: '/made-pdp/Mobile%20PDP.mp4',
    videoSrcDesktop: '/made-pdp/Desktop%20PDP.mp4',
  },
  impact: {
    items: impactItems,
  },
  overview: {
    title: 'Overview',
    paragraphs: [
      <>
        At MADE.com, <strong>customers purchase high-consideration products with over 100 possible variations</strong>,
        yet the product experience did not allow them to configure options effectively.
      </>,
      <>
        I led the <strong>redesign of the product configuration experience</strong>, transforming it from a fragmented
        feature into a scalable system integrated across the product journey.
      </>,
    ],
  },
  role: {
    title: 'My Role',
    subtitle: 'Head of Product Design',
    tag: 'Hands-on',
    points: [
      <>Defined <strong>UX strategy</strong> for product configuration</>,
      <>Led <strong>design direction</strong> and <strong>key product decisions</strong></>,
      <>Facilitated discovery through user interviews and hypothesis workshops</>,
      <>Collaborated closely with <strong>Product, Engineering, and Leadership</strong></>,
      <>Personally shaped core interaction patterns and system behaviour</>,
    ],
  },
  problem: {
    title: 'The Problem',
    beginning: {
      title: 'Initial brief',
      statement: 'Design a new experience for a sofa collection with configurable legs.',
    },
    middle: [
      {
        title: 'Complexity',
        items: [
          <><strong>100+ variations per product</strong></>,
          <><strong>Long-consideration purchase behaviour</strong> across multiple sessions and devices</>,
          <>Need to prevent invalid combinations</>,
        ],
      },
      {
        title: 'Discovery',
        items: [
          <>Conducted ~15 in-person user interviews in showrooms</>,
          <>Analysed product page and listing page behaviour (analytics + session patterns)</>,
          <>Reviewed competitor approaches to configuration and common failure modes</>,
          <>Facilitated a hypothesis workshop to define user stories, flows, and a validation plan</>,
        ],
      },
      {
        title: 'Key Insights',
        items: [
          <><strong>Users could not configure products effectively on the product page</strong></>,
          <><strong>Listing and product pages did not support exploration or comparison</strong></>,
          <>Variation logic for size, colour, and stock was not reflected in the UI</>,
          <>
            Discovery across collections was limited, making it harder to find related or complementary
            products
          </>,
          <>Competitors allowed invalid combinations, creating frustration</>,
        ],
      },
    ],
    end: {
      title: 'Reframe',
      statement:
        'PDP and PLP were not designed to support product exploration, comparison, and configuration at scale.',
    },
  },
  executiveBuyIn: {
    title: 'Executive Buy-in',
    validationItems: [
      <><strong>Created a quick test using Google Optimize</strong> on a high-traffic bestseller collection</>,
      <><strong>Exposed product size directly above colour options</strong> to test behaviour</>,
      <>Focused on a simple, high-impact change rather than a full redesign</>,
    ],
    result: <>~1/3 of users who changed colour also changed size</>,
    proofItems: [
      <>Demonstrated that <strong>users explore multiple attributes together</strong></>,
      <>Highlighted a gap in how the current experience supported product configuration</>,
      <><strong>Provided clear evidence to CEO, CTO and stakeholders</strong></>,
      <>Secured approval for a broader PDP &amp; PLP redesign</>,
    ],
  },
  media: {
    items: [
      { src: '/made-pdp/ListingPage%20Sofa.mp4', label: 'Listing Page Sofa', displaySize: 'half' },
      { src: '/made-pdp/ProductPage%20Tubby.mp4', label: 'Product Page Tubby', displaySize: 'half' },
    ],
  },
  keyDecisions: {
    title: 'Key Decisions',
    decisions: [
      {
        title: 'Mental models',
        paragraphs: [
          <>UI patterns matched how users think, not how the system is structured.</>,
          <>
            Size -&gt; dimensions (ordered)
            <br />
            Colour -&gt; visual
            <br />
            Structure -&gt; descriptive
          </>,
        ],
        impact: 'Faster understanding and decision-making.',
      },
      {
        title: 'Structure over exposure',
        paragraphs: [
          <>Show the right options at each step, organised by category.</>,
          <>Surface the most relevant choices first, with deeper options available.</>,
        ],
        impact: 'Reduced cognitive load without limiting flexibility.',
      },
      {
        title: 'Placement',
        paragraphs: [
          <>Place configuration where attention is.</>,
          <>
            Moved the configurator next to the product image; users engaged immediately and scrolled more to explore
            options.
          </>,
        ],
        impact: 'Better evaluation without hurting conversion.',
      },
    ],
  },
  outcome: {
    title: 'Outcome',
    metrics: impactItems,
    changes: [
      <>
        <strong>Users explored more product variations</strong> before committing, increasing confidence in their choices
      </>,
      <>
        Ability to change size directly on PDP and PLP led to <strong>more purchases within the same collection</strong>
      </>,
      <>
        Improved discovery across collections made it <strong>easier to find related and complementary products</strong>
      </>,
      <><strong>Increased visibility of related products</strong> drove complementary purchases</>,
      <>
        <strong>Users scrolled more to evaluate configuration options</strong>, improving engagement and decision-making
      </>,
      <>
        <strong>Long-term adoption across rebrands</strong>, with the configurator remaining close to its original
        implementation
      </>,
    ],
  },
};
