import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { CITIES, FAQS, PAGES, cityPage } from '../data/pages';
import { COLLECTIONS, collectionProducts } from '../data/catalog';
import { FOOTER } from '../data/nav';
import { useApp } from '../context/AppContext';
import NotFound from './NotFound';

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-brand-100 rounded-xl border border-brand-100">
      {FAQS.map(([q, a], i) => (
        <div key={q}>
          <button className="flex w-full items-center justify-between gap-4 p-4 text-left font-medium" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {q}<ChevronDown size={18} className={`shrink-0 transition-transform ${open === i ? 'rotate-180 text-brand' : ''}`} />
          </button>
          {open === i && <p className="px-4 pb-4 text-sm text-ink-soft">{a}</p>}
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const { drafts, setDrafts } = useApp();
  const [f, setF] = useState(() => drafts.contact || { name: '', email: '', message: '' });
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => { const t = setTimeout(() => setDrafts((d) => ({ ...d, contact: f })), 300); return () => clearTimeout(t); }, [f]); // eslint-disable-line react-hooks/exhaustive-deps
  const on = (k) => (e) => { setSaved(false); setF((x) => ({ ...x, [k]: e.target.value })); };
  const submit = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.trim().length < 10) { setErr('Please enter your name, a valid email and a message of at least 10 characters.'); return; }
    setErr(''); setSaved(true);
    setDrafts((d) => ({ ...d, contactSaved: [{ ...f, at: new Date().toISOString() }, ...(d.contactSaved || [])].slice(0, 5), contact: { name: f.name, email: f.email, message: '' } }));
    setF((x) => ({ ...x, message: '' }));
  };
  return (
    <form onSubmit={submit} noValidate className="mt-6 grid max-w-xl gap-4">
      <label className="text-sm"><span className="mb-1 block font-medium">Name</span><input className="field" value={f.name} onChange={on('name')} autoComplete="name" /></label>
      <label className="text-sm"><span className="mb-1 block font-medium">Email</span><input type="email" className="field" value={f.email} onChange={on('email')} autoComplete="email" /></label>
      <label className="text-sm"><span className="mb-1 block font-medium">Message</span><textarea rows={5} className="field" value={f.message} onChange={on('message')} /></label>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      {saved && <p role="status" className="flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800"><CheckCircle2 size={18} className="shrink-0" />Saved on this device only. This demo has no server, so <b>your message was not sent to anyone</b>.</p>}
      <button className="btn w-fit">Save message (demo)</button>
    </form>
  );
}

function Sitemap() {
  const groups = [['Pages', [['Home', '/'], ['Search', '/search'], ['Cart', '/cart'], ['Account', '/account'], ...FOOTER.information, ...FOOTER.support]], ['Collections', COLLECTIONS.map((c) => [c.title, `/collections/${c.slug}`])], ['Cities', CITIES.map((c) => [`Cake delivery in ${c}`, `/pages/cake-delivery-in-${c}`])]];
  return <div className="mt-6 grid gap-8 md:grid-cols-3">{groups.map(([t, ls]) => <div key={t}><h2 className="mb-3 text-xl font-semibold">{t}</h2><ul className="space-y-1.5 text-sm">{ls.map(([l, to], i) => <li key={to + i}><Link to={to} className="text-ink-soft hover:text-brand">{l}</Link></li>)}</ul></div>)}</div>;
}

export default function InfoPage() {
  const { slug } = useParams();
  const page = PAGES[slug] || cityPage(slug);
  useEffect(() => { document.title = page ? `${page.title} – Whisked` : 'Whisked'; }, [page]);
  if (!page) return <NotFound />;
  const showcase = page.city ? collectionProducts('birthday').slice(0, 5) : [];
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: page.title }]} />
      <section className="container-page pb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">{page.title}</h1>
        <div className="prose-sm-x mt-4 max-w-3xl">{page.body.map((t, i) => <p key={i}>{t}</p>)}</div>
        {page.faq && <div className="mt-4 max-w-3xl"><Faq /></div>}
        {page.form && <ContactForm />}
        {slug === 'sitemap' && <Sitemap />}
        {showcase.length > 0 && <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{showcase.map((p) => <ProductCard key={p.slug} p={p} />)}</div>}
      </section>
    </>
  );
}
