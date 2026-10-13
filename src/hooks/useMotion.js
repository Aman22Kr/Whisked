import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getMotion } from '../utils/motion';

export function useMotion() {
  const { prefs } = useApp();
  const reduced = useReducedMotion();
  return useMemo(() => getMotion(prefs.speed, prefs.intensity, reduced), [prefs.speed, prefs.intensity, reduced]);
}
