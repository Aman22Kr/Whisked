import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import AdSlot from './AdSlot';
import CartDrawer from './CartDrawer';
import SearchOverlay from './SearchOverlay';
import MobileMenu from './MobileMenu';
import MotionSettings from './MotionSettings';
import { QUICK } from '../config';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';
import { hash } from '../utils/format';

function Announcement() {
  const text = QUICK.announcement;
  return (
    <div className="overflow-hidden bg-brand py-2 text-[11px] font-semibold uppercase tracking-wider text-white sm:text-xs">
      <div className="marquee flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((i) => <span key={i} className="px-10">{text}</span>)}
      </div>
    </div>
  );
}

function Toast() {
  const { toast } = useApp();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center">
      <AnimatePresence>
        {toast && <motion.div key={toast.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-xl">{toast.msg}</motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const m = useMotion();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[70] focus:rounded focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
      <Announcement />
      <Header />
      {/* key={pathname} replays the enter animation on every route change */}
      <motion.main id="main" key={pathname} className="flex-1"
        initial={m.enabled ? { opacity: 0, y: m.dist * 0.5 } : false} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: m.enabled ? m.dur * 0.6 : 0, ease: m.ease }}>
        <Outlet />
        <AdSlot index={hash(pathname)} />
      </motion.main>
      <Footer />
      <CartDrawer /><SearchOverlay /><MobileMenu /><MotionSettings /><Toast />
      <a href={`https://wa.me/${QUICK.contact.whatsapp}?text=Hi`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="floaty fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg"><MessageCircle size={24} /></a>
    </div>
  );
}
