import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { Stagger, Item } from '../components/Reveal';
import { searchProducts } from '../data/catalog';
import { useApp } from '../context/AppContext';
import { SORTS, sortProducts } from './Collection';

const GROUPS = [['all', 'All'], ['cake', 'Cakes'], ['cheesecake', 'Cheesecakes'], ['other', 'Cupcakes & more'], ['flowers', 'Flowers & candles']];
const inGroup = (p, g) => g === 'all' || (g === 'flowers' ? p.tags.includes('flowers') : g === 'other' ? (p.kind === 'box' || p.kind === 'single') && !p.tags.includes('flowers') : p.kind === g);

export default function SearchPage() {
  const [sp, setSp] = useSearchParams();
  const { pushHistory, history } = useApp();
  const q = sp.get('q') || '';
  const group = sp.get('type') || 'all';
  const sort = sp.get('sort') || 'featured';
  const eggless = sp.get('eggless') === '1';
  const [text, setText] = useState(q);
  useEffect(() => setText(q), [q]);
  useEffect(() => { document.title = q ? `Search: ${q} – Whisked` : 'Search – Whisked'; if (q) pushHistory(q); }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  const all = useMemo(() => searchProducts(q), [q]);
  const list = useMemo(() => sortProducts(all.filter((p) => inGroup(p, group) && (!eggless || p.eggless)), sort), [all, group, sort, eggless]);
  const set = (k, v) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }); };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <section className="container-page pb-10">
        <h1 className="text-3xl font-bold">Search</h1>
        <form onSubmit={(e) => { e.preventDefault(); set('q', text.trim()); }} className="mt-4 flex max-w-xl gap-2" role="search">
          <input className="field" value={text} onChange={(e) => setText(e.target.value)} placeholder="Search cakes, flowers, flavours…" aria-label="Search" />
          <button className="btn !px-5" aria-label="Search"><Search size={18} /></button>
        </form>

        {!q ? (
          <div className="mt-8">
            <p className="text-ink-soft">Type something to search the catalogue.</p>
            {history.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{history.map((h) => <button key={h} onClick={() => set('q', h)} className="rounded-full bg-brand-50 px-3 py-1.5 text-sm hover:bg-brand-100">{h}</button>)}</div>}
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-brand-100 py-3 text-sm">
              <span className="font-medium" aria-live="polite">{list.length} result{list.length === 1 ? '' : 's'} for “{q}”</span>
              <div className="flex flex-wrap gap-2">{GROUPS.map(([v, l]) => <button key={v} aria-pressed={group === v} onClick={() => set('type', v === 'all' ? '' : v)} className={`rounded-full border px-3 py-1 ${group === v ? 'border-brand bg-brand text-white' : 'border-brand-200 hover:border-brand'}`}>{l}</button>)}</div>
              <label className="flex items-center gap-1.5"><input type="checkbox" className="accent-brand" checked={eggless} onChange={(e) => set('eggless', e.target.checked ? '1' : '')} />Eggless</label>
              <select aria-label="Sort" className="field !w-auto py-1.5 sm:ml-auto" value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)}>{SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
            </div>
            {list.length === 0 ? (
              <div className="mt-8 rounded-xl bg-brand-50 p-10 text-center">
                <p className="text-lg font-semibold">No results found.</p>
                <p className="mt-1 text-sm text-ink-soft">Check the spelling, remove filters, or browse a collection.</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">{[['Birthday cakes', 'birthday'], ['Chocolate', 'chocolate-cakes'], ['Flowers', 'flowers']].map(([l, s]) => <Link key={s} to={`/collections/${s}`} className="btn-outline !px-4 !py-2">{l}</Link>)}</div>
              </div>
            ) : (
              <Stagger key={`${q}${group}${sort}${eggless}`} className="mt-6 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-5">
                {list.slice(0, 60).map((p) => <Item key={p.slug}><ProductCard p={p} /></Item>)}
              </Stagger>
            )}
          </>
        )}
      </section>
    </>
  );
}
