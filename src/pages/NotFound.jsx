import { Link } from 'react-router-dom';
import CakeArt from '../components/CakeArt';

export default function NotFound() {
  return (
    <section className="container-page grid place-items-center py-20 text-center">
      <div className="mb-6 h-48 w-48 overflow-hidden rounded-full"><CakeArt seed="404" palette="pink" /></div>
      <h1 className="text-4xl font-bold">Oops – this slice is missing</h1>
      <p className="mt-3 max-w-md text-ink-soft">We couldn’t find the page you were looking for. It may have moved, or the link is incorrect.</p>
      <div className="mt-6 flex gap-3"><Link to="/" className="btn">Back to home</Link><Link to="/collections/view-all" className="btn-outline">Browse all cakes</Link></div>
    </section>
  );
}
