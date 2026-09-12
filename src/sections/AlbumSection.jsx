import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import SectionReveal from '../components/SectionReveal';
import ImageLightbox from '../components/ImageLightbox';
import ResponsiveImage from '../components/ResponsiveImage';
import { useMediaQuery } from '../hooks/useMediaQuery';

const spanClass = {
  tall: 'md:row-span-2 md:min-h-[520px]',
  wide: 'md:col-span-2 md:min-h-[300px]',
  normal: 'md:min-h-[300px]',
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const getImageSizes = (span) => {
  if (span === 'wide') return '(min-width: 1152px) 560px, (min-width: 768px) 50vw, calc(100vw - 40px)';
  return '(min-width: 1152px) 280px, (min-width: 768px) 25vw, calc(100vw - 40px)';
};

const AlbumSection = ({ album }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <SectionReveal className="px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-sageblue">Gallery</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-7xl">Album ảnh</h2>
          </div>
          {/* <p className="max-w-md text-sm leading-7 text-ink/60">Những khung hình nhẹ nhàng với sắc xanh dương nhạt, trắng ngà và xanh xám pastel.</p> */}
        </div>

        <motion.div
          className="mt-9 grid grid-cols-1 gap-4 md:auto-rows-[260px] md:grid-cols-4 md:gap-5"
          variants={gridVariants}
          initial={isMobile ? false : 'hidden'}
          animate={isMobile ? 'visible' : undefined}
          whileInView={isMobile ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.18 }}
        >
          {album.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              variants={imageVariants}
              whileHover={isMobile ? undefined : { y: -4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={clsx(
                'group relative overflow-hidden rounded-[1.6rem] border border-white/80 bg-white text-left shadow-card transition-shadow duration-500 ease-out hover:shadow-soft md:rounded-[1.8rem]',
                spanClass[image.span] || spanClass.normal,
              )}
            >
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={getImageSizes(image.span)}
                loading="eager"
                className="h-auto w-full object-contain transition duration-700 ease-out md:h-full md:object-cover md:group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/24 via-transparent to-white/10 opacity-70 transition duration-500 ease-out group-hover:opacity-90 md:block" />
            </motion.button>
          ))}
        </motion.div>
      </div>
      <ImageLightbox images={album} activeIndex={activeIndex} onClose={() => setActiveIndex(-1)} onChange={setActiveIndex} />
    </SectionReveal>
  );
};

export default AlbumSection;
