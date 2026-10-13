import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Heart, Phone, ShieldCheck, Truck, Sparkles, Share2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import Stars from '../components/Stars';
import { Reveal } from '../components/Reveal';
import { QtyControl } from '../components/CartDrawer';
import { collectionProducts, getCollection, getProduct, getVariants } from '../data/catalog';
import { REVIEWS } from '../data/pages';
import { useApp } from '../context/AppContext';
import { QUICK } from '../config';
import { inr, hash } from '../utils/format';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const p = getProduct(slug);
  if (!p) return <NotFound />;
  return <ProductView key={slug} p={p} />;
}

function ProductView({ p }) {
  const { addToCart, favs, toggleFav, pushRecent, recent, drafts, setDrafts, flash } = useApp();
  const v = useMemo(() => getVariants(p), [p]);
  const [size, setSize] = useState(v.sizes[0].label);
  const [flavour, setFlavour] = useState(v.flavours[0] || '');
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState(drafts.productNote?.[p.slug] || '');
  const [date, setDate] = useState(drafts.deliveryDate || '');
  const [img, setImg] = useState(0);
  const price = v.sizes.find((s) => s.label === size)?.price ?? v.sizes[0].price;
  const fav = favs.includes(p.slug);
  const isCake = p.kind === 'cake' || p.kind === 'cheesecake';
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => { pushRecent(p.slug); document.title = `${p.name} – Whisked`; }, [p.slug]); // eslint-disable-line react-hooks/exhaustive-deps
  // Save the cake-message draft + chosen delivery date so they survive a refresh.
  useEffect(() => {
    const t = setTimeout(() => setDrafts((d) => ({ ...d, deliveryDate: date, productNote: { ...(d.productNote || {}), [p.slug]: note } })), 300);
    return () => clearTimeout(t);
  }, [note, date]); // eslint-disable-line react-hooks/exhaustive-deps

  const gallery = p.images.length ? p.images : [null, 'alt'];
  const related = collectionProducts(p.tags.find((t) => t !== 'view-all' && t !== 'all-flavours') || 'view-all').filter((x) => x.slug !== p.slug).slice(0, 5);
  const recents = recent.filter((s) => s !== p.slug).map(getProduct).filter(Boolean).slice(0, 5);
  const col = p.tags.find((t) => getCollection(t));

  const share = async () => {
    const url = window.location.href;
    try { if (navigator.share) await navigator.share({ title: p.name, url }); else { await navigator.clipboard.writeText(url); flash('Link copied'); } } catch { /* cancelled */ }
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, ...(col ? [{ label: getCollection(col).title, to: `/collections/${col}` }] : []), { label: p.name }]} />
      <div className="container-page grid gap-10 pb-12 lg:grid-cols-2">
        <div>
          <div className="img-zoom aspect-square overflow-hidden rounded-2xl bg-brand-50"><ProductImage src={gallery[img] === 'alt' ? null : gallery[img]} seed={gallery[img] === 'alt' ? p.slug + 'b' : p.slug} alt={p.name} eager /></div>
          <div className="mt-3 flex gap-3">
            {gallery.map((g, i) => (
              <button key={i} aria-label={`Show image ${i + 1}`} aria-current={img === i} onClick={() => setImg(i)} className={`h-20 w-20 overflow-hidden rounded-lg ring-2 transition ${img === i ? 'ring-brand' : 'ring-transparent hover:ring-brand-200'}`}>
                <ProductImage src={g === 'alt' ? null : g} seed={g === 'alt' ? p.slug + 'b' : p.slug} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">{p.name}</h1>
          <div className="mt-2 flex items-center gap-2"><Stars value={p.rating} /><span className="text-sm text-ink-soft">{p.rating} · {p.reviews} sample reviews</span></div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
          {p.sample && <p className="mt-2 inline-block rounded bg-amber-50 px-2 py-1 text-xs text-amber-800">Sample product for demonstration.</p>}

          <p className="mt-5 text-3xl font-semibold text-brand">{inr(price)}<span className="ml-2 text-xs font-normal text-ink-soft">Tax included · shipping not calculated in demo</span></p>

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-bold uppercase tracking-wide">{v.sizeName}</legend>
            <div className="flex flex-wrap gap-2">
              {v.sizes.map((s) => (
                <button key={s.label} type="button" aria-pressed={size === s.label} onClick={() => setSize(s.label)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${size === s.label ? 'border-brand bg-brand text-white' : 'border-brand-200 hover:border-brand'}`}>{s.label}</button>
              ))}
            </div>
          </fieldset>

          {v.flavours.length > 0 && (
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold uppercase tracking-wide">Flavour</span>
              <select className="field" value={flavour} onChange={(e) => setFlavour(e.target.value)}>{v.flavours.map((f) => <option key={f}>{f}</option>)}</select>
            </label>
          )}

          {isCake && (
            <>
              <label className="mt-5 block"><span className="mb-1 block text-sm font-bold uppercase tracking-wide">Message on cake</span>
                <input className="field" maxLength={40} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Happy Birthday!" /></label>
              <label className="mt-4 block"><span className="mb-1 block text-sm font-bold uppercase tracking-wide">Preferred delivery date</span>
                <input type="date" min={today} className="field" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            </>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyControl qty={qty} onChange={(q) => setQty(Math.max(1, Math.min(q, 20)))} />
            <button className="btn flex-1 sm:flex-none sm:px-12" onClick={() => addToCart(p.slug, { size, flavour, note: note.trim(), qty })}>Add to cart</button>
            <button onClick={() => toggleFav(p.slug)} aria-pressed={fav} aria-label={fav ? 'Remove from favourites' : 'Save to favourites'} className="grid h-12 w-12 place-items-center rounded-full border border-brand-200 text-brand transition hover:bg-brand-50"><Heart className={fav ? 'fill-brand' : ''} /></button>
            <button onClick={share} aria-label="Share" className="grid h-12 w-12 place-items-center rounded-full border border-brand-200 text-brand transition hover:bg-brand-50"><Share2 size={18} /></button>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-brand-50 p-4 text-sm"><Phone size={20} className="shrink-0 text-brand" />For Xpress Delivery, call on <a className="font-semibold text-brand" href={`tel:${QUICK.contact.phone.replace(/\s/g, '')}`}>{QUICK.contact.phone}</a></div>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            {[[Sparkles, 'Hygienically made'], [ShieldCheck, 'Secure payments (demo)'], [Truck, 'Shipping all over (demo)']].map(([I, t]) => <li key={t} className="flex items-center gap-2 text-ink-soft"><I size={16} className="text-brand" />{t}</li>)}
          </ul>
        </div>
      </div>

      <section className="container-page border-t border-brand-100 py-10">
        <h2 className="mb-1 text-2xl font-bold">Reviews</h2>
        <p className="mb-5 text-xs text-ink-soft">Sample reviews for demonstration – not from real customers.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => { const r = REVIEWS[(hash(p.slug) + i) % REVIEWS.length]; return (
            <Reveal key={i}><figure className="rounded-xl border border-brand-100 p-4"><Stars value={r[1]} /><p className="mt-2 text-sm">{r[2]}</p><figcaption className="mt-2 flex items-center gap-1 text-xs font-semibold text-brand"><Check size={12} />{r[0]}</figcaption></figure></Reveal>
          ); })}
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page py-10"><h2 className="mb-5 text-2xl font-bold">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>
      )}
      {recents.length > 0 && (
        <section className="container-page py-6"><h2 className="mb-5 text-2xl font-bold">Recently viewed</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{recents.map((r) => <ProductCard key={r.slug} p={r} />)}</div></section>
      )}
      <p className="sr-only"><Link to="/">Home</Link></p>
    </>
  );
}
