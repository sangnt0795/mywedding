import { motion } from 'framer-motion';
import { resolveAssetPath } from '../utils/assets';

const ROSE_IMAGE = '/images/blue-rose.webp';

const flowers = [
  { left: '6%', size: 18, delay: 0, duration: 14.5, drift: 28, rotate: 145, opacity: 0.44 },
  { left: '16%', size: 15, delay: 2.4, duration: 16.2, drift: -24, rotate: -160, opacity: 0.38 },
  { left: '27%', size: 20, delay: 5.2, duration: 17, drift: 34, rotate: 170, opacity: 0.42 },
  { left: '39%', size: 16, delay: 1.2, duration: 13.6, drift: -30, rotate: -135, opacity: 0.36 },
  { left: '51%', size: 21, delay: 3.8, duration: 16.8, drift: 32, rotate: 180, opacity: 0.41 },
  { left: '63%', size: 15, delay: 6.6, duration: 14.8, drift: -22, rotate: -120, opacity: 0.34 },
  { left: '74%', size: 19, delay: 1.8, duration: 15.6, drift: 31, rotate: 155, opacity: 0.4 },
  { left: '86%', size: 17, delay: 4.9, duration: 17.5, drift: -28, rotate: -150, opacity: 0.37 },
  { left: '95%', size: 20, delay: 7.4, duration: 16, drift: 26, rotate: 165, opacity: 0.39 },
];

const FallingPetals = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      {flowers.map((flower, index) => {
        const startRotate = index % 2 === 0 ? -18 : 22;

        return (
          <motion.span
            key={`${flower.left}-${flower.delay}`}
            className="absolute -top-10 block will-change-transform"
            style={{
              left: flower.left,
              width: flower.size,
              height: flower.size,
              opacity: flower.opacity,
              transformOrigin: '50% 60%',
            }}
            initial={{ y: '-12vh', x: 0, rotate: startRotate }}
            animate={{
              y: '112vh',
              x: [0, flower.drift, flower.drift * -0.45, flower.drift * 0.2],
              rotate: [startRotate, startRotate + flower.rotate * 0.6, startRotate + flower.rotate],
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <img
              src={resolveAssetPath(ROSE_IMAGE)}
              alt=""
              className="h-full w-full object-contain"
              draggable="false"
              decoding="async"
            />
          </motion.span>
        );
      })}
    </div>
  );
};

export default FallingPetals;
