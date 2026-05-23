import { CaseStudyPage } from './components/CaseStudyPage';
import { HomePage } from './components/HomePage';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { getCaseStudyBySlug } from './content/caseStudies';

function resolveCaseStudyFromPath(pathname: string) {
  if (pathname === '/case-study' || pathname === '/case-study/') {
    return getCaseStudyBySlug('made-configurable-products-at-scale') ?? null;
  }

  const match = pathname.match(/^\/case-study\/([^/]+)\/?$/);
  if (!match) {
    return null;
  }

  return getCaseStudyBySlug(match[1]) ?? null;
}

function App() {
  const isHomePage = window.location.pathname === '/';
  const caseStudy = resolveCaseStudyFromPath(window.location.pathname);

  return (
    <main>
      <SiteHeader />
      {isHomePage ? (
        <HomePage />
      ) : caseStudy ? (
        <CaseStudyPage caseStudy={caseStudy} />
      ) : (
        <div className="page-shell">
          <article className="document">
            <section className="page-section">
              <h1 className="document-section-heading">Not Found</h1>
              <p className="document-body">This case study route does not exist.</p>
            </section>
          </article>
        </div>
      )}
      <SiteFooter />
    </main>
  );
}

export default App;
