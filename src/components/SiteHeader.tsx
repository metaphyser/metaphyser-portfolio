import './SiteHeader.css';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell">
        <a className="site-mark" href="/">
          JD
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="/">Work</a>
          <a href="/">About</a>
        </nav>
      </div>
    </header>
  );
}
