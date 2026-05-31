import { forwardRef, type ImgHTMLAttributes } from 'react';
import { getResponsiveImageData } from '../mediaAssets';

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  sizes?: string;
  pictureClassName?: string;
};

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(function ResponsiveImage(
  { src, sizes, pictureClassName, ...imgProps },
  ref,
) {
  const asset = getResponsiveImageData(src);
  const image = <img ref={ref} src={src} sizes={sizes} {...imgProps} />;

  if (!asset?.webpSrcSet) {
    return image;
  }

  return (
    <picture className={pictureClassName} style={{ display: 'block' }}>
      <source type="image/webp" srcSet={asset.webpSrcSet} sizes={sizes} />
      {image}
    </picture>
  );
});
