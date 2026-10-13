import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Grid3x3, SlidersHorizontal, X } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { Stagger, Item } from '../components/Reveal';
import { getCollection, collectionProducts, getVariants } from '../data/catalog';
import { useApp } from '../context/AppContext';
import NotFound from './NotFound';

export const SORTS = [
  ['featured', 'Featured'], ['best', 'Best selling'], ['az', 'Alphabetically, A-Z'], ['za', 'Alphabetically, Z-A'],
  ['low', 'Price, low to high'], ['high', 'Price, high to low'], ['new', 'Date, new to old'], ['old', 'Date, old to new'],
];
export function sortProducts(list, sort) {
  const min = (p) => Math.min(...getVariants(p).sizes.map((s) => s.price));
  const idx = new Map(list.map((p, i) => [p.slug, i]));
  const by = {
    featured: () => 0, best: (a, b) => b.reviews - a.reviews, az: (a, b) => a.name.localeCompare(b.name), za: (a, b) => b.name.localeCompare(a.name),
    low: (a, b) => min(a) - min(b), high: (a, b) => min(b) - min(a), new: (a, b) => idx.get(a.slug) - idx.get(b.slug), old: (a, b) => idx.get(b.slug) - idx.get(a.slug),
  }[sort] || (() => 0);
  return [...list].sort((a, b) => by(a, b) || idx.get(a.slug) - idx.get(b.slug));
}
export const PRICE_BANDS = [['', 'Any price'], ['0-1000', 'Under ₹1,000'], ['1000-1500', '₹1,000 – ₹1,500'], ['1500-2500', '₹1,500 – ₹2,500'], ['2500-99999', '₹2,500 & above']];
const PAGE = 24;

export default function Collection() {
  const { slug, tag } = useParams();
  const col = getCollection(slug);
  const { prefs, setPref } = useApp();
  const [sp, setSp] = useSearchParams();
  const nav = useNavigate();
  const [shown, setShown] = useState(PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const sort = sp.get('sort') || prefs.sort;
  const band = sp.get('price') || '';
  const view = sp.get('view') || prefs.view;

  const base = useMemo(() => (col ? collectionProducts(slug) : []), [slug, col]);
  const list = useMemo(() => {
    let l = base;
    if (tag === 'eggless') l = l.filter((p) => p.eggless);
    if (tag === 'contain-eggs') l = l.filter((p) => !p.eggless);
    if (band) { const [a, b] = band.split('-').map(Number); l = l.filter((p) => { const m = Math.min(...getVariants(p).sizes.map((s) => s.price)); return m >= a && m < b; }); }
    return sortProducts(l, sort);
  }, [base, tag, band, sort]);

  useEffect(() => { setShown(PAGE); }, [slug, tag, band, sort]);
  useEffect(() => { document.title = col ? `${col.title} – Whisked` : 'Whisked'; }, [col]);

  if (!col) return <NotFound />;
  const setParam = (k, v) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }); };
  const typeTo = (t) => `/collections/${slug}${t ? '/' + t : ''}${sp.toString() ? '?' + sp.toString() : ''}`;
  const gridCls = { large: 'grid-cols-2 lg:grid-cols-4', small: 'grid-cols-3 lg:grid-cols-6', list: 'grid-cols-1' }[view] || 'grid-cols-2 lg:grid-cols-4';

  const Filters = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-sans text-sm font-bold uppercase tracking-wide">Types</h3>
        {[['', 'All'], ['eggless', 'Eggless'], ['contain-eggs', 'Contain Eggs']].map(([t, l]) => (
          <button key={l} onClick={() => nav(typeTo(t))} aria-pressed={(tag || '') === t} className={`mr-2 mb-2 rounded-full border px-3 py-1 text-sm transition ${(tag || '') === t ? 'border-brand bg-brand text-white' : 'border-brand-200 hover:border-brand'}`}>{l}</button>
        ))}
        <p className="text-[11px] text-ink-soft">Eggless flags are sample data in this demo.</p>
      </div>
      <div>
        <h3 className="mb-2 font-sans text-sm font-bold uppercase tracking-wide">Price</h3>
        {PRICE_BANDS.map(([v, l]) => (
          <label key={l} className="flex cursor-pointer items-center gap-2 py-1 text-sm"><input type="radio" name="band" checked={band === v} onChange={() => setParam('price', v)} className="accent-brand" />{l}</label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Collections', to: '/collections/view-all' }, { label: col.title }]} />
      <section className="container-page pb-4">
        <h1 className="text-3xl font-bold sm:text-4xl">{col.title}</h1>
        <p className="mt-1 text-sm text-ink-soft" aria-live="polite">{list.length} products</p>
      </section>

      <div className="container-page grid gap-8 pb-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-y border-brand-100 py-3">
            <button className="flex items-center gap-2 text-sm font-semibold lg:hidden" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={16} />Filter</button>
            <label className="flex items-center gap-2 text-sm"><span className="font-medium">Sort</span>
              <select className="field !w-auto py-1.5" value={sort} onChange={(e) => { setParam('sort', e.target.value === 'featured' ? '' : e.target.value); setPref({ sort: e.target.value }); }}>
                {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <div className="flex gap-1" role="group" aria-label="Layout">
              {[['large', LayoutGrid, 'Large'], ['small', Grid3x3, 'Small'], ['list', List, 'List']].map(([v, Icon, l]) => (
                <button key={v} aria-pressed={view === v} aria-label={`${l} grid`} onClick={() => { setPref({ view: v }); setParam('view', ''); }} className={`grid h-9 w-9 place-items-center rounded-md border ${view === v ? 'border-brand bg-brand text-white' : 'border-brand-200 hover:border-brand'}`}><Icon size={16} /></button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <div className="rounded-xl bg-brand-50 py-16 text-center">
              <p className="text-lg font-semibold">No products match these filters.</p>
              <button className="btn mt-4" onClick={() => { setSp({}, { replace: true }); nav(`/collections/${slug}`); }}>Clear filters</button>
            </div>
          ) : (
            <>
              <Stagger key={`${slug}-${tag}-${band}-${sort}-${view}`} className={`grid gap-x-4 gap-y-7 ${gridCls}`}>
                {list.slice(0, shown).map((p) => <Item key={p.slug}><ProductCard p={p} view={view} /></Item>)}
              </Stagger>
              {shown < list.length && <div className="mt-10 text-center"><button className="btn-outline" onClick={() => setShown((s) => s + PAGE)}>Load more ({list.length - shown} left)</button></div>}
            </>
          )}

          <section className="prose-sm-x mt-14 max-w-3xl border-t border-brand-100 pt-8">
            <h2 className="mb-3 text-2xl font-bold">Making every celebration sweeter</h2>
            <p>Ending a celebration on a sweet note has become a tradition. Whisked brings together cakes, cheesecakes, cupcakes and flowers so you can pick something for every occasion – birthdays, anniversaries or just because.</p>
            <p>Browse {col.title.toLowerCase()}, choose a weight and flavour, add a message and save your favourites for later. (This is demo copy; products and prices here are sample data.)</p>
          </section>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-xs overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Filter</h2><button aria-label="Close filters" onClick={() => setFiltersOpen(false)}><X /></button></div>
            {Filters}
            <button className="btn mt-6 w-full" onClick={() => setFiltersOpen(false)}>Show {list.length} products</button>
          </div>
        </div>
      )}
      <p className="sr-only"><Link to="/">Home</Link></p>
    </>
  );
}
