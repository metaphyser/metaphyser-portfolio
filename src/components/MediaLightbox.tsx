import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent, type WheelEvent } from 'react';
import { createPortal } from 'react-dom';
import { getMediaKind, type CaseStudyMediaItem } from './mediaUtils';
import './MediaLightbox.css';

type MediaLightboxProps = {
  items: CaseStudyMediaItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function MediaLightbox({ items, activeIndex, onClose, onNavigate }: MediaLightboxProps) {
  const activeItem = items[activeIndex];
  const previousActiveIndexRef = useRef(activeIndex);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef<HTMLDivElement>(null);
  const activeImageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef({
    activePointerId: null as number | null,
    moved: false,
    originX: 0,
    originY: 0,
    startX: 0,
    startY: 0,
  });
  const [isPanViewport, setIsPanViewport] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1099px)').matches : false,
  );
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pendingZoomAlignment, setPendingZoomAlignment] = useState<'left' | 'right' | null>(null);
  const [previewZoomAlignment, setPreviewZoomAlignment] = useState<'left' | 'right' | null>(null);
  const [isSwipeNavigating, setIsSwipeNavigating] = useState(false);
  const [mobileTargetIndex, setMobileTargetIndex] = useState<number | null>(null);
  const [desktopFadeFromIndex, setDesktopFadeFromIndex] = useState<number | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [viewportFrame, setViewportFrame] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    top: 0,
    left: 0,
  }));

  const requestClose = () => {
    setIsClosing(true);
    window.setTimeout(onClose, 180);
  };

  useEffect(() => {
    if (isPanViewport) {
      setDesktopFadeFromIndex(null);
      previousActiveIndexRef.current = activeIndex;
      return;
    }

    const previousIndex = previousActiveIndexRef.current;

    if (previousIndex === activeIndex) {
      return;
    }

    setDesktopFadeFromIndex(previousIndex);
    previousActiveIndexRef.current = activeIndex;

    const timeoutId = window.setTimeout(() => {
      setDesktopFadeFromIndex(null);
    }, 360);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isPanViewport]);

  const resetMediaScroll = () => {
    stageRef.current?.scrollTo({ top: 0, left: 0 });
    activeSlideRef.current?.scrollTo({ top: 0, left: 0 });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose();
      }

      if (event.key === 'ArrowLeft') {
        resetMediaScroll();
        onNavigate(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
      }

      if (event.key === 'ArrowRight') {
        resetMediaScroll();
        onNavigate(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, items.length, onClose, onNavigate]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1099px)');
    const updateMatch = (event: MediaQueryListEvent) => setIsPanViewport(event.matches);

    setIsPanViewport(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateMatch);

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  useEffect(() => {
    const syncViewportFrame = () => {
      const viewport = window.visualViewport;

      setViewportFrame({
        width: viewport?.width ?? window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
        top: viewport?.offsetTop ?? 0,
        left: viewport?.offsetLeft ?? 0,
      });
    };

    syncViewportFrame();

    window.addEventListener('resize', syncViewportFrame);
    window.visualViewport?.addEventListener('resize', syncViewportFrame);
    window.visualViewport?.addEventListener('scroll', syncViewportFrame);

    return () => {
      window.removeEventListener('resize', syncViewportFrame);
      window.visualViewport?.removeEventListener('resize', syncViewportFrame);
      window.visualViewport?.removeEventListener('scroll', syncViewportFrame);
    };
  }, []);

  useLayoutEffect(() => {
    resetMediaScroll();
    setIsDragging(true);
    setSwipeOffset(0);

    if (!isZoomed || !pendingZoomAlignment) {
      setPreviewZoomAlignment(null);
      setPan({ x: 0, y: 0 });
      const resetFrame = window.requestAnimationFrame(() => setIsDragging(false));
      return () => window.cancelAnimationFrame(resetFrame);
    }

    const { maxX } = getPanLimits();

    setPan({
      x: pendingZoomAlignment === 'left' ? maxX : -maxX,
      y: 0,
    });
    setPendingZoomAlignment(null);

    const cleanupFrame = window.requestAnimationFrame(() => {
      setPreviewZoomAlignment(null);
      setIsDragging(false);
    });

    return () => window.cancelAnimationFrame(cleanupFrame);
  }, [activeIndex]);

  useEffect(() => {
    if (!isSwipeNavigating) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSwipeNavigating(false);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isSwipeNavigating]);

  if (!activeItem) {
    return null;
  }

  const kind = getMediaKind(activeItem.src);
  const displaySize = activeItem.displaySize ?? 'full';
  const desktopFadeFromItem =
    desktopFadeFromIndex !== null && !isPanViewport ? items[desktopFadeFromIndex] : null;
  const canPanImage = kind === 'image' && isPanViewport;
  const canSwipeMedia = isPanViewport && items.length > 1;
  const imageStyle = {
    '--media-lightbox-pan-x': `${pan.x}px`,
    '--media-lightbox-pan-y': `${pan.y}px`,
    '--media-lightbox-zoom': isZoomed ? '2' : '1',
  } as CSSProperties;
  const stageStyle = {
    '--media-lightbox-swipe-x': `${swipeOffset}px`,
    '--media-lightbox-track-x': `calc(-100vw + ${swipeOffset}px)`,
  } as CSSProperties;
  const effectiveMobileIndex = mobileTargetIndex ?? activeIndex;
  const mobileTrackStyle = {
    width: `${viewportFrame.width * items.length}px`,
    gridTemplateColumns: `repeat(${items.length}, ${viewportFrame.width}px)`,
    transform: `translate3d(${-(effectiveMobileIndex * viewportFrame.width) + swipeOffset}px, 0, 0)`,
  } as CSSProperties;

  const navigatePrevious = () => {
    resetMediaScroll();
    onNavigate(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  };
  const navigateNext = () => {
    resetMediaScroll();
    onNavigate(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  };

  const handleHitZoneWheel = (event: WheelEvent<HTMLButtonElement>) => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    event.preventDefault();
    stage.scrollBy({
      left: event.deltaX,
      top: event.deltaY,
      behavior: 'auto',
    });
  };

  const completeSwipe = (direction: 'previous' | 'next') => {
    const targetIndex =
      direction === 'previous'
        ? activeIndex === 0
          ? items.length - 1
          : activeIndex - 1
        : activeIndex === items.length - 1
          ? 0
          : activeIndex + 1;

    setIsDragging(false);
    setIsSwipeNavigating(true);
    setSwipeOffset(0);
    setMobileTargetIndex(targetIndex);
    setPendingZoomAlignment(isZoomed ? (direction === 'next' ? 'left' : 'right') : null);

    window.setTimeout(() => {
      setIsDragging(true);
      setMobileTargetIndex(null);
      onNavigate(targetIndex);
    }, 170);
  };

  const getPanLimits = () => {
    const stage = stageRef.current;
    const image = activeImageRef.current;

    if (!stage || !image || !isZoomed) {
      return { maxX: 0, maxY: 0, minY: 0 };
    }

    const stageBounds = stage.getBoundingClientRect();
    const zoom = 2;
    const zoomedWidth = image.offsetWidth * zoom;
    const zoomedHeight = image.offsetHeight * zoom;

    return {
      maxX: Math.max(0, (zoomedWidth - stageBounds.width) / 2),
      maxY: 0,
      minY: -Math.max(0, zoomedHeight - stageBounds.height),
    };
  };

  const clampPan = (nextX: number, nextY: number) => {
    const { maxX, maxY, minY } = getPanLimits();

    return {
      x: Math.min(maxX, Math.max(-maxX, nextX)),
      y: Math.min(maxY, Math.max(minY, nextY)),
    };
  };
  const { maxX: previewMaxX } = getPanLimits();
  const previewImageStyle = {
    '--media-lightbox-pan-x':
      previewZoomAlignment === 'left'
        ? `${previewMaxX}px`
        : previewZoomAlignment === 'right'
          ? `${-previewMaxX}px`
          : '0px',
    '--media-lightbox-pan-y': '0px',
    '--media-lightbox-zoom': isZoomed ? '2' : '1',
  } as CSSProperties;
  const mobileCloseStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 3000,
  } as CSSProperties;
  const mobileControlsStyle = {
    position: 'absolute',
    left: '50%',
    bottom: '1.1rem',
    transform: 'translateX(-50%)',
    zIndex: 3000,
  } as CSSProperties;
  const mobileOverlayStyle = {
    position: 'fixed',
    top: `${viewportFrame.top}px`,
    left: `${viewportFrame.left}px`,
    width: `${viewportFrame.width}px`,
    height: `${viewportFrame.height}px`,
    padding: 0,
    overflow: 'hidden',
  } as CSSProperties;
  const mobileStageStyle = {
    ...stageStyle,
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  } as CSSProperties;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!canPanImage && !canSwipeMedia) {
      return;
    }

    dragRef.current = {
      activePointerId: event.pointerId,
      moved: false,
      originX: pan.x,
      originY: pan.y,
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.activePointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      dragRef.current.moved = true;
    }

    const isHorizontalIntent = canSwipeMedia && Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15;

    if (isZoomed && canPanImage) {
      const nextPan = clampPan(dragRef.current.originX + deltaX, dragRef.current.originY + deltaY);
      const { maxX } = getPanLimits();
      const isDraggingOutwardAtEdge =
        maxX > 0 &&
        ((nextPan.x >= maxX - 1 && deltaX > 0) || (nextPan.x <= -maxX + 1 && deltaX < 0));
      const consumedPanX = nextPan.x - dragRef.current.originX;
      const edgeOverflowX = deltaX - consumedPanX;

      setPan(nextPan);

      if (isHorizontalIntent && isDraggingOutwardAtEdge) {
        const revealedOffset = edgeOverflowX * 1.8;
        setPreviewZoomAlignment(edgeOverflowX < 0 ? 'left' : 'right');
        setSwipeOffset(Math.max(-window.innerWidth * 0.86, Math.min(window.innerWidth * 0.86, revealedOffset)));
      } else {
        setPreviewZoomAlignment(null);
        setSwipeOffset(0);
      }

      return;
    }

    if (isHorizontalIntent) {
      const stageWidth = stageRef.current?.getBoundingClientRect().width ?? window.innerWidth;
      const maxOffset = stageWidth * 0.86;
      setPreviewZoomAlignment(deltaX < 0 ? 'left' : 'right');
      setSwipeOffset(Math.max(-maxOffset, Math.min(maxOffset, deltaX)));
      return;
    }

    if (!canPanImage || !isZoomed) {
      return;
    }

    setPan(clampPan(dragRef.current.originX + deltaX, dragRef.current.originY + deltaY));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.activePointerId !== event.pointerId) {
      return;
    }

    if (!canPanImage && !canSwipeMedia) {
      return;
    }

    dragRef.current.activePointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;
    const baseHorizontalSwipe = canSwipeMedia && Math.abs(deltaX) > 52 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;
    const { maxX } = getPanLimits();
    const isAtZoomEdge =
      !isZoomed ||
      !canPanImage ||
      (maxX > 0 &&
        ((pan.x >= maxX - 1 && deltaX > 0) || (pan.x <= -maxX + 1 && deltaX < 0)));
    const isHorizontalSwipe = baseHorizontalSwipe && isAtZoomEdge;
    const wasTap = Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8 && !dragRef.current.moved;

    if (isHorizontalSwipe) {
      completeSwipe(deltaX > 0 ? 'previous' : 'next');
      return;
    }

    setIsDragging(false);
    setPreviewZoomAlignment(null);
    setSwipeOffset(0);

    if (!wasTap) {
      return;
    }

    if (!canPanImage) {
      return;
    }

    setIsZoomed((currentZoom) => {
      if (currentZoom) {
        setPan({ x: 0, y: 0 });
      }

      return !currentZoom;
    });
  };

  const handlePointerCancel = () => {
    if (dragRef.current.activePointerId === null) {
      return;
    }

    dragRef.current.activePointerId = null;
    dragRef.current.moved = false;
    setIsDragging(false);
    setPreviewZoomAlignment(null);
    setSwipeOffset(0);
  };

  const renderMedia = (item: CaseStudyMediaItem, options?: { preview?: boolean }) => {
    const itemKind = getMediaKind(item.src);

    if (itemKind === 'video') {
      const usePreviewMode = options?.preview || isPanViewport;

      return (
        <video
          key={item.src}
          className={[
            'media-lightbox-video',
            options?.preview ? 'is-preview' : '',
            isPanViewport ? 'is-pan-viewport' : '',
            (item.displaySize ?? 'full') === 'half' ? 'is-half' : 'is-full',
          ]
            .filter(Boolean)
            .join(' ')}
          controls={!usePreviewMode}
          autoPlay
          muted={usePreviewMode}
          loop={usePreviewMode}
          preload="auto"
          playsInline
          src={item.src}
        />
      );
    }

    const image = (
      <img
        ref={!options?.preview ? activeImageRef : undefined}
        className={
          canPanImage && (!options?.preview || isZoomed)
            ? 'media-lightbox-pan-media'
            : undefined
        }
        src={item.src}
        alt={options?.preview ? '' : item.label}
        draggable={false}
        style={
          canPanImage
            ? options?.preview
              ? previewImageStyle
              : imageStyle
            : undefined
        }
      />
    );

    return options?.preview && isZoomed ? <div className="media-lightbox-preview-clip">{image}</div> : image;
  };

  const getSlideClassName = (item: CaseStudyMediaItem, extraClassName?: string) =>
    [
      'media-lightbox-slide',
      `media-lightbox-slide-${getMediaKind(item.src)}`,
      `media-lightbox-slide-size-${item.displaySize ?? 'full'}`,
      extraClassName,
    ]
      .filter(Boolean)
      .join(' ');

  if (isPanViewport) {
    return createPortal(
      <div
        className={['media-lightbox', 'is-pan-viewport', isClosing ? 'is-closing' : ''].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={activeItem.label}
        style={mobileOverlayStyle}
      >
        <button className="media-lightbox-backdrop" type="button" onClick={requestClose} aria-label="Close media viewer" />
        <button
          className="media-lightbox-close media-lightbox-close-mobile"
          type="button"
          onClick={requestClose}
          aria-label="Close media viewer"
          style={mobileCloseStyle}
        >
          <span className="media-lightbox-close-icon" aria-hidden="true" />
        </button>
        <div
          className={[
            'media-lightbox-mobile-stage',
            canPanImage ? 'media-lightbox-stage-pan' : '',
            isZoomed ? 'is-zoomed' : '',
            isDragging ? 'is-dragging' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onLostPointerCapture={handlePointerCancel}
          style={mobileStageStyle}
        >
          <div
            className="media-lightbox-mobile-track"
            style={mobileTrackStyle}
          >
            {items.map((item, index) => (
              <div
                key={`${item.src}|${item.displaySize ?? 'full'}`}
                className={getSlideClassName(
                  item,
                  [
                    index === activeIndex ? 'media-lightbox-slide-active' : 'media-lightbox-slide-preview',
                    'media-lightbox-mobile-slide',
                    index === activeIndex && isSwipeNavigating ? 'media-lightbox-slide-fade-in' : '',
                  ]
                    .filter(Boolean)
                    .join(' '),
                )}
                ref={index === activeIndex ? activeSlideRef : undefined}
                aria-hidden={index !== activeIndex}
              >
                {renderMedia(item, index === activeIndex ? undefined : { preview: true })}
              </div>
            ))}
          </div>
        </div>
        {items.length > 1 ? (
          <div className="media-lightbox-mobile-controls" aria-label="Media navigation" style={mobileControlsStyle}>
            <div className="media-lightbox-mobile-dots" aria-label="Media items">
              {items.map((item, index) => (
                <button
                  className={['media-carousel-tab', index === activeIndex ? 'is-active' : ''].filter(Boolean).join(' ')}
                  type="button"
                  key={`${item.src}|${item.displaySize ?? 'full'}`}
                  onClick={() => onNavigate(index)}
                  aria-pressed={index === activeIndex}
                  aria-label={`Go to media ${index + 1}: ${item.label}`}
                >
                  <span className="media-carousel-dot" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div
      className={['media-lightbox', isClosing ? 'is-closing' : ''].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.label}
    >
      <button className="media-lightbox-backdrop" type="button" onClick={requestClose} aria-label="Close media viewer" />
      <button
        className="media-lightbox-close media-lightbox-close-mobile"
        type="button"
        onClick={requestClose}
        aria-label="Close media viewer"
      >
        <span className="media-lightbox-close-icon" aria-hidden="true" />
      </button>
      <div
        className={[
          'media-lightbox-panel',
          `media-lightbox-panel-${displaySize}`,
          `media-lightbox-panel-${kind}`,
        ].join(' ')}
      >
        <div className="media-lightbox-frame">
          <button
            className="media-lightbox-close media-lightbox-close-desktop"
            type="button"
            onClick={requestClose}
            aria-label="Close media viewer"
          >
            <span className="media-lightbox-close-icon" aria-hidden="true" />
          </button>
          {items.length > 1 ? (
            <div className="media-lightbox-hit-zones" aria-hidden="true">
              <button
                className="media-lightbox-hit-zone media-lightbox-hit-zone-prev"
                type="button"
                onClick={navigatePrevious}
                onWheel={handleHitZoneWheel}
                tabIndex={-1}
              />
              <button
                className="media-lightbox-hit-zone media-lightbox-hit-zone-next"
                type="button"
                onClick={navigateNext}
                onWheel={handleHitZoneWheel}
                tabIndex={-1}
              />
            </div>
          ) : null}
          <div
            className={[
              'media-lightbox-stage',
              kind === 'video' ? 'media-lightbox-stage-video' : '',
              canPanImage ? 'media-lightbox-stage-pan' : '',
              isZoomed ? 'is-zoomed' : '',
              isDragging ? 'is-dragging' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            ref={stageRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onLostPointerCapture={handlePointerCancel}
            style={stageStyle}
          >
            {desktopFadeFromItem ? (
              <div
                className={[
                  'media-lightbox-desktop-fade-slide',
                  'media-lightbox-desktop-fade-slide-outgoing',
                  'media-lightbox-desktop-slide',
                  `media-lightbox-slide-${getMediaKind(desktopFadeFromItem.src)}`,
                  `media-lightbox-slide-size-${desktopFadeFromItem.displaySize ?? 'full'}`,
                  `media-lightbox-desktop-slide-size-${desktopFadeFromItem.displaySize ?? 'full'}`,
                ].join(' ')}
                aria-hidden="true"
              >
                {renderMedia(desktopFadeFromItem, { preview: true })}
              </div>
            ) : null}
            {desktopFadeFromItem ? (
              <div
                className={[
                  'media-lightbox-desktop-fade-slide',
                  'media-lightbox-desktop-fade-slide-incoming',
                  'media-lightbox-desktop-slide',
                  `media-lightbox-slide-${kind}`,
                  `media-lightbox-slide-size-${displaySize}`,
                  `media-lightbox-desktop-slide-size-${displaySize}`,
                ].join(' ')}
              >
                {renderMedia(activeItem)}
              </div>
            ) : (
              <div
                className={[
                  'media-lightbox-desktop-slide',
                  `media-lightbox-slide-${kind}`,
                  `media-lightbox-slide-size-${displaySize}`,
                  `media-lightbox-desktop-slide-size-${displaySize}`,
                ].join(' ')}
              >
                {renderMedia(activeItem)}
              </div>
            )}
          </div>
        </div>

        {items.length > 1 ? (
          <div className="media-lightbox-controls media-carousel-controls" aria-label="Media navigation">
            <button
              className="media-carousel-arrow"
              type="button"
              onClick={navigatePrevious}
              aria-label="Previous media"
            >
              <span className="media-carousel-arrow-icon media-carousel-arrow-icon-prev" aria-hidden="true" />
            </button>
            <div className="media-carousel-nav" aria-label="Media items">
              {items.map((item, index) => (
                <button
                  className={['media-carousel-tab', index === activeIndex ? 'is-active' : ''].filter(Boolean).join(' ')}
                  type="button"
                  key={`${item.src}|${item.displaySize ?? 'full'}`}
                  onClick={() => onNavigate(index)}
                  aria-pressed={index === activeIndex}
                  aria-label={`Go to media ${index + 1}: ${item.label}`}
                >
                  <span className="media-carousel-dot" />
                </button>
              ))}
            </div>
            <button
              className="media-carousel-arrow"
              type="button"
              onClick={navigateNext}
              aria-label="Next media"
            >
              <span className="media-carousel-arrow-icon media-carousel-arrow-icon-next" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
