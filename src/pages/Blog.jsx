import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import CakeArt from '../components/CakeArt';
import { Stagger, Item } from '../components/Reveal';
import { POSTS } from '../data/pages';
import NotFound from './NotFound';

export function BlogList() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
      <section className="container-page pb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
        <p className="mt-1 text-xs text-ink-soft">Sample articles for demonstration.</p>
        <Stagger className="mt-6 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Item key={p.slug}>
              <Link to={`/blogs/topic/${p.slug}`} className="hover-lift img-zoom block overflow-hidden rounded-xl border border-brand-100">
                <div className="aspect-[16/10] overflow-hidden"><CakeArt seed={p.slug} className="h-full w-full" /></div>
                <div className="p-4"><time className="text-xs text-ink-soft">{new Date(p.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</time><h2 className="mt-1 text-lg font-semibold">{p.title}</h2><p className="mt-1 text-sm text-ink-soft">{p.excerpt}</p></div>
              </Link>
            </Item>
          ))}
        </Stagger>
      </section>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blogs/topic' }, { label: p.title }]} />
      <article className="container-page max-w-3xl pb-12">
        <h1 className="text-3xl font-bold sm:text-4xl">{p.title}</h1>
        <time className="mt-1 block text-sm text-ink-soft">{new Date(p.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</time>
        <div className="my-6 aspect-[16/9] overflow-hidden rounded-2xl"><CakeArt seed={p.slug} className="h-full w-full" /></div>
        <div className="prose-sm-x">{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
      </article>
    </>
  );
}
