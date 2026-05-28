import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import CoupleNames from './CoupleNames';
import { resolveAssetPath } from '../utils/assets';
import { formatShortDate } from '../utils/date';

const EnvelopeIntro = ({ data, onOpenStart, onOpenComplete }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpenStart?.();
  };

  useEffect(() => {
    if (!isOpening) return undefined;

    const timer = window.setTimeout(() => {
      onOpenComplete?.();
    }, 1900);

    return () => window.clearTimeout(timer);
  }, [isOpening, onOpenComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden bg-paper px-4 py-5 text-ink sm:min-h-screen sm:px-5 sm:py-8"
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(18px)' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${resolveAssetPath(data.coverImage)})` }}
        animate={{ scale: isOpening ? 1.08 : 1.02 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,254,255,0.7),rgba(238,249,253,0.9))]" />
      <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-mist/35 blur-3xl" />
      <div className="absolute -right-16 bottom-16 h-60 w-60 rounded-full bg-blush/45 blur-3xl" />

      <motion.div
        className="relative w-full max-w-[420px] cursor-pointer select-none sm:max-w-[520px]"
        role="button"
        tabIndex={0}
        aria-label="Chạm để mở thiệp cưới"
        onClick={handleOpen}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') handleOpen();
        }}
        animate={isOpening ? { y: -10, scale: 0.98 } : { y: [0, -8, 0] }}
        transition={isOpening ? { duration: 0.7 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute -inset-5 rounded-[2.2rem] bg-white/35 blur-2xl sm:-inset-7"
          animate={{ opacity: isOpening ? 0.8 : [0.45, 0.75, 0.45] }}
          transition={{ duration: 3, repeat: isOpening ? 0 : Infinity }}
        />

        <div className="relative min-h-[420px] rounded-[2rem] border border-white/80 bg-white/42 p-4 shadow-soft backdrop-blur-md sm:min-h-[500px] sm:p-6">
          <div className="absolute left-8 top-7 h-20 w-20 rounded-full border border-roseblue/40" />
          <div className="absolute right-8 top-10 h-14 w-14 rounded-full bg-mist/40 blur-xl" />
          <div className="absolute bottom-8 left-10 h-16 w-16 rounded-full bg-blush/40 blur-xl" />

          <motion.div
            className="absolute left-1/2 top-[14%] z-10 w-[84%] rounded-[1.7rem] border border-champagne/90 bg-porcelain px-5 py-6 text-center shadow-card sm:top-[20%] sm:w-[76%] sm:px-7 sm:py-9"
            initial={false}
            animate={isOpening ? { x: '-50%', y: -118, opacity: 1, rotateX: 0 } : { x: '-50%', y: 18, opacity: 0.98, rotateX: 0 }}
            transition={{ duration: 1.15, delay: isOpening ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.38em] text-sageblue">Wedding Invitation</p>
            <CoupleNames brideName={data.brideName} groomName={data.groomName} size="cover" className="mt-4 sm:mt-6" />
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-roseblue to-transparent sm:mt-6" />
            <p className="mt-4 text-sm tracking-[0.28em] text-nude sm:mt-5">{formatShortDate(data.weddingDate)}</p>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 h-[250px] w-[86%] -translate-x-1/2 sm:h-[300px]">
            <div className="absolute inset-x-0 bottom-0 h-[82%] rounded-b-[1.8rem] border border-champagne bg-gradient-to-br from-[#e9f8fe] via-[#d8eef8] to-[#c7e5f1] shadow-card" />
            <motion.div
              className="absolute inset-x-0 top-[4%] z-20 mx-auto h-[54%] origin-top rounded-t-[1.5rem] border border-champagne bg-gradient-to-br from-[#fbfeff] via-[#d8eef8] to-[#b9deee] shadow-card"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              initial={false}
              animate={isOpening ? { rotateX: -156, y: -2 } : { rotateX: 0, y: 0 }}
              transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <div
              className="absolute inset-x-0 bottom-0 z-30 h-[58%] rounded-b-[1.8rem] bg-gradient-to-br from-[#e3f5fc] via-[#d1eaf5] to-[#bdddeb] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
              style={{ clipPath: 'polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)' }}
            />
            <div
              className="absolute bottom-0 left-0 z-40 h-[58%] w-1/2 rounded-bl-[1.8rem] bg-[#c9e6f2]"
              style={{ clipPath: 'polygon(0 0, 100% 57%, 0 100%)' }}
            />
            <div
              className="absolute bottom-0 right-0 z-40 h-[58%] w-1/2 rounded-br-[1.8rem] bg-[#dff3fb]"
              style={{ clipPath: 'polygon(100% 0, 0 57%, 100% 100%)' }}
            />
            <motion.div
              className="absolute left-1/2 top-[52%] z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-[#5f91a5] text-white shadow-glow sm:h-[4.6rem] sm:w-[4.6rem]"
              animate={
                isOpening
                  ? { x: '-50%', y: '-50%', scale: 0.86, opacity: 0 }
                  : { x: '-50%', y: '-50%', scale: [1, 1.06, 1] }
              }
              transition={{ duration: isOpening ? 0.45 : 2.4, repeat: isOpening ? 0 : Infinity }}
            >
              <FiHeart className="text-2xl" />
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 z-[60] text-center"
            animate={isOpening ? { x: '-50%', opacity: 0, y: 8 } : { x: '-50%', opacity: [0.55, 1, 0.55], y: [0, -3, 0] }}
            transition={{ duration: 2.2, repeat: isOpening ? 0 : Infinity }}
          >
            <p className="rounded-full border border-white/70 bg-white/55 px-4 py-2 text-xs tracking-[0.22em] text-ink/70 shadow-sm backdrop-blur">
              Chạm để mở thiệp
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnvelopeIntro;
