import './SiteHeader.css';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell">
        <a className="site-mark" href="/">
          JD
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="https://www.linkedin.com/in/jo%C3%A3o-duarte-7a4a6910/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
