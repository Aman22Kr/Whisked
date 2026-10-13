// Turns the user's speed/intensity choice into concrete animation numbers.
const SPEED = { SLOW: 1.6, NORMAL: 1, FAST: 0.55 };
const INTENSITY = {
  SUBTLE: { dist: 10, scale: 0.99, stagger: 0.04, lift: 2 },
  NORMAL: { dist: 22, scale: 0.97, stagger: 0.07, lift: 4 },
  STRONG: { dist: 44, scale: 0.92, stagger: 0.11, lift: 8 },
};

export function getMotion(speed = 'NORMAL', intensity = 'NORMAL', reduced = false) {
  if (speed === 'OFF' || reduced) {
    return { enabled: false, dur: 0, dist: 0, scale: 1, stagger: 0, lift: 0, ease: 'linear' };
  }
  const s = SPEED[speed] ?? 1;
  const i = INTENSITY[intensity] ?? INTENSITY.NORMAL;
  return {
    enabled: true,
    dur: +(0.5 * s).toFixed(3),
    dist: i.dist,
    scale: i.scale,
    stagger: +(i.stagger * s).toFixed(3),
    lift: i.lift,
    ease: [0.22, 1, 0.36, 1],
  };
}
