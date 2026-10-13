import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import { FOOTER } from '../data/nav';
import { QUICK } from '../config';
import { Logo } from './Header';

export default function Footer() {
  const col = (title, links) => (
    <div>
      <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-brand">{title}</h3>
      <ul className="space-y-2.5 text-sm">{links.map(([l, to]) => <li key={l}><Link to={to} className="link-u text-ink-soft hover:text-brand">{l}</Link></li>)}</ul>
    </div>
  );
  return (
    <footer className="mt-12 border-t border-brand-100 bg-cream">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-soft">{QUICK.tagline}. This is a demo storefront with sample products – no real orders are taken.</p>
        </div>
        {col('Information', FOOTER.information)}
        {col('Support', FOOTER.support)}
        <div>
          <h3 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider text-brand">Get in touch</h3>
          <ul className="space-y-2.5 text-sm text-ink-soft">
            <li className="flex items-center gap-2"><Phone size={15} /><a href={`tel:${QUICK.contact.phone.replace(/\s/g, '')}`}>{QUICK.contact.phone}</a></li>
            <li className="flex items-center gap-2"><Mail size={15} /><a href={`mailto:${QUICK.contact.email}`}>{QUICK.contact.email}</a></li>
          </ul>
          <h3 className="mb-3 mt-6 font-sans text-sm font-bold uppercase tracking-wider text-brand">Follow us</h3>
          <div className="flex gap-3">
            <a aria-label="Instagram" href={QUICK.contact.instagram} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow transition hover:bg-brand hover:text-white"><Instagram size={16} /></a>
            <a aria-label="Facebook" href={QUICK.contact.facebook} className="grid h-9 w-9 place-items-center rounded-full bg-white shadow transition hover:bg-brand hover:text-white"><Facebook size={16} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-100">
        <div className="container-page space-y-3 py-6 text-xs text-ink-soft">
          <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-ink">Find more products</h3>
          <p><span className="font-semibold">TOP SEARCHES:</span> {FOOTER.topSearches.map(([l, to], i) => <span key={l}>{i > 0 && ' | '}<Link to={to} className="hover:text-brand">{l}</Link></span>)}</p>
          <p><span className="font-semibold">TOP CAKE CITIES:</span> {FOOTER.cities.map((c, i) => <span key={c}>{i > 0 && ' | '}<Link to={`/pages/cake-delivery-in-${c.toLowerCase()}`} className="hover:text-brand">Cake Delivery in {c}</Link></span>)}</p>
        </div>
      </div>
      <div className="bg-brand py-4 text-center text-xs text-white">© {new Date().getFullYear()} {QUICK.brandDisplay} · {QUICK.legalLine}</div>
    </footer>
  );
}
