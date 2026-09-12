import { resolveAssetPath } from '../utils/assets';

const getVariantPath = (src, width) => src.replace(/(\.[^.]+)$/, `-${width}$1`);

const ResponsiveImage = ({
  src,
  alt = '',
  width,
  height,
  sizes = '100vw',
  full = false,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const variantWidths = full ? [1280, 1920] : [640, 1280];
  const fallbackWidth = full ? 1920 : 1280;
  const srcSet = variantWidths
    .map((variantWidth) => `${resolveAssetPath(getVariantPath(src, variantWidth))} ${variantWidth}w`)
    .join(', ');

  return (
    <img
      src={resolveAssetPath(getVariantPath(src, fallbackWidth))}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
};

export default ResponsiveImage;
