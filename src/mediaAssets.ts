type ResponsiveImageConfig = {
  widths: number[];
};

type VideoDimensions = {
  width: number;
  height: number;
};

const responsiveImageConfigs: Record<string, ResponsiveImageConfig> = {
  '/made-pdp/thumb-made-configurator.png': { widths: [640, 960, 1440] },
  '/xplabs/thumb-xp-labs.png': { widths: [640, 960, 1440] },
  '/product-ml/01-Product ML Game Health@2x.jpg': { widths: [640, 960, 1440] },
  '/product-ml/02-Product ML Game Design Copy@2x.jpg': { widths: [640, 960, 1440] },
  '/product-ml/03-Product ML Models@2x.jpg': { widths: [640, 960, 1440] },
  '/product-ml/04-Product ML Policies@2x.jpg': { widths: [640, 960, 1440] },
  '/product-ml/05-Product ML Rollout Copy@2x.jpg': { widths: [640, 960, 1440] },
  '/xplabs/DesktopPDP-Sedu.png': { widths: [720, 1080, 1440] },
  '/xplabs/DesktopPDP-Scooch.png': { widths: [720, 1080, 1440] },
  '/xplabs/MobilePDP-Sedu.png': { widths: [375, 750] },
  '/xplabs/MobilePDP-Scooch.png': { widths: [375, 750] },
  '/xplabs/MobilePLP-Sedu.png': { widths: [375, 750] },
  '/xplabs/MobilePLP-Scooch.png': { widths: [375, 750] },
  '/xplabs/Colors.png': { widths: [700, 1100, 1400] },
  '/xplabs/Text.png': { widths: [700, 1100, 1400] },
  '/xplabs/Buttons.png': { widths: [700, 1100, 1400] },
  '/xplabs/Inputs.png': { widths: [700, 1100, 1400] },
  '/xplabs/Displays.png': { widths: [700, 1100, 1400] },
  '/xplabs/Icons.png': { widths: [700, 1100, 1400] },
};

const videoDimensions: Record<string, VideoDimensions> = {
  '/made-pdp/Mobile PDP-mobile.mp4': { width: 706, height: 1256 },
  '/made-pdp/Desktop PDP-tablet.mp4': { width: 1440, height: 710 },
  '/made-pdp/Desktop PDP-desktop.mp4': { width: 1920, height: 946 },
  '/made-pdp/ListingPage Sofa.mp4': { width: 706, height: 1252 },
  '/made-pdp/ProductPage Tubby.mp4': { width: 706, height: 1252 },
};

function withoutExtension(path: string) {
  return path.replace(/\.[^.]+$/, '');
}

export function getResponsiveImageData(src: string) {
  const config = responsiveImageConfigs[src];

  if (!config) {
    return null;
  }

  const stem = withoutExtension(src);

  return {
    webpSrcSet: config.widths
      .map((width) => `${encodeURI(`${stem}-${width}.webp`)} ${width}w`)
      .join(', '),
  };
}

export function getVideoDimensions(src: string) {
  return videoDimensions[src] ?? null;
}
