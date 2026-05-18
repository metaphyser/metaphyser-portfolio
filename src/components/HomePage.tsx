import './HomePage.css';
import { BodyText, SectionHeading } from './DocumentPrimitives';
import { PageSection } from './PageSection';

function LinkedInIcon() {
  return (
    <svg className="home-hero-action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5A1.56 1.56 0 1 1 6.93 5.38 1.56 1.56 0 0 1 6.94 8.5Zm1.35 1.23H5.58V18h2.7V9.73Zm4.3 0H9.92V18h2.67v-4.34c0-2.42 3.12-2.62 3.12 0V18h2.68v-5.28c0-4.11-4.68-3.96-5.8-1.94V9.73Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="home-hero-action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.58v-2.04c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.1-.75.09-.73.09-.73 1.2.09 1.84 1.23 1.84 1.23 1.08 1.84 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.31-.53-1.57.12-3.27 0 0 1.01-.32 3.31 1.23a11.5 11.5 0 0 1 6.02 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.7.25 2.96.13 3.27.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

export function HomePage() {
  return (
    <div className="page-shell">
      <article className="document home-document">
        <PageSection className="home-hero-section" spacing="compact">
          <div className="home-hero-shell">
            <SectionHeading className="home-hero-kicker">Hi! I&apos;m JD</SectionHeading>
            <h1 className="hero-title home-hero-title">Product designer.</h1>
            <BodyText className="home-hero-body">
              For 20+ years I&apos;ve worked between design and engineering, using research and data to help teams
              build products around real user needs. I help shape ideas from concept to prototype, test them with users
              early, and turn feedback into better product decisions.
            </BodyText>
            <div className="home-hero-actions" aria-label="Primary">
              <a className="home-hero-action home-hero-action-linkedin" href="https://www.linkedin.com/in/jo%C3%A3o-duarte-7a4a6910/" target="_blank" rel="noreferrer">
                <LinkedInIcon />
                <span className="home-hero-action-label sr-only">LinkedIn</span>
              </a>
              <a className="home-hero-action home-hero-action-github" href="https://github.com/metaphyser" target="_blank" rel="noreferrer">
                <GitHubIcon />
                <span className="home-hero-action-label sr-only">GitHub</span>
              </a>
              <a className="home-hero-action home-hero-action-cv" href="/cv/CV_JD.pdf" target="_blank" rel="noreferrer">
                <span className="home-hero-action-label home-hero-action-label-cv">CV</span>
              </a>
            </div>
          </div>
        </PageSection>
      </article>
    </div>
  );
}
