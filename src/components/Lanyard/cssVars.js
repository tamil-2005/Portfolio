// Reads a value from a CSS custom property on :root. WebGL canvases can't be
// targeted by CSS selectors directly, so colors/sizes for the 3D scene are
// pulled from the stylesheet at draw/render time instead of being
// hardcoded in JS. Shared by IdCard.jsx and Lanyard.jsx.
export function cssVar(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export function cssVarNumber(name, fallback) {
  const parsed = parseFloat(cssVar(name, String(fallback)));
  return Number.isFinite(parsed) ? parsed : fallback;
}
