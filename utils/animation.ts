export function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
  
export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t
}
  
export function interpolate(start: number, end: number, progress: number) {
  const t = easeInOutQuad(progress) // Apply easing function
  return lerp(start, end, t)
}