import manifest from '../media-manifest.json';
import { asset } from '../asset.js';

const srcset = (name, widths, ext) =>
  widths.map((w) => `${asset(`media/opt/${name}-${w}.${ext}`)} ${w}w`).join(', ');

export default function Picture({ name, alt, sizes, priority = false, style, className }) {
  const { widths } = manifest[name];
  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={srcset(name, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, widths, 'webp')} sizes={sizes} />
      <img
        src={asset(`media/${name}.jpg`)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? 'high' : undefined}
        className={className}
        style={style}
      />
    </picture>
  );
}
