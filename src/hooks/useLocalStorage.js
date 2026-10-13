import { useEffect, useRef, useState } from 'react';
import { readStore, writeStore } from '../utils/storage';
import { QUICK } from '../config';

// useState that is initialised from and mirrored to namespaced localStorage.
export function useLocalStorage(k, initial, validate) {
  const [value, setValue] = useState(() => readStore(k, initial, validate));
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    writeStore(k, value);
  }, [k, value]);

  // keep multiple tabs in sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === QUICK.storagePrefix + k) setValue(readStore(k, initial, validate));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k]);

  return [value, setValue];
}
