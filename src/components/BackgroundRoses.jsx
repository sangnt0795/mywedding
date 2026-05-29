import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { resolveAssetPath } from '../utils/assets';

const ROSE_IMAGE = '/images/blue-rose.webp';

const roses = [
  { side: 'left', top: '112vh', size: 'clamp(132px, 19vw, 280px)', rotate: -14, opacity: 0.13, delay: 0 },
  { side: 'right', top: '182vh', size: 'clamp(150px, 20vw, 300px)', rotate: 14, opacity: 0.12, delay: 0.08 },
  { side: 'left', top: '262vh', size: 'clamp(118px, 17vw, 250px)', rotate: 10, opacity: 0.1, delay: 0.04 },
  { side: 'right', top: '346vh', size: 'clamp(136px, 19vw, 280px)', rotate: -16, opacity: 0.13, delay: 0.1 },
  { side: 'left', top: '430vh', size: 'clamp(154px, 20vw, 300px)', rotate: -8, opacity: 0.11, delay: 0.02 },
  { side: 'right', top: '520vh', size: 'clamp(122px, 18vw, 260px)', rotate: 18, opacity: 0.1, delay: 0.06 },
];

const BackgroundRoses = () => {
  const roseRefs = useRef([]);
  const [visibleRoses, setVisibleRoses] = useState(() => new Set());

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisibleRoses(new Set(roses.map((_, index) => index)));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.getAttribute('data-rose-index'));
          setVisibleRoses((current) => {
            if (current.has(index)) return current;
            const next = new Set(current);
            next.add(index);
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '-8% 0px -8% 0px', threshold: 0.18 },
    );

    roseRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 overflow-x-hidden" aria-hidden="true">
      {roses.map((rose, index) => {
        const isVisible = visibleRoses.has(index);

        return (
          <span
            key={`${rose.side}-${rose.top}`}
            ref={(element) => {
              roseRefs.current[index] = element;
            }}
            data-rose-index={index}
            className={clsx(
              'absolute block will-change-transform',
              rose.side === 'left' ? '-left-16 sm:-left-8 lg:left-6 xl:left-10' : '-right-16 sm:-right-8 lg:right-6 xl:right-10',
            )}
            style={{
              top: rose.top,
              width: rose.size,
              height: rose.size,
              opacity: isVisible ? rose.opacity : 0,
              transform: `rotate(${isVisible ? rose.rotate : rose.rotate - 12}deg) scale(${isVisible ? 1 : 0.35})`,
              transformOrigin: '50% 58%',
              transition: 'opacity 700ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${rose.delay}s`,
            }}
          >
            <img
              src={resolveAssetPath(ROSE_IMAGE)}
              alt=""
              loading="eager"
              decoding="async"
              draggable="false"
              className={clsx('h-full w-full object-contain', rose.side === 'right' && '-scale-x-100')}
            />
          </span>
        );
      })}
    </div>
  );
};

export default BackgroundRoses;
