import { Link } from 'react-router-dom';
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page py-4 text-xs text-ink-soft">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {it.to ? <Link to={it.to} className="link-u hover:text-brand">{it.label}</Link> : <span className="font-medium text-ink">{it.label}</span>}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
