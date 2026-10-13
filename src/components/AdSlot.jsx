import { ExternalLink } from 'lucide-react';
import { QUICK } from '../config';

const HOUSE = [
  { t: 'Sweet deal: free cake topper on orders above ₹2,000', c: 'Sample house ad' },
  { t: 'Send flowers with your cake – bunches from ₹199', c: 'Sample house ad' },
  { t: 'Planning a party? Explore party bowls & dessert boxes', c: 'Sample house ad' },
];

// Small ad strip shown at the base of every page.
// To use a real ad network, replace the body of this component with the network's snippet.
export default function AdSlot({ index = 0 }) {
  if (!QUICK.ads.enabled) return null;
  const ad = HOUSE[index % HOUSE.length];
  return (
    <aside aria-label={QUICK.ads.label} className="container-page my-8">
      <div className="mx-auto flex min-h-[72px] max-w-3xl items-center justify-between gap-4 rounded-lg border border-dashed border-brand-300 bg-brand-50 px-4 py-3 text-sm">
        <div>
          <span className="mr-2 rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">{QUICK.ads.label}</span>
          <span className="font-medium">{ad.t}</span>
          <div className="mt-0.5 text-[11px] text-ink-soft">{ad.c} – placeholder slot</div>
        </div>
        <ExternalLink size={16} className="shrink-0 text-brand" aria-hidden />
      </div>
    </aside>
  );
}
