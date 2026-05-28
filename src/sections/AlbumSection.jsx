import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import SectionReveal from '../components/SectionReveal';
import ImageLightbox from '../components/ImageLightbox';
import { resolveAssetPath } from '../utils/assets';

const spanClass = {
  tall: 'sm:row-span-2 sm:min-h-[520px]',
  wide: 'sm:col-span-2 sm:min-h-[300px]',
  normal: 'sm:min-h-[300px]',
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

const AlbumSection = ({ album }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <SectionReveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-sageblue">Gallery</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-7xl">Album ảnh</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink/60">Những khung hình nhẹ nhàng với sắc xanh dương nhạt, trắng ngà và xanh xám pastel.</p>
        </div>

        <motion.div
          className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {album.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              variants={imageVariants}
              whileHover={{ y: -6 }}
              className={clsx(
                'group relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/50 text-left shadow-card',
                spanClass[image.span] || spanClass.normal,
              )}
            >
              <img
                src={resolveAssetPath(image.src)}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/38 via-transparent to-white/12 opacity-80 transition group-hover:opacity-95" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <p className="text-sm leading-6 text-white/92 drop-shadow">{image.alt}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
      <ImageLightbox images={album} activeIndex={activeIndex} onClose={() => setActiveIndex(-1)} onChange={setActiveIndex} />
    </SectionReveal>
  );
};

export default AlbumSection;
