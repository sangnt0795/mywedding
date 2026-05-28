export const resolveAssetPath = (path = '') => {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${normalizedBase}${cleanPath}`;
};

export const preloadImage = (path = '') => {
  if (!path || typeof Image === 'undefined') return Promise.resolve(false);

  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (!image.decode) {
        resolve(true);
        return;
      }

      image.decode().then(
        () => resolve(true),
        () => resolve(true),
      );
    };
    image.onerror = () => resolve(false);
    image.src = resolveAssetPath(path);
  });
};

export const preloadImages = (paths = [], { concurrency = 2 } = {}) => {
  const uniquePaths = [...new Set(paths.filter(Boolean))];
  const workerCount = Math.min(Math.max(concurrency, 1), uniquePaths.length);
  let currentIndex = 0;

  const workers = Array.from({ length: workerCount }, async () => {
    while (currentIndex < uniquePaths.length) {
      const path = uniquePaths[currentIndex];
      currentIndex += 1;
      await preloadImage(path);
    }
  });

  return Promise.allSettled(workers);
};
