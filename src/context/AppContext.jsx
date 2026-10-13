import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { QUICK } from '../config';
import { getProduct, priceFor } from '../data/catalog';
import { clearAllStore } from '../utils/storage';
import { getMotion } from '../utils/motion';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const isArr = Array.isArray;
const isObj = (v) => v && typeof v === 'object' && !isArr(v);

export function AppProvider({ children }) {
  const [cartRaw, setCartRaw] = useLocalStorage('cart', [], isArr);
  const [cartNote, setCartNote] = useLocalStorage('cartNote', '', (v) => typeof v === 'string');
  const [favs, setFavs] = useLocalStorage('favs', [], isArr);
  const [recent, setRecent] = useLocalStorage('recent', [], isArr);
  const [history, setHistory] = useLocalStorage('searchHistory', [], isArr);
  const [prefs, setPrefs] = useLocalStorage('prefs', { ...QUICK.animation, view: 'large', sort: 'featured' }, isObj);
  const [profile, setProfile] = useLocalStorage('profile', { name: '', area: '' }, isObj);
  const [orders, setOrders] = useLocalStorage('orders', [], isArr);
  const [drafts, setDrafts] = useLocalStorage('drafts', {}, isObj);
  const [ui, setUi] = useState({ cart: false, search: false, menu: false, motion: false });
  const [toast, setToast] = useState(null);

  // Defaults fill in any missing/outdated pref keys.
  const safePrefs = useMemo(() => ({ ...QUICK.animation, view: 'large', sort: 'featured', ...prefs }), [prefs]);

  // Cart: drop lines whose product no longer exists, recompute price from catalogue.
  const cart = useMemo(() => cartRaw
    .filter((l) => l && getProduct(l.slug) && Number.isFinite(l.qty) && l.qty > 0)
    .map((l) => {
      const product = getProduct(l.slug);
      return { ...l, product, unit: priceFor(product, l.size) };
    }), [cartRaw]);
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((n, l) => n + l.unit * l.qty, 0);

  const flash = useCallback((msg) => { setToast({ msg, id: Date.now() }); }, []);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  const addToCart = useCallback((slug, { size, flavour = '', note = '', qty = 1 } = {}, openDrawer = true) => {
    const key = [slug, size, flavour, note].join('|');
    setCartRaw((c) => {
      const i = c.findIndex((l) => l.key === key);
      if (i >= 0) return c.map((l, j) => (j === i ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      return [...c, { key, slug, size, flavour, note, qty }];
    });
    if (openDrawer) setUi((u) => ({ ...u, cart: true })); else flash('Added to cart');
  }, [setCartRaw, flash]);
  const setQty = useCallback((key, qty) => setCartRaw((c) => (qty <= 0 ? c.filter((l) => l.key !== key) : c.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 20) } : l)))), [setCartRaw]);
  const clearCart = useCallback(() => { setCartRaw([]); setCartNote(''); }, [setCartRaw, setCartNote]);

  const toggleFav = useCallback((slug) => setFavs((f) => (f.includes(slug) ? f.filter((s) => s !== slug) : [slug, ...f])), [setFavs]);
  const pushRecent = useCallback((slug) => setRecent((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, 12)), [setRecent]);
  const pushHistory = useCallback((q) => { const s = q.trim(); if (s.length > 1) setHistory((h) => [s, ...h.filter((x) => x !== s)].slice(0, 8)); }, [setHistory]);
  const setPref = useCallback((patch) => setPrefs((p) => ({ ...p, ...patch })), [setPrefs]);
  const openUi = useCallback((name, v = true) => setUi((u) => ({ ...u, [name]: v })), []);

  const resetAll = useCallback(() => {
    clearAllStore();
    setCartRaw([]); setCartNote(''); setFavs([]); setRecent([]); setHistory([]); setOrders([]); setDrafts({}); setProfile({ name: '', area: '' });
    setPrefs({ ...QUICK.animation, view: 'large', sort: 'featured' });
    flash('Local demo data cleared');
  }, [setCartRaw, setCartNote, setFavs, setRecent, setHistory, setOrders, setDrafts, setProfile, setPrefs, flash]);

  // Expose motion numbers as CSS variables so hover/transition styles follow the same settings.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const m = getMotion(safePrefs.speed, safePrefs.intensity, mq?.matches);
      const r = document.documentElement;
      r.style.setProperty('--dur', `${m.enabled ? m.dur * 0.6 : 0}s`);
      r.style.setProperty('--lift', `${m.lift}px`);
      r.dataset.motion = m.enabled ? 'on' : 'off';
    };
    apply();
    mq?.addEventListener?.('change', apply);
    return () => mq?.removeEventListener?.('change', apply);
  }, [safePrefs.speed, safePrefs.intensity]);

  const value = {
    cart, cartCount, subtotal, cartNote, setCartNote, addToCart, setQty, clearCart,
    favs, toggleFav, recent, pushRecent, history, setHistory, pushHistory,
    prefs: safePrefs, setPref, profile, setProfile, orders, setOrders, drafts, setDrafts,
    ui, openUi, toast, flash, resetAll,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
