import { motion } from 'framer-motion';
import { FiMusic, FiVolumeX } from 'react-icons/fi';
import clsx from 'clsx';

const MusicControl = ({ isPlaying, onToggle, disablePulse = false }) => {
  return (
    <motion.button
      type="button"
      aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      onClick={onToggle}
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileTap={{ scale: 0.94 }}
      className={clsx(
        'fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/80 shadow-soft transition-colors sm:bottom-7 sm:right-7',
        isPlaying ? 'bg-mist/85 text-ink' : 'bg-white/80 text-ink/65',
      )}
    >
      <span className="absolute -top-7 whitespace-nowrap rounded-full bg-white/80 px-3 py-1 text-[0.65rem] font-medium tracking-[0.14em] text-ink/65 shadow-sm">
        {isPlaying ? 'Đang phát' : 'Đã tắt'}
      </span>
      {isPlaying ? <FiMusic className="text-xl" /> : <FiVolumeX className="text-xl" />}
      {isPlaying && !disablePulse && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-roseblue/30" />}
    </motion.button>
  );
};

export default MusicControl;
