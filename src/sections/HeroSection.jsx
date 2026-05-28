import { motion } from 'framer-motion';
import { FiCalendar, FiHeart } from 'react-icons/fi';
import CoupleNames from '../components/CoupleNames';
import { useCountdown } from '../hooks/useCountdown';
import { resolveAssetPath } from '../utils/assets';
import { formatWeddingDate } from '../utils/date';

const CountdownItem = ({ value, label }) => (
  <div className="rounded-[1.35rem] border border-white/70 bg-white/45 px-3 py-4 text-center shadow-sm backdrop-blur-md sm:px-5">
    <div className="font-display text-3xl leading-none text-ink sm:text-5xl">{String(value).padStart(2, '0')}</div>
    <div className="mt-2 text-[0.62rem] uppercase tracking-[0.24em] text-ink/55 sm:text-xs">{label}</div>
  </div>
);

const HeroSection = ({ data }) => {
  const countdown = useCountdown(data.weddingDate, data.ceremonyTime);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 text-ink sm:px-8 lg:px-14">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${resolveAssetPath(data.heroImage)})` }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1.14 }}
        transition={{ duration: 18, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,254,255,0.76),rgba(238,249,253,0.92)_58%,rgba(251,254,255,0.98))]" />
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-mist/45 blur-3xl" />
      <div className="absolute bottom-12 right-0 h-72 w-72 rounded-full bg-blush/55 blur-3xl" />

      <motion.div
        className="relative mx-auto w-full max-w-5xl text-center"
        initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/45 px-5 py-2 text-xs uppercase tracking-[0.28em] text-ink/65 shadow-sm backdrop-blur-md">
          <FiHeart className="text-sageblue" />
          {data.invitationText}
        </div>

        <h1 className="overflow-visible">
          <CoupleNames brideName={data.brideName} groomName={data.groomName} size="hero" />
        </h1>

        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-4 text-sm tracking-[0.24em] text-ink/60 sm:text-base">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-roseblue to-transparent" />
          <span>{formatWeddingDate(data.weddingDate)}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-roseblue to-transparent" />
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-ink/65 sm:text-base sm:leading-8">{data.shortMessage}</p>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
          <CountdownItem value={countdown.days} label="Ngày" />
          <CountdownItem value={countdown.hours} label="Giờ" />
          <CountdownItem value={countdown.minutes} label="Phút" />
          <CountdownItem value={countdown.seconds} label="Giây" />
        </div>

        <div className="mt-9 inline-flex items-center gap-3 rounded-full bg-white/50 px-5 py-3 text-sm text-ink/60 shadow-sm backdrop-blur">
          <FiCalendar className="text-sageblue" />
          Còn {countdown.days} ngày nữa đến lễ cưới
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
