import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Info } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { inr } from '../utils/format';

const SLOTS = ['09:00 – 12:00', '12:00 – 15:00', '15:00 – 18:00', '18:00 – 21:00'];
const EMPTY = { name: '', phone: '', address: '', pincode: '', date: '', slot: SLOTS[0] };

export default function Checkout() {
  const { cart, subtotal, cartNote, drafts, setDrafts, clearCart, setOrders, profile } = useApp();
  const [f, setF] = useState(() => ({ ...EMPTY, name: profile.name || '', ...(drafts.checkout || {}), date: drafts.checkout?.date || drafts.deliveryDate || '' }));
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const today = new Date().toISOString().slice(0, 10);

  // Draft is saved while typing (name/phone/address are stored only in this browser).
  useEffect(() => { const t = setTimeout(() => setDrafts((d) => ({ ...d, checkout: f })), 300); return () => clearTimeout(t); }, [f]); // eslint-disable-line react-hooks/exhaustive-deps
  const on = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = 'Please enter a name.';
    if (!/^\+?[0-9\s-]{8,15}$/.test(f.phone.trim())) er.phone = 'Enter a valid phone number.';
    if (f.address.trim().length < 8) er.address = 'Please enter a delivery address.';
    if (!/^[0-9]{6}$/.test(f.pincode.trim())) er.pincode = 'Enter a 6-digit pincode.';
    if (!f.date || f.date < today) er.date = 'Pick today or a later date.';
    setErrors(er);
    if (Object.keys(er).length) return;
    const order = {
      id: 'DEMO-' + Date.now().toString(36).toUpperCase(), placedAt: new Date().toISOString(), subtotal, note: cartNote,
      delivery: { name: f.name.trim(), area: f.pincode.trim(), date: f.date, slot: f.slot },
      lines: cart.map((l) => ({ name: l.product.name, size: l.size, flavour: l.flavour, qty: l.qty, unit: l.unit })),
    };
    setOrders((o) => [order, ...o].slice(0, 20));
    setDrafts((d) => { const { checkout, ...rest } = d; return rest; });
    clearCart();
    setDone(order);
  };

  if (done) {
    return (
      <section className="container-page grid place-items-center py-20 text-center">
        <CheckCircle2 size={64} className="text-green-500" />
        <h1 className="mt-4 text-3xl font-bold">Demo order saved</h1>
        <p className="mt-2 max-w-md text-ink-soft">Reference <b>{done.id}</b>. This was a demonstration: <b>no payment was taken, no order was sent to any bakery, and nothing was submitted to a server.</b> A copy is stored in this browser only (see Account).</p>
        <div className="mt-6 flex gap-3"><Link to="/account" className="btn">View in account</Link><Link to="/" className="btn-outline">Back to home</Link></div>
      </section>
    );
  }

  if (cart.length === 0) {
    return <section className="container-page py-20 text-center"><h1 className="text-3xl font-bold">Nothing to check out</h1><p className="mt-2 text-ink-soft">Your cart is empty.</p><Link to="/collections/view-all" className="btn mt-5">Shop cakes</Link></section>;
  }

  // Plain render helper (NOT a component) so inputs keep focus while typing.
  const field = (k, label, extra = {}) => (
    <label key={k} className="block text-sm"><span className="mb-1 block font-medium">{label}</span>
      <input className={`field ${errors[k] ? '!border-red-500' : ''}`} value={f[k]} onChange={on(k)} aria-invalid={!!errors[k]} {...extra} />
      {errors[k] && <span className="mt-1 block text-xs text-red-600" role="alert">{errors[k]}</span>}</label>
  );

  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <section className="container-page pb-12">
        <h1 className="text-3xl font-bold">Checkout (demo)</h1>
        <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><Info size={18} className="mt-0.5 shrink-0" /><p>This is a mock checkout. <b>No payment is processed</b> – please don’t enter card details – and no order is sent anywhere. Details you type are kept only in this browser’s localStorage.</p></div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
          <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
            {field('name', 'Full name', { autoComplete: 'name' })}
            {field('phone', 'Phone', { inputMode: 'tel', autoComplete: 'tel' })}
            <div className="sm:col-span-2">{field('address', 'Delivery address', { autoComplete: 'street-address' })}</div>
            {field('pincode', 'Pincode', { inputMode: 'numeric', maxLength: 6 })}
            {field('date', 'Delivery date', { type: 'date', min: today })}
            <label className="block text-sm sm:col-span-2"><span className="mb-1 block font-medium">Time slot</span>
              <select className="field" value={f.slot} onChange={on('slot')}>{SLOTS.map((s) => <option key={s}>{s}</option>)}</select></label>
            <button className="btn sm:col-span-2">Save demo order</button>
          </form>
          <aside className="h-fit rounded-xl border border-brand-100 bg-cream p-5">
            <h2 className="mb-3 font-sans text-sm font-bold uppercase">Order summary</h2>
            <ul className="space-y-2 text-sm">{cart.map((l) => <li key={l.key} className="flex justify-between gap-3"><span>{l.qty} × {l.product.name} <span className="text-ink-soft">({l.size})</span></span><span>{inr(l.unit * l.qty)}</span></li>)}</ul>
            <div className="mt-4 flex justify-between border-t border-brand-100 pt-3 font-semibold"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          </aside>
        </div>
      </section>
    </>
  );
}
