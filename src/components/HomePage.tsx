import './HomePage.css';
import { BodyText, EyebrowLabel, SectionHeading } from './DocumentPrimitives';
import { PageSection } from './PageSection';
import { caseStudyCards as featuredWork } from '../content/caseStudies';

export function HomePage() {
  return (
    <div className="page-shell">
      <article className="document home-document">
        <PageSection className="home-hero-section" spacing="compact">
          <div className="home-two-column">
            <div className="home-hero-shell">
              <div className="home-hero-top">
                <div className="home-hero-heading">
                  <p className="home-hero-intro">Hi</p>
                  <h1 className="hero-title home-hero-kicker">I&apos;m JD</h1>
                  <p className="home-hero-title">Product Designer</p>
                </div>
              </div>
              <BodyText className="home-hero-body">
                For 20+ years I&apos;ve worked between design and engineering, using research and data to help teams
                build products around real user needs. I help shape ideas from concept to prototype, test them with
                users early, and turn feedback into better product decisions.
              </BodyText>
              <div className="home-hero-actions" aria-label="Contact links">
                <a className="home-hero-action" href="mailto:metaphyser@gmail.com">
                  <img className="home-hero-action-icon" src="/icons/small/email.svg" alt="" aria-hidden="true" />
                  <span className="home-hero-action-label sr-only">Email</span>
                </a>
                <a className="home-hero-action home-hero-action-cv" href="/cv/CV_JD.pdf" target="_blank" rel="noreferrer">
                  <img className="home-hero-action-icon" src="/icons/small/cv.svg" alt="" aria-hidden="true" />
                  <span className="home-hero-action-label sr-only">CV</span>
                </a>
                <a className="home-hero-action" href="https://www.linkedin.com/in/jo%C3%A3o-duarte-7a4a6910/" target="_blank" rel="noreferrer">
                  <img className="home-hero-action-icon" src="/icons/small/linkedin.svg" alt="" aria-hidden="true" />
                  <span className="home-hero-action-label sr-only">LinkedIn</span>
                </a>
                <a className="home-hero-action" href="https://github.com/metaphyser" target="_blank" rel="noreferrer">
                  <img className="home-hero-action-icon" src="/icons/small/github.svg" alt="" aria-hidden="true" />
                  <span className="home-hero-action-label sr-only">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection className="home-work-section">
          <SectionHeading>Featured work</SectionHeading>
          <div className="home-work-list">
            {featuredWork.map((project) => (
              <article
                className={[
                  'home-work-card',
                  project.brand === 'MADE.com'
                    ? 'home-work-card-made'
                    : project.brand === 'Experience Labs'
                      ? 'home-work-card-xplabs'
                      : 'home-work-card-product-ml',
                ].join(' ')}
                key={project.href}
              >
                <a className="home-work-card-link" href={project.href}>
                  <div className="home-work-card-media">
                    <img className="home-work-card-image" src={project.imageSrc} alt={project.imageAlt} />
                  </div>
                  <div className="home-work-card-copy">
                    <h3 className="home-work-card-title">{project.title}</h3>
                    <EyebrowLabel className="home-work-card-meta">{project.brand}</EyebrowLabel>
                    <BodyText className="home-work-card-body">{project.summary}</BodyText>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </PageSection>
      </article>
    </div>
  );
}
