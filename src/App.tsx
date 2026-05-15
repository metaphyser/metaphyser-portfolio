import { CaseStudyPage } from './components/CaseStudyPage';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { defaultCaseStudy, getCaseStudyBySlug } from './content/caseStudies';

function resolveCaseStudyFromPath(pathname: string) {
  if (pathname === '/' || pathname === '/case-study' || pathname === '/case-study/') {
    return defaultCaseStudy;
  }

  const match = pathname.match(/^\/case-study\/([^/]+)\/?$/);
  if (!match) {
    return null;
  }

  return getCaseStudyBySlug(match[1]) ?? null;
}

function App() {
  const caseStudy = resolveCaseStudyFromPath(window.location.pathname);

  return (
    <main>
      <SiteHeader />
      {caseStudy ? (
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
