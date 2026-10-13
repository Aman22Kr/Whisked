import { useState } from 'react';
import CakeArt from './CakeArt';

// Shows a real photo when we have one; falls back to the SVG illustration if it is missing or fails to load.
export default function ProductImage({ src, seed, palette, alt = '', className = 'h-full w-full object-cover', eager = false }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <CakeArt seed={seed} palette={palette} className={className} />;
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} className={className} />;
}
