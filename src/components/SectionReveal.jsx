import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useMediaQuery } from '../hooks/useMediaQuery';

const SectionReveal = ({ children, className = '', delay = 0, as: Tag = 'section' }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const MotionTag = motion[Tag] || motion.section;

  if (isMobile) {
    return <Tag className={clsx('relative', className)}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 24 }}
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
