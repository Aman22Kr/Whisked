import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { MEGA, NAV } from '../data/nav';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';
import { Logo } from './Header';
import { useLockScroll } from '../hooks/useLockScroll';

function Acc({ title, children }) {
  const [o, setO] = useState(false);
  return (
    <div className="border-b border-brand-100">
      <button className="flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold uppercase tracking-wide" aria-expanded={o} onClick={() => setO(!o)}>
        {title}<ChevronDown size={16} className={`transition-transform ${o ? 'rotate-180' : ''}`} />
      </button>
      {o && <div className="pb-3 pl-2">{children}</div>}
    </div>
  );
}

export default function MobileMenu() {
  const { ui, openUi } = useApp();
  const m = useMotion();
  const close = () => openUi('menu', false);
  useLockScroll(ui.menu);
  const LinkList = ({ links }) => <ul className="space-y-2.5 py-1">{links.map((l, i) => <li key={l.label + i}><Link onClick={close} to={l.to} className="text-sm text-ink-soft hover:text-brand">{l.label}</Link></li>)}</ul>;
  return (
    <AnimatePresence>
      {ui.menu && (
        <>
          <motion.div key="bd" className="fixed inset-0 z-50 bg-black/40" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside key="panel" role="dialog" aria-modal="true" aria-label="Menu" onKeyDown={(e) => e.key === 'Escape' && close()}
            className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: m.enabled ? m.dur * 0.7 : 0, ease: m.ease }}>
            <div className="flex items-center justify-between border-b border-brand-100 px-4 py-3"><Logo /><button aria-label="Close menu" onClick={close}><X size={24} /></button></div>
            <div className="flex-1 overflow-y-auto px-4">
              <Acc title="Cakes">
                {MEGA.columns.map((c) => (
                  <div key={c.title} className="py-1"><p className="mb-1 text-xs font-bold uppercase text-brand">{c.title}</p><LinkList links={c.links} /></div>
                ))}
              </Acc>
              {NAV.map((n) => n.links
                ? <Acc key={n.label} title={n.label}><LinkList links={n.links} /></Acc>
                : <div key={n.label} className="border-b border-brand-100"><Link to={n.to} onClick={close} className="block py-3.5 text-sm font-semibold uppercase tracking-wide">{n.label}</Link></div>)}
              <div className="space-y-3 py-5 text-sm">
                <Link to="/account" onClick={close} className="block hover:text-brand">My account & favourites</Link>
                <Link to="/pages/contact-us" onClick={close} className="block hover:text-brand">Contact us</Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
