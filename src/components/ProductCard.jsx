import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getVariants } from '../data/catalog';
import { inr } from '../utils/format';
import ProductImage from './ProductImage';
import Stars from './Stars';

export default function ProductCard({ p, view = 'large' }) {
  const { favs, toggleFav } = useApp();
  const fav = favs.includes(p.slug);
  const prices = getVariants(p).sizes.map((s) => s.price);
  const multi = prices.length > 1;
  const list = view === 'list';
  return (
    <article className={`group hover-lift relative overflow-hidden rounded-xl bg-white ${list ? 'flex gap-4' : ''}`}>
      <Link to={`/products/${p.slug}`} className={`img-zoom block overflow-hidden rounded-xl bg-brand-50 ${list ? 'aspect-square w-32 shrink-0 sm:w-44' : 'aspect-square'}`}>
        <ProductImage src={p.images[0]} seed={p.slug} alt={p.name} />
      </Link>
      <button onClick={() => toggleFav(p.slug)} aria-pressed={fav} aria-label={fav ? `Remove ${p.name} from favourites` : `Save ${p.name} to favourites`}
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand shadow transition hover:scale-110">
        <Heart size={16} className={fav ? 'fill-brand' : ''} />
      </button>
      <div className={`px-1 pb-3 pt-3 ${list ? 'flex flex-1 flex-col justify-center' : 'text-center'}`}>
        <Link to={`/products/${p.slug}`} className="line-clamp-2 text-sm font-medium leading-snug hover:text-brand sm:text-[15px]">{p.name}</Link>
        <div className={`mt-1 flex items-center gap-2 ${list ? '' : 'justify-center'}`}><Stars value={p.rating} size={12} /><span className="text-[11px] text-ink-soft">({p.reviews})</span></div>
        <p className="mt-1 text-sm font-semibold text-brand">{multi ? 'from ' : ''}{inr(Math.min(...prices))}</p>
        {list && <p className="mt-2 hidden text-sm text-ink-soft sm:block">{p.desc}</p>}
      </div>
    </article>
  );
}
