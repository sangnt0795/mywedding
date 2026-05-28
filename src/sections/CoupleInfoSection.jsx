import { motion } from 'framer-motion';
import { FiHeart, FiHome, FiUser } from 'react-icons/fi';
import SectionReveal from '../components/SectionReveal';
import { resolveAssetPath } from '../utils/assets';

const ProfileCard = ({ profile, align = 'left' }) => {
  return (
    <motion.article
      className="relative overflow-hidden rounded-[2.3rem] border border-champagne/80 bg-white/70 p-5 shadow-card sm:p-6"
      initial={{ opacity: 0, y: 42, rotate: align === 'left' ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-mist/35 blur-3xl" />
      <div className="grid gap-5 sm:grid-cols-[0.88fr_1fr] sm:items-center">
        <motion.div
          className="relative overflow-hidden rounded-[1.8rem] bg-porcelain shadow-sm"
          whileInView={{ scale: [0.98, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <img
            src={resolveAssetPath(profile.image)}
            alt={profile.name}
            loading="lazy"
            decoding="async"
            className="h-80 w-full object-cover sm:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/24 via-transparent to-white/12" />
        </motion.div>

        <div className="relative text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.32em] text-sageblue">{profile.label}</p>
          <p className="mt-5 text-sm uppercase tracking-[0.22em] text-ink/45">{profile.role}</p>
          <h3 className="mt-2 whitespace-nowrap font-display text-[clamp(2.4rem,10vw,4.3rem)] leading-none text-ink">
            {profile.name}
          </h3>
          <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-roseblue to-transparent sm:mx-0" />
          <div className="mt-6 space-y-4 text-sm leading-7 text-ink/62">
            <p className="inline-flex items-center justify-center gap-2 sm:justify-start">
              <FiHome className="text-sageblue" />
              {profile.family}
            </p>
            <p className="inline-flex items-center justify-center gap-2 sm:justify-start">
              <FiUser className="text-sageblue" />
              {profile.parents}
            </p>
            <p>{profile.description}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const CoupleInfoSection = ({ couple }) => {
  return (
    <SectionReveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-sageblue">The Bride & The Groom</p>
          <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-7xl">Thông tin cô dâu chú rể</h2>
          <p className="mt-6 text-sm leading-7 text-ink/62 sm:text-base sm:leading-8">
            Hai gia đình trân trọng báo tin vui và kính mời bạn đến chung vui trong ngày hạnh phúc.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ProfileCard profile={couple.groom} align="left" />
          <ProfileCard profile={couple.bride} align="right" />
        </div>

        <motion.div
          className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-full border border-roseblue/40 bg-white/70 px-5 py-3 text-center text-sm text-ink/60 shadow-sm"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiHeart className="shrink-0 text-sageblue" />
          Đúng người, đúng thời điểm, đúng một đời bên nhau.
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default CoupleInfoSection;
