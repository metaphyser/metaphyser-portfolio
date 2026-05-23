import './SiteFooter.css';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-shell">
        <div className="site-footer-inner">
          <a className="site-footer-link site-footer-link-email" href="mailto:metaphyser@gmail.com">
            metaphyser@gmail.com
          </a>
          <p className="site-footer-mark">London, UK</p>
        </div>
      </div>
    </footer>
  );
}
