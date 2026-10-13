import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';
import { useLockScroll } from '../hooks/useLockScroll';
import { searchProducts } from '../data/catalog';
import { inr } from '../utils/format';
import ProductImage from './ProductImage';

export default function SearchOverlay() {
  const { ui, openUi, history, setHistory, pushHistory } = useApp();
  const [q, setQ] = useState('');
  const ref = useRef(null);
  const nav = useNavigate();
  const m = useMotion();
  useLockScroll(ui.search);
  const results = useMemo(() => searchProducts(q), [q]);
  const close = () => openUi('search', false);

  useEffect(() => { if (ui.search) setTimeout(() => ref.current?.focus(), 50); else setQ(''); }, [ui.search]);

  const go = (term) => { if (!term.trim()) return; pushHistory(term); close(); nav(`/search?q=${encodeURIComponent(term.trim())}`); };

  return (
    <AnimatePresence>
      {ui.search && (
        <>
          <motion.div key="bd" className="fixed inset-0 z-50 bg-black/40" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div key="p" role="dialog" aria-modal="true" aria-label="Search" onKeyDown={(e) => e.key === 'Escape' && close()}
            className="fixed inset-x-0 top-0 z-50 max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
            initial={{ y: m.enabled ? -60 : 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: m.enabled ? -40 : 0, opacity: 0 }} transition={{ duration: m.enabled ? m.dur * 0.7 : 0, ease: m.ease }}>
            <div className="container-page py-5">
              <form onSubmit={(e) => { e.preventDefault(); go(q); }} className="flex items-center gap-3 border-b-2 border-brand pb-2">
                <Search className="text-brand" size={22} />
                <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cakes, flowers, flavours…" aria-label="Search products" className="flex-1 bg-transparent text-lg outline-none" />
                <button type="button" onClick={close} aria-label="Close search"><X size={24} /></button>
              </form>

              {!q && history.length > 0 && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase text-ink-soft"><span>Recent searches</span><button className="text-brand" onClick={() => setHistory([])}>Clear</button></div>
                  <div className="flex flex-wrap gap-2">{history.map((h) => <button key={h} onClick={() => go(h)} className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm hover:bg-brand-100"><Clock size={13} />{h}</button>)}</div>
                </div>
              )}
              {!q && history.length === 0 && <p className="mt-5 text-sm text-ink-soft">Try “chocolate”, “eggless”, “heart” or “flowers”.</p>}

              {q && (
                <div className="mt-5">
                  {results.length === 0 ? <p className="py-6 text-center text-ink-soft">No matches for “{q}”. Try a different word.</p> : (
                    <>
                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {results.slice(0, 6).map((p) => (
                          <li key={p.slug}>
                            <Link onClick={() => { pushHistory(q); close(); }} to={`/products/${p.slug}`} className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-brand-50">
                              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md"><ProductImage src={p.images[0]} seed={p.slug} /></div>
                              <div className="min-w-0"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-brand">from {inr(p.base)}</p></div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => go(q)} className="btn mt-4">View all {results.length} results</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
