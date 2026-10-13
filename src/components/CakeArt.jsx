import { hash } from '../utils/format';

// Original SVG cake illustration used wherever a photo is unavailable (never a broken image).
export const PALETTES = {
  pink: ['#ffe0ee', '#ff94c2', '#fc4295'], choc: ['#f3e3d8', '#8a5a44', '#4a2c20'], mango: ['#fff3c9', '#ffc94a', '#f59e0b'],
  berry: ['#efe3ff', '#b58cf0', '#7c3aed'], caramel: ['#fbeed9', '#e0a96a', '#a9651f'], lemon: ['#fffbd1', '#f7e25b', '#d6b800'],
  cream: ['#fff8f3', '#f3dcc4', '#d9b48f'], mint: ['#dff7ee', '#8fd9bd', '#2fa579'], red: ['#ffe3e3', '#f06a6a', '#b91c1c'],
  lavender: ['#f1ebff', '#c8b2f5', '#8b5cf6'],
};
const KEYS = Object.keys(PALETTES);

export default function CakeArt({ seed = 'cake', palette, className = '' }) {
  const h = hash(seed);
  const [bg, mid, deep] = PALETTES[palette] || PALETTES[KEYS[h % KEYS.length]];
  const topping = h % 4;
  const layers = 2 + (h % 2);
  const id = `g${h}`;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Illustration of a cake" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={bg} /><stop offset="1" stopColor="#fff" /></linearGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      <ellipse cx="100" cy="168" rx="70" ry="9" fill={deep} opacity=".15" />
      <ellipse cx="100" cy="160" rx="64" ry="8" fill="#fff" stroke={mid} strokeWidth="1" />
      {Array.from({ length: layers }).map((_, i) => {
        const y = 150 - (i + 1) * 30;
        const w = 100 - i * 14;
        return (
          <g key={i}>
            <rect x={100 - w / 2} y={y} width={w} height="30" rx="5" fill={i % 2 ? mid : deep} />
            <rect x={100 - w / 2} y={y + 12} width={w} height="3" fill="#fff" opacity=".55" />
          </g>
        );
      })}
      {(() => {
        const w = 100 - (layers - 1) * 14, y = 150 - layers * 30;
        return (
          <g>
            <path d={`M${100 - w / 2} ${y} h${w} v9 q-6 10 -12 0 q-6 14 -12 0 q-6 8 -12 0 q-6 12 -12 0 q-6 8 -${w - 54} 0 z`} fill="#fff" opacity=".92" />
            {topping === 0 && <><circle cx="100" cy={y - 8} r="7" fill="#e11d48" /><path d={`M100 ${y - 15} q4 -8 9 -9`} stroke="#3f7d3a" strokeWidth="2" fill="none" /></>}
            {topping === 1 && [-22, 0, 22].map((dx) => <g key={dx}><circle cx={100 + dx} cy={y - 6} r="6" fill={mid} /><circle cx={100 + dx} cy={y - 6} r="2.5" fill="#fff" /></g>)}
            {topping === 2 && [-16, 0, 16].map((dx) => <g key={dx}><rect x={98 + dx} y={y - 20} width="4" height="16" fill={mid} /><ellipse cx={100 + dx} cy={y - 24} rx="3" ry="5" fill="#ffb703" /></g>)}
            {topping === 3 && <path d={`M100 ${y - 4} c-14 -14 -26 2 0 14 c26 -12 14 -28 0 -14z`} fill={deep} />}
          </g>
        );
      })()}
      {[30, 168, 22, 176].map((x, i) => <circle key={i} cx={x} cy={26 + i * 14} r={2 + (i % 2)} fill={mid} opacity=".5" />)}
    </svg>
  );
}
