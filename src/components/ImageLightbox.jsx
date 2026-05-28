import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { resolveAssetPath } from '../utils/assets';

const ImageLightbox = ({ images, activeIndex, onClose, onChange }) => {
  const activeImage = activeIndex >= 0 ? images[activeIndex] : null;

  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-4 py-8 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-full w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/25 bg-porcelain p-3 shadow-soft"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Đóng ảnh"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur"
            >
              <FiX />
            </button>
            <img
              src={resolveAssetPath(activeImage.src)}
              alt={activeImage.alt}
              className="max-h-[74vh] w-full rounded-[1.4rem] object-cover"
            />
            <p className="px-2 py-4 text-center text-sm text-ink/65">{activeImage.alt}</p>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Ảnh trước"
                  onClick={() => onChange((activeIndex - 1 + images.length) % images.length)}
                  className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur"
                >
                  <FiChevronLeft />
                </button>
                <button
                  type="button"
                  aria-label="Ảnh sau"
                  onClick={() => onChange((activeIndex + 1) % images.length)}
                  className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur"
                >
                  <FiChevronRight />
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
