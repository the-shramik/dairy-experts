// Prefixes public-folder paths with the deploy base (e.g. /dairy-experts/ on GitHub Pages).
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')
