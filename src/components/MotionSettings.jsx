import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';

const SPEEDS = ['SLOW', 'NORMAL', 'FAST', 'OFF'];
const INTENS = ['SUBTLE', 'NORMAL', 'STRONG'];

function Group({ label, options, value, onChange, disabled }) {
  return (
    <fieldset className="mb-4" disabled={disabled}>
      <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${value === o ? 'border-brand bg-brand text-white' : 'border-brand-200 hover:border-brand'} ${disabled ? 'opacity-40' : ''}`}>{o}</button>
        ))}
      </div>
    </fieldset>
  );
}

export default function MotionSettings() {
  const { ui, openUi, prefs, setPref } = useApp();
  const m = useMotion();
  return (
    <>
      <button onClick={() => openUi('motion', !ui.motion)} aria-label="Animation settings" aria-expanded={ui.motion}
        className="fixed bottom-4 left-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-white text-brand shadow-lg ring-1 ring-brand-200 transition hover:scale-110">
        <Sparkles size={20} />
      </button>
      <AnimatePresence>
        {ui.motion && (
          <motion.div role="dialog" aria-label="Animation settings" initial={{ opacity: 0, y: m.enabled ? 16 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-20 left-4 z-40 w-72 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-brand-100">
            <div className="mb-3 flex items-center justify-between"><h2 className="font-sans text-sm font-bold">Animation</h2><button aria-label="Close" onClick={() => openUi('motion', false)}><X size={18} /></button></div>
            <Group label="Speed" options={SPEEDS} value={prefs.speed} onChange={(speed) => setPref({ speed })} />
            <Group label="Intensity" options={INTENS} value={prefs.intensity} onChange={(intensity) => setPref({ intensity })} disabled={prefs.speed === 'OFF'} />
            <p className="text-[11px] leading-snug text-ink-soft">Saved in this browser only. Your device’s “reduce motion” setting is always respected.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
