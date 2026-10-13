import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';
import { useLockScroll } from '../hooks/useLockScroll';
import { ADDONS, getVariants } from '../data/catalog';
import { inr } from '../utils/format';
import ProductImage from './ProductImage';

export function QtyControl({ qty, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border border-brand-200">
      <button aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center hover:text-brand" onClick={() => onChange(qty - 1)}><Minus size={14} /></button>
      <span className="w-7 text-center text-sm font-medium" aria-live="polite">{qty}</span>
      <button aria-label="Increase quantity" className="grid h-8 w-8 place-items-center hover:text-brand" onClick={() => onChange(qty + 1)}><Plus size={14} /></button>
    </div>
  );
}

export function LineItem({ l, setQty }) {
  return (
    <li className="flex gap-3 py-3">
      <Link to={`/products/${l.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg"><ProductImage src={l.product.images[0]} seed={l.slug} /></Link>
      <div className="min-w-0 flex-1">
        <Link to={`/products/${l.slug}`} className="block truncate text-sm font-medium hover:text-brand">{l.product.name}</Link>
        <p className="text-xs text-ink-soft">{[l.size, l.flavour].filter(Boolean).join(' · ')}</p>
        {l.note && <p className="truncate text-xs italic text-ink-soft">“{l.note}”</p>}
        <div className="mt-2 flex items-center justify-between">
          <QtyControl qty={l.qty} onChange={(q) => setQty(l.key, q)} />
          <span className="text-sm font-semibold">{inr(l.unit * l.qty)}</span>
        </div>
      </div>
      <button aria-label={`Remove ${l.product.name}`} onClick={() => setQty(l.key, 0)} className="self-start text-ink-soft hover:text-brand"><Trash2 size={16} /></button>
    </li>
  );
}

export default function CartDrawer() {
  const { ui, openUi, cart, subtotal, setQty, cartNote, setCartNote, addToCart } = useApp();
  const m = useMotion();
  const close = () => openUi('cart', false);
  useLockScroll(ui.cart);
  return (
    <AnimatePresence>
      {ui.cart && (
        <>
          <motion.div key="bd" className="fixed inset-0 z-50 bg-black/40" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside key="d" role="dialog" aria-modal="true" aria-label="Shopping cart" onKeyDown={(e) => e.key === 'Escape' && close()}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: m.enabled ? m.dur * 0.7 : 0, ease: m.ease }}>
            <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
              <h2 className="text-xl font-semibold">Your cart</h2>
              <button aria-label="Close cart" onClick={close}><X size={22} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              {cart.length === 0 ? (
                <div className="grid place-items-center py-16 text-center">
                  <ShoppingBag size={44} className="mb-3 text-brand-300" />
                  <p className="font-medium">Your cart is currently empty.</p>
                  <Link to="/collections/pretty-cakes" onClick={close} className="btn mt-5">Shop pretty cakes</Link>
                </div>
              ) : (
                <ul className="divide-y divide-brand-100">{cart.map((l) => <LineItem key={l.key} l={l} setQty={setQty} />)}</ul>
              )}

              <section className="mt-4 border-t border-brand-100 pt-4" aria-labelledby="addon-h">
                <h3 id="addon-h" className="mb-3 font-sans text-sm font-bold uppercase tracking-wide">Would you like to add?</h3>
                <ul className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
                  {ADDONS.map((a) => (
                    <li key={a.slug} className="w-32 shrink-0 text-center">
                      <div className="aspect-square overflow-hidden rounded-lg"><ProductImage src={a.images[0]} seed={a.slug} /></div>
                      <p className="mt-1 line-clamp-2 min-h-[2rem] text-xs leading-tight">{a.name}</p>
                      <p className="text-xs font-semibold text-brand">{inr(a.base)}</p>
                      <button onClick={() => addToCart(a.slug, { size: getVariants(a).sizes[0].label }, false)} className="mt-1 rounded-full border border-brand px-3 py-1 text-[11px] font-semibold uppercase text-brand transition hover:bg-brand hover:text-white">Add</button>
                    </li>
                  ))}
                </ul>
              </section>

              <label className="mb-4 mt-2 block text-sm">
                <span className="mb-1 block font-medium">Message on cake / delivery instructions</span>
                <textarea value={cartNote} onChange={(e) => setCartNote(e.target.value)} rows={3} maxLength={300} className="field" placeholder="e.g. “Happy Birthday Riya!”" />
              </label>
            </div>
            <div className="border-t border-brand-100 px-5 py-4">
              <div className="mb-1 flex items-center justify-between text-base font-semibold"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <p className="mb-3 text-xs text-ink-soft">Shipping, taxes, and discount codes are not calculated in this demo.</p>
              <Link to="/checkout" onClick={close} aria-disabled={cart.length === 0} className={`btn w-full ${cart.length === 0 ? 'pointer-events-none opacity-50' : ''}`}>Check out</Link>
              <Link to="/cart" onClick={close} className="mt-2 block text-center text-sm text-brand underline">View full cart</Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
