import { Link } from 'react-router-dom';
import { Trash2, Info } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { getProduct } from '../data/catalog';
import { inr } from '../utils/format';

export default function Account() {
  const { profile, setProfile, favs, recent, orders, setOrders, resetAll, prefs, setPref, history, setHistory } = useApp();
  const favP = favs.map(getProduct).filter(Boolean);
  const recP = recent.map(getProduct).filter(Boolean).slice(0, 6);
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
      <section className="container-page space-y-10 pb-14">
        <div>
          <h1 className="text-3xl font-bold">Your account (demo)</h1>
          <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><Info size={18} className="mt-0.5 shrink-0" />
            <p>There is no real login. Everything on this page is stored in <b>this browser’s localStorage</b> – it is specific to this browser and device, does not sync across devices, and is not a real user account. No passwords or payment details are ever stored.</p></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3 rounded-xl border border-brand-100 p-5">
            <h2 className="text-xl font-semibold">Profile</h2>
            <label className="block text-sm"><span className="mb-1 block font-medium">Display name</span><input className="field" value={profile.name || ''} maxLength={40} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></label>
            <label className="block text-sm"><span className="mb-1 block font-medium">Area / city (optional)</span><input className="field" value={profile.area || ''} maxLength={40} onChange={(e) => setProfile({ ...profile, area: e.target.value })} /></label>
            <p className="text-xs text-ink-soft">Saved automatically on this device.</p>
          </form>
          <div className="space-y-4 rounded-xl border border-brand-100 p-5">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <p className="text-sm text-ink-soft">Animation: <b>{prefs.speed}</b>{prefs.speed !== 'OFF' && <> · intensity <b>{prefs.intensity}</b></>} (change with the ✨ button at the bottom-left).</p>
            <label className="block text-sm"><span className="mb-1 block font-medium">Default product layout</span>
              <select className="field" value={prefs.view} onChange={(e) => setPref({ view: e.target.value })}><option value="large">Large grid</option><option value="small">Small grid</option><option value="list">List</option></select></label>
            <div className="flex flex-wrap gap-3 pt-1">
              {history.length > 0 && <button className="btn-outline !px-4 !py-2" onClick={() => setHistory([])}>Clear search history ({history.length})</button>}
              <button className="btn-outline !px-4 !py-2" onClick={() => { if (window.confirm('Clear cart, favourites, orders, history and preferences saved in this browser?')) resetAll(); }}><Trash2 size={14} />Clear local demo data</button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Favourites ({favP.length})</h2>
          {favP.length === 0 ? <p className="text-ink-soft">Tap the ♥ on any product to save it here.</p> :
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">{favP.map((p) => <ProductCard key={p.slug} p={p} />)}</div>}
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Demo orders ({orders.length})</h2>
          {orders.length === 0 ? <p className="text-ink-soft">No demo orders yet. Orders you “place” at checkout appear here.</p> : (
            <ul className="space-y-3">
              {orders.map((o) => (
                <li key={o.id} className="rounded-xl border border-brand-100 p-4 text-sm">
                  <div className="flex flex-wrap justify-between gap-2"><b>{o.id}</b><span className="text-ink-soft">{new Date(o.placedAt).toLocaleString()}</span></div>
                  <ul className="mt-2 text-ink-soft">{o.lines.map((l, i) => <li key={i}>{l.qty} × {l.name} ({l.size}{l.flavour ? ', ' + l.flavour : ''}) – {inr(l.unit * l.qty)}</li>)}</ul>
                  <p className="mt-2 font-semibold">Total {inr(o.subtotal)} <span className="font-normal text-ink-soft">· demo only, no payment taken</span></p>
                </li>
              ))}
            </ul>
          )}
          {orders.length > 0 && <button className="mt-3 text-sm text-brand underline" onClick={() => setOrders([])}>Remove demo orders</button>}
        </div>

        {recP.length > 0 && <div><h2 className="mb-4 text-2xl font-bold">Recently viewed</h2><div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{recP.map((p) => <ProductCard key={p.slug} p={p} />)}</div></div>}
        <p className="text-sm"><Link to="/pages/privacy-policy" className="text-brand underline">What is stored in my browser?</Link></p>
      </section>
    </>
  );
}
