import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { LineItem } from '../components/CartDrawer';
import { useApp } from '../context/AppContext';
import { inr } from '../utils/format';

export default function Cart() {
  const { cart, subtotal, setQty, cartNote, setCartNote, clearCart } = useApp();
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <section className="container-page pb-12">
        <h1 className="text-3xl font-bold">Your cart</h1>
        {cart.length === 0 ? (
          <div className="grid place-items-center py-16 text-center"><ShoppingBag size={48} className="mb-3 text-brand-300" /><p className="font-medium">Your cart is currently empty.</p><Link to="/collections/view-all" className="btn mt-5">Continue shopping</Link></div>
        ) : (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <ul className="divide-y divide-brand-100">{cart.map((l) => <LineItem key={l.key} l={l} setQty={setQty} />)}</ul>
              <button className="mt-4 text-sm text-brand underline" onClick={clearCart}>Clear cart</button>
            </div>
            <aside className="h-fit rounded-xl border border-brand-100 bg-cream p-5">
              <label className="mb-4 block text-sm"><span className="mb-1 block font-medium">Message on cake / delivery instructions</span>
                <textarea rows={3} maxLength={300} className="field" value={cartNote} onChange={(e) => setCartNote(e.target.value)} /></label>
              <div className="flex justify-between text-lg font-semibold"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <p className="mb-4 mt-1 text-xs text-ink-soft">Shipping, taxes and discounts are not calculated in this demo.</p>
              <Link to="/checkout" className="btn w-full">Check out</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
