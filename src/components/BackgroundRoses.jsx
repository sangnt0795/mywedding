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
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full overflow-hidden [contain:paint]" aria-hidden="true">
      {roses.map((rose) => (
        <span
          key={`${rose.side}-${rose.top}`}
          className={clsx(
            'absolute block',
            rose.side === 'left' ? '-left-16 sm:-left-8 lg:left-6 xl:left-10' : '-right-16 sm:-right-8 lg:right-6 xl:right-10',
          )}
          style={{
            top: rose.top,
            width: rose.size,
            height: rose.size,
            opacity: rose.opacity,
            transform: `rotate(${rose.rotate}deg)`,
            transformOrigin: '50% 58%',
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
      ))}
    </div>
  );
};

export default BackgroundRoses;
