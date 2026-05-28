import { motion } from 'framer-motion';
import { FiHeart, FiMail } from 'react-icons/fi';
import SectionReveal from '../components/SectionReveal';
import CoupleNames from '../components/CoupleNames';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { resolveAssetPath } from '../utils/assets';

const InvitationDialogSection = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <SectionReveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          className="relative order-2 overflow-hidden rounded-[2.4rem] border border-white/80 bg-white/55 p-3 shadow-soft lg:order-1"
          initial={isMobile ? false : { opacity: 0, rotate: -2, y: 48 }}
          whileInView={isMobile ? undefined : { opacity: 1, rotate: 0, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -left-16 -top-16 h-44 w-44 rounded-full bg-mist/45 blur-3xl" />
          <img
            src={resolveAssetPath(data.album[0].src)}
            alt={data.album[0].alt}
            loading="lazy"
            decoding="async"
            className="relative h-[430px] w-full rounded-[2rem] object-cover sm:h-[560px]"
          />
          <motion.div
            className="absolute bottom-8 left-8 right-8 rounded-[1.7rem] border border-white/70 bg-porcelain/90 p-5 text-center shadow-card"
            initial={isMobile ? false : { opacity: 0, y: 28 }}
            whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-sageblue">Save the Date</p>
            <CoupleNames brideName={data.brideName} groomName={data.groomName} size="card" className="mt-3" />
          </motion.div>
        </motion.div>

        <div className="order-1 text-center lg:order-2">
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-roseblue/35 bg-white/75 px-5 py-2 text-xs uppercase tracking-[0.28em] text-ink/55 shadow-sm">
            <FiMail className="text-sageblue" />
            A little note
          </div>
          <div className="mt-8 space-y-3">
            {data.dialogue.map((line, index) => (
              <motion.p
                key={line}
                className="font-display text-[2rem] leading-tight text-ink sm:text-[2.65rem]"
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <motion.div
            className="mx-auto mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-mist/60 text-sageblue shadow-glow"
            animate={isMobile ? undefined : { scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
            transition={isMobile ? undefined : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiHeart className="text-xl" />
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default InvitationDialogSection;
