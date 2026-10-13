import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { MEGA, NAV } from '../data/nav';
import { QUICK } from '../config';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';

export function Logo({ className = '' }) {
  return (
    <Link to="/" aria-label={`${QUICK.brandDisplay} home`} className={`flex items-center gap-1.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-lg text-white" aria-hidden>🧁</span>
      <span className="font-display text-2xl font-bold lowercase tracking-tight text-brand">{QUICK.brand}</span>
    </Link>
  );
}

function Panel({ children, wide }) {
  const m = useMotion();
  return (
    <motion.div initial={m.enabled ? { opacity: 0, y: Math.min(m.dist, 18) } : false} animate={{ opacity: 1, y: 0 }} exit={m.enabled ? { opacity: 0, y: 8 } : { opacity: 0 }}
      transition={{ duration: m.enabled ? m.dur * 0.6 : 0, ease: m.ease }}
      className={`absolute left-0 top-full z-40 rounded-b-2xl border border-t-0 border-brand-100 bg-white p-6 shadow-xl ${wide ? 'w-[min(1100px,92vw)]' : 'min-w-[240px]'}`}>
      {children}
    </motion.div>
  );
}

export default function Header() {
  const { cartCount, openUi, favs } = useApp();
  const [open, setOpen] = useState(null);
  const items = [{ ...MEGA, mega: true }, ...NAV];
  const close = () => setOpen(null);

  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur" onKeyDown={(e) => e.key === 'Escape' && close()}>
      <div className="container-page relative flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <button className="lg:hidden" aria-label="Open menu" onClick={() => openUi('menu')}><Menu size={24} /></button>
        <Logo className="max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {items.map((it) => {
            const hasMenu = it.mega || it.links;
            return (
              <div key={it.label} className={it.mega ? '' : 'relative'} onMouseEnter={() => hasMenu && setOpen(it.label)} onMouseLeave={close}
                onFocus={() => hasMenu && setOpen(it.label)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }}>
                {it.to ? (
                  <NavLink to={it.to} onClick={close} className={({ isActive }) => `flex items-center gap-1 px-3 py-6 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-brand ${isActive && it.to !== '/' ? 'text-brand' : ''}`}>
                    {it.label}{hasMenu && <ChevronDown size={14} />}
                  </NavLink>
                ) : (
                  <button type="button" aria-haspopup="true" aria-expanded={open === it.label} onClick={() => setOpen(open === it.label ? null : it.label)} className="flex items-center gap-1 px-3 py-6 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-brand">
                    {it.label}<ChevronDown size={14} />
                  </button>
                )}
                <AnimatePresence>
                  {open === it.label && it.mega && (
                    <div className="absolute inset-x-0 top-full flex justify-center">
                      <Panel wide>
                        <div className="grid grid-cols-4 gap-8">
                          {it.columns.map((col) => (
                            <div key={col.title}>
                              {col.to ? <Link to={col.to} onClick={close} className="mb-3 block text-sm font-bold uppercase tracking-wide text-brand">{col.title}</Link> : <h3 className="mb-3 font-sans text-sm font-bold uppercase tracking-wide text-brand">{col.title}</h3>}
                              <ul className="space-y-2">
                                {col.links.map((l, i) => <li key={l.label + i}><Link to={l.to} onClick={close} className="link-u text-sm text-ink-soft hover:text-brand">{l.label}</Link></li>)}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </Panel>
                    </div>
                  )}
                  {open === it.label && !it.mega && it.links && (
                    <Panel>
                      <ul className="space-y-2.5">
                        {it.links.map((l) => <li key={l.label}><Link to={l.to} onClick={close} className="link-u whitespace-nowrap text-sm text-ink-soft hover:text-brand">{l.label}</Link></li>)}
                      </ul>
                    </Panel>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <a href={`tel:${QUICK.contact.phone.replace(/\s/g, '')}`} className="hidden items-center gap-1.5 text-xs font-semibold uppercase xl:flex hover:text-brand"><Phone size={16} />Call Us</a>
          <button aria-label="Search" onClick={() => openUi('search')} className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-brand-50 hover:text-brand"><Search size={20} /></button>
          <Link to="/account" aria-label="Account and favourites" className="relative hidden h-10 w-10 place-items-center rounded-full transition hover:bg-brand-50 hover:text-brand sm:grid">
            <User size={20} />{favs.length > 0 && <Heart size={10} className="absolute right-1.5 top-1.5 fill-brand text-brand" />}
          </Link>
          <button aria-label={`Cart, ${cartCount} items`} onClick={() => openUi('cart')} className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-brand-50 hover:text-brand">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
