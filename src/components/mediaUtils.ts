export type CaseStudyMediaItem = {
  src: string;
  srcTablet?: string;
  srcDesktop?: string;
  label: string;
  displaySize?: 'full' | 'half';
};

export type MediaViewport = 'mobile' | 'tablet' | 'desktop';

export function resolveMediaSrc(item: CaseStudyMediaItem, viewport: MediaViewport) {
  if (viewport === 'desktop' && item.srcDesktop) {
    return item.srcDesktop;
  }

  if ((viewport === 'desktop' || viewport === 'tablet') && item.srcTablet) {
    return item.srcTablet;
  }

  return item.src;
}

export function getMediaKind(src: string) {
  return /\.(mov|mp4|webm|ogg)$/i.test(src) ? 'video' : 'image';
}

export function getVideoType(src: string) {
  if (/\.mov$/i.test(src)) {
    return 'video/quicktime';
  }

  if (/\.webm$/i.test(src)) {
    return 'video/webm';
  }

  if (/\.ogg$/i.test(src)) {
    return 'video/ogg';
  }

  return 'video/mp4';
}

export function uniqueMediaItems(items: CaseStudyMediaItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = `${item.src}|${item.srcTablet ?? ''}|${item.srcDesktop ?? ''}|${item.displaySize ?? 'full'}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
