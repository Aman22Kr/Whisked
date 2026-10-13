import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Cake, Sparkles, Star, Truck } from 'lucide-react';
import { Reveal, Stagger, Item } from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import CakeArt from '../components/CakeArt';
import Stars from '../components/Stars';
import { COLLECTIONS, FLAVOUR_TILES, IMG, OTHER_TILES, PRODUCTS, collectionProducts, getProduct } from '../data/catalog';
import { REVIEWS } from '../data/pages';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';
import { QUICK } from '../config';

const SLIDES = [
  { img: IMG.heroCustom, to: '/products/designer-cake', title: 'Design your own cake', sub: 'Tell us the theme, flavour and size – we’ll make it yours.', cta: 'Customise now', palette: 'pink' },
  { img: IMG.heroPretty, to: '/collections/pretty-cakes', title: 'Pretty cakes for pretty moments', sub: 'Soft pastels, hand-placed blooms and sweet little details.', cta: 'Shop pretty cakes', palette: 'berry' },
];

function Hero() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [failed, setFailed] = useState({});
  const m = useMotion();
  useEffect(() => {
    if (!m.enabled || hover) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [m.enabled, hover]);
  const s = SLIDES[i];
  const go = (d) => setI((x) => (x + d + SLIDES.length) % SLIDES.length);
  return (
    <section aria-roledescription="carousel" aria-label="Featured" className="relative overflow-hidden bg-brand-50"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative aspect-[16/9] max-h-[560px] w-full sm:aspect-[21/9]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: m.enabled ? 1 + (1 - m.scale) : 1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: m.enabled ? m.dur * 1.4 : 0, ease: m.ease }}>
            {failed[i] ? <CakeArt seed={s.title} palette={s.palette} className="h-full w-full" /> :
              <img src={s.img} alt="" onError={() => setFailed((f) => ({ ...f, [i]: true }))} className="h-full w-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
          </motion.div>
        </AnimatePresence>
        <div className="container-page absolute inset-0 flex items-center">
          <motion.div key={'t' + i} initial={m.enabled ? { opacity: 0, x: -m.dist } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: m.dur, delay: m.enabled ? 0.15 : 0, ease: m.ease }} className="max-w-md text-white">
            <h1 className="text-3xl font-bold leading-tight drop-shadow sm:text-5xl">{s.title}</h1>
            <p className="mt-3 text-sm drop-shadow sm:text-base">{s.sub}</p>
            <Link to={s.to} className="btn mt-5">{s.cta} <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
        <button aria-label="Previous slide" onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 hover:bg-white"><ChevronLeft /></button>
        <button aria-label="Next slide" onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 hover:bg-white"><ChevronRight /></button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((_, n) => <button key={n} aria-label={`Slide ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? 'w-6 bg-brand' : 'w-2 bg-white/80'}`} />)}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children, to, cta = 'View all' }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <h2 className="text-2xl font-bold uppercase tracking-wide sm:text-3xl">{children}</h2>
      {to && <Link to={to} className="link-u text-sm font-semibold text-brand">{cta} →</Link>}
    </div>
  );
}

const TRUST = [[Cake, 'Fresh Cakes', 'Made To order'], [Sparkles, 'Over 100+', 'Flavours'], [Star, 'Top Rated', 'Cakes'], [Truck, 'Same Day', 'Delivery']];

export default function Home() {
  const { recent } = useApp();
  const pretty = collectionProducts('pretty-cakes').slice(0, 10);
  const recents = recent.map(getProduct).filter(Boolean).slice(0, 6);
  return (
    <>
      <Hero />

      <section className="container-page py-12">
        <Reveal><SectionTitle>Shop by flavour</SectionTitle></Reveal>
        <Stagger className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {FLAVOUR_TILES.map((t) => (
            <Item key={t.slug + t.title}>
              <Link to={`/collections/${t.slug}`} className="group block text-center">
                <div className="img-zoom hover-lift mx-auto aspect-square w-full overflow-hidden rounded-full ring-2 ring-brand-100"><CakeArt seed={t.title} palette={t.palette} className="h-full w-full" /></div>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-wide group-hover:text-brand sm:text-sm">{t.title}</span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="bg-cream py-12">
        <div className="container-page">
          <Reveal><SectionTitle to="/collections/pretty-cakes">Pretty cakes</SectionTitle></Reveal>
          <Stagger className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
            {pretty.map((p) => <Item key={p.slug}><ProductCard p={p} /></Item>)}
          </Stagger>
        </div>
      </section>

      <section className="container-page py-12">
        <Reveal><SectionTitle>Other than cakes</SectionTitle></Reveal>
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {OTHER_TILES.map((t) => (
            <Item key={t.slug + t.title}>
              <Link to={`/collections/${t.slug}`} className="img-zoom hover-lift group relative block aspect-[4/3] overflow-hidden rounded-xl">
                <ProductImage src={t.img} seed={t.title} palette={t.palette} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute inset-x-0 bottom-3 px-3 text-center text-sm font-semibold uppercase tracking-wide text-white">{t.title}</span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="bg-brand-50 py-10" aria-label="Why choose us">
        <Stagger className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST.map(([Icon, a, b]) => (
            <Item key={a} className="flex flex-col items-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-brand shadow-card"><Icon size={26} /></span>
              <p className="mt-3 text-sm font-bold uppercase">{a}</p><p className="text-sm text-ink-soft">{b}</p>
            </Item>
          ))}
        </Stagger>
      </section>

      <section className="container-page py-12">
        <Reveal><SectionTitle>People who got {QUICK.brand}</SectionTitle><p className="-mt-4 mb-6 text-xs text-ink-soft">Sample reviews for demo purposes – not real customers.</p></Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map(([name, stars, text], idx) => (
            <Item key={name}>
              <figure className="hover-lift flex gap-4 rounded-xl border border-brand-100 bg-white p-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg"><CakeArt seed={name + idx} /></div>
                <figcaption><Stars value={stars} /><p className="mt-1 text-sm">{text}</p><p className="mt-1 text-xs font-semibold text-brand">{name}</p></figcaption>
              </figure>
            </Item>
          ))}
        </Stagger>
      </section>

      {recents.length > 0 && (
        <section className="container-page pb-12">
          <Reveal><SectionTitle>Recently viewed</SectionTitle></Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{recents.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </section>
      )}
      <p className="sr-only">{PRODUCTS.length} products across {COLLECTIONS.length} collections.</p>
    </>
  );
}
