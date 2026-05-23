import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import './SiteHeader.css';

const caseStudies = [
  {
    brand: 'MADE.com',
    title: 'Configurable Products at Scale',
    href: '/case-study/made-configurable-products-at-scale',
    imageSrc: '/made-pdp/thumb-made-configurator.png',
    imageAlt: 'MADE.com case study thumbnail',
  },
  {
    brand: 'Experience Labs',
    title: 'Ecommerce as a System',
    href: '/case-study/experience-labs-customisable-ecommerce-system',
    imageSrc: '/xplabs/thumb-xp-labs.png',
    imageAlt: 'Experience Labs case study thumbnail',
  },
  {
    brand: 'Product ML',
    title: 'Machine Learning for Player Experience',
    href: '/case-study/product-ml-making-machine-learning-usable',
    imageSrc: '/product-ml/01-Product ML Game Health@2x.jpg',
    imageAlt: 'Product ML case study thumbnail',
  },
];

export function SiteHeader() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const menuId = useId();
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  useEffect(() => {
    if (!isWorkOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWorkOpen(false);
      }
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isWorkOpen]);

  const overlay = createPortal(
    <>
      <div
        className={['site-nav-drawer-backdrop', isWorkOpen ? 'is-open' : ''].filter(Boolean).join(' ')}
        onClick={() => {
          setIsWorkOpen(false);
        }}
      />
      <aside
        className={['site-nav-drawer', isWorkOpen ? 'is-open' : ''].filter(Boolean).join(' ')}
        id={menuId}
        aria-label="Work"
        aria-hidden={!isWorkOpen}
      >
        <div className="site-nav-drawer-header">
          <p className="site-nav-drawer-title document-section-heading">Work</p>
          <button
            className="site-nav-drawer-close"
            type="button"
            aria-label="Close work menu"
            onClick={() => {
              setIsWorkOpen(false);
            }}
          >
            <span className="site-nav-drawer-close-icon" aria-hidden="true" />
          </button>
        </div>
        <div className="site-nav-menu" role="menu" aria-label="Case studies">
          {caseStudies.map((study) => {
            const studyPath = study.href.replace(/\/$/, '');
            const isCurrent = currentPath === studyPath;

            const cardContent = (
              <>
                <span className="site-nav-card-media">
                  <img className="site-nav-card-image" src={study.imageSrc} alt={study.imageAlt} />
                  {isCurrent ? <span className="site-nav-card-status" aria-hidden="true" /> : null}
                </span>
                <span className="site-nav-card-copy">
                  <span className="site-nav-card-title">{study.title}</span>
                  <span className="site-nav-card-brand">{study.brand}</span>
                </span>
              </>
            );

            if (isCurrent) {
              return (
                <div
                  className="site-nav-card site-nav-card-current"
                  key={study.href}
                  role="menuitem"
                  aria-current="page"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <a
                className="site-nav-card"
                href={study.href}
                key={study.href}
                role="menuitem"
                onClick={() => {
                  setIsWorkOpen(false);
                }}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </aside>
    </>,
    document.body,
  );

  return (
    <>
      <header className="site-header">
        <div className="site-header-shell">
          <div className="site-header-inner">
            <a className="site-mark" href="/">
              <span className="show-mobile-only">mtph</span>
              <span className="show-tablet-up">metaphyser</span>
            </a>
            <nav className="site-nav" aria-label="Primary">
              <button className="site-nav-item site-nav-trigger" type="button" onClick={() => { window.location.href = '/'; }}>
                About
              </button>
              <span className="site-nav-separator" aria-hidden="true">•</span>
              <div className="site-nav-disclosure">
                <button
                  className="site-nav-item site-nav-trigger"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={isWorkOpen}
                  aria-controls={menuId}
                  onClick={() => {
                    setIsWorkOpen(true);
                  }}
                >
                  Work
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {overlay}
    </>
  );
}
