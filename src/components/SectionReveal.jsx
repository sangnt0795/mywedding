import { motion } from 'framer-motion';
import clsx from 'clsx';

const SectionReveal = ({ children, className = '', delay = 0, as: Tag = 'section' }) => {
  const MotionTag = motion[Tag] || motion.section;

  return (
    <MotionTag
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={clsx('relative', className)}
    >
      {children}
    </MotionTag>
  );
};

export default SectionReveal;
