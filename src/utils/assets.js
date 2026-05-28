export const resolveAssetPath = (path = '') => {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}${cleanPath}`;
};
