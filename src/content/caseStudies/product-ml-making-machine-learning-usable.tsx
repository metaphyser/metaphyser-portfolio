import type { CaseStudy } from './types';

export const productMlMakingMachineLearningUsable: CaseStudy = {
  slug: 'product-ml-making-machine-learning-usable',
  hero: {
    brand: 'Product ML',
    title: 'Machine Learning for Player Experience',
    subtitle:
      'A web platform designed for Product Managers and Game Designers to shape the player experience with machine learning.',
    videoSrc: '/product-ml/01-Product%20ML%20Game%20Health@2x.jpg',
  },
  media: {
    items: [
      {
        src: '/product-ml/01-Product%20ML%20Game%20Health@2x.jpg',
        label: 'Product ML Game Health',
        displaySize: 'full',
      },
      {
        src: '/product-ml/02-Product%20ML%20Game%20Design%20Copy@2x.jpg',
        label: 'Product ML Game Design',
        displaySize: 'full',
      },
      { src: '/product-ml/03-Product%20ML%20Models@2x.jpg', label: 'Product ML Models', displaySize: 'full' },
      { src: '/product-ml/04-Product%20ML%20Policies@2x.jpg', label: 'Product ML Policies', displaySize: 'full' },
      {
        src: '/product-ml/05-Product%20ML%20Rollout%20Copy@2x.jpg',
        label: 'Product ML Rollout',
        displaySize: 'full',
      },
    ],
  },
  overview: {
    title: 'Overview',
    paragraphs: [
      <>
        Built around levers, models, policies, and rollout, the product gave teams <strong>one place to configure and control how
          machine learning shaped the player experience.</strong>
      </>,
      <>
        The opportunity was clear: <strong>product teams were interested in ML,</strong> but the market offered either highly custom
        solutions or tools too limited to be useful. What was missing was <strong>a platform built around product workflows,</strong> one
        that could help teams configure levers, compare models, define policies, and launch experiments.
      </>,
      <>
        Through research, interviews, and problem framing, <strong>I helped define who the product was for, what it should do,</strong> and how it could become a focused MVP the team could prototype, test, and take to market.
      </>,
    ],
  },
  role: {
    title: 'My Role',
    subtitle: 'Head of Product Design',
    tag: 'Hands-on',
    points: [
      <>Defined the <strong>UX strategy and product direction</strong></>,
      <>Ran <strong>market research and user interviews</strong></>,
      <>Identified the right user profiles for the product</>,
      <>Built <strong>user stories, flows, and MVP scope</strong> with the PM</>,
      <><strong>Designed the product and InVision prototype</strong></>,
      <>Created storyboards for core workflows</>,
      <>Worked closely with development, reviews, and CSS support</>,
    ],
  },
  problem: {
    title: 'The Problem',
    beginning: {
      title: 'Vision',
      statement: 'Enable product teams to shape engagement through player experience.',
    },
    middle: [
      {
        title: 'Discovery',
        items: [
          <>
            <strong>Interviewed different teams across product, design, and development</strong> to understand where ML could actually be
            useful
          </>,
          <>Reviewed existing ML products to understand the gap between highly custom solutions and limited platforms</>,
          <>
            Identified where ML could create real value in games, based on scale, session volume, and gameplay variation
          </>,
        ],
      },
      {
        title: 'Market reality',
        items: [
          <>Product teams were interested in ML, but lacked the knowledge to use it</>,
          <><strong>There was no ML platform focused on product experience</strong></>,
          <>Around 30% of the market had enough sessions for ML to matter</>,
          <>Around 80% of the top 50 grossing games had enough gameplay variation for ML to control meaningful levers</>,
          <>Those levers could include things like difficulty, number of enemies, and win rate</>,
        ],
      },
      {
        title: 'Hypothesis',
        items: [
          <><strong>Fun drives retention.</strong></>,
          <>The win rate that maximises fun changes with user context and activity</>,
          <>ML can determine that win rate and adjust difficulty to improve long-term retention and revenue</>,
        ],
      },
      {
        title: 'Product challenge',
        items: [
          <>ML needed to be translated into clear users, features, and workflows</>,
          <>The platform had to support different actions, model states, and decisions</>,
          <>The experience had to make this complexity <strong>usable for PMs and Game Designers</strong></>,
        ],
      },
    ],
    end: {
      title: 'Platform',
      statement:
        'PMs and Game Designers can configure levers, compare model performance, define policies, and launch experiments from a single interface.',
    },
  },
  keyDecisions: {
    title: 'Key Decisions',
    decisions: [
      {
        title: 'Product team first',
        paragraphs: [
          <>
            The product was shaped around Product Managers and Game Designers, who needed visibility and control over the
            experience.
          </>,
          <>
            Developers mainly needed the API and installation layer, which helped keep the interface focused from the
            start.
          </>,
        ],
      },
      {
        title: 'Learning the ML space',
        paragraphs: [
          <>
            Before designing the product, I needed to understand how machine learning actually worked, what it could do,
            and where it could create value.
          </>,
          <>
            I took an introductory ML course and built enough understanding to make the right product decisions.
          </>,
          <>
            Understanding how ML worked gave me the foundation to define the feature set, the workflows, and the language
            of the product.
          </>,
        ],
      },
      {
        title: 'Desktop first',
        paragraphs: [
          <>User interviews showed Product Managers and Game Designers would mainly use the product on desktop.</>,
          <>
            That environment gave them the space and context to compare models, configure levers, define policies, and
            launch experiments.
          </>,
        ],
      },
      {
        title: 'Clarity before system',
        paragraphs: [
          <>
            The product still had no clear shape. The team had models, back-end work, and a demo game with levers, but
            not a clear view of what the product actually was.
          </>,
          <>
            Instead of starting with a design system, I mapped the main user journeys of the MVP: installing a game,
            creating levers, setting experiments, and defining policies.
          </>,
          <>
            Those flows made the product tangible, clarified scope, and made it easier to explain and sell.
          </>,
        ],
      },
    ],
  },
  outcome: {
    title: 'Outcome',
    groups: [
      {
        title: 'What changed',
        items: [
          <><strong>A clear product direction for machine learning as a tool for product teams</strong></>,
          <>An MVP founders could use to explain, demo, and sell the product</>,
          <><strong>Stronger alignment across product, design, and development</strong> through concrete flows and use cases</>,
          <><strong>Faster development</strong> once the team could see the product, the main journeys, and the scope clearly</>,
          <>A usable interface for configuring levers, comparing models, defining policies, and launching experiments</>,
        ],
      },
      {
        title: 'Aftermath',
        items: [
          <><strong>The product reached MVP stage,</strong> but struggled as a standalone business.</>,
          <>
            The strongest interest came from companies that wanted the team and technology, but were hesitant to share
            the same capability, or the same model training, with competitors.
          </>,
        ],
      },
    ],
  },
};
