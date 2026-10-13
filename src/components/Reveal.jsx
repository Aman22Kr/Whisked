import { motion } from 'framer-motion';
import { useMotion } from '../hooks/useMotion';

// Scroll-reveal wrapper whose distance / duration / scale follow the Animation settings.
export function Reveal({ children, delay = 0, as = 'div', className = '', from = 'up' }) {
  const m = useMotion();
  const Tag = motion[as] || motion.div;
  if (!m.enabled) return <Tag className={className}>{children}</Tag>;
  const axis = from === 'left' ? { x: -m.dist } : from === 'right' ? { x: m.dist } : { y: m.dist };
  return (
    <Tag className={className} initial={{ opacity: 0, scale: m.scale, ...axis }} whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: m.dur, ease: m.ease, delay }}>
      {children}
    </Tag>
  );
}

// Staggered grid: children appear one after another.
export function Stagger({ children, className = '' }) {
  const m = useMotion();
  if (!m.enabled) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial="hide" whileInView="show" viewport={{ once: true, margin: '-40px' }}
      variants={{ hide: {}, show: { transition: { staggerChildren: m.stagger } } }}>
      {children}
    </motion.div>
  );
}
export function Item({ children, className = '' }) {
  const m = useMotion();
  if (!m.enabled) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={{ hide: { opacity: 0, y: m.dist, scale: m.scale }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: m.dur, ease: m.ease } } }}>
      {children}
    </motion.div>
  );
}
