import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiGift, FiMaximize2, FiX } from 'react-icons/fi';
import CopyButton from '../components/CopyButton';
import SectionReveal from '../components/SectionReveal';
import { resolveAssetPath } from '../utils/assets';

const GiftSection = ({ bankInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionReveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-4xl rounded-[2.4rem] border border-champagne/80 bg-white/60 p-6 shadow-card backdrop-blur sm:p-9">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist/55 text-sageblue">
              <FiGift className="text-xl" />
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.32em] text-sageblue">Wedding Gift</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">Mừng cưới</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/62">
              Nếu bạn muốn gửi lời chúc qua chuyển khoản, thông tin được đặt nhỏ gọn tại đây để không ảnh hưởng bố cục thiệp.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group justify-self-start rounded-[1.6rem] border border-roseblue/40 bg-porcelain p-3 shadow-sm transition hover:-translate-y-1 sm:justify-self-end"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-[1.1rem] bg-white sm:h-36 sm:w-36">
              <img
                src={resolveAssetPath(bankInfo.qrImage)}
                alt="QR mừng cưới"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 text-white opacity-0 transition group-hover:bg-ink/28 group-hover:opacity-100">
                <FiMaximize2 className="text-2xl" />
              </div>
            </div>
          </button>
        </div>

        <div className="mt-7 grid gap-3 rounded-[1.8rem] bg-porcelain p-5 text-sm text-ink/70 sm:grid-cols-3">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-ink/42">Ngân hàng</p>
            <p className="mt-1 font-medium text-ink">{bankInfo.bankName}</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-ink/42">Chủ tài khoản</p>
            <p className="mt-1 font-medium text-ink">{bankInfo.accountName}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-ink/42">Số tài khoản</p>
            <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-2 rounded-full border border-roseblue/35 bg-white/60 py-1.5 pl-4 pr-1.5">
              <p className="min-w-0 text-center font-semibold tracking-[0.08em] text-ink sm:text-left">{bankInfo.accountNumber}</p>
              <CopyButton value={bankInfo.accountNumber} label="Sao chép" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-sm rounded-[2rem] bg-porcelain p-5 shadow-soft"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Đóng QR"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm"
              >
                <FiX />
              </button>
              <img
                src={resolveAssetPath(bankInfo.qrImage)}
                alt="QR mừng cưới phóng to"
                decoding="async"
                className="w-full rounded-[1.4rem] bg-white"
              />
              <p className="mt-4 text-center text-sm text-ink/60">{bankInfo.bankName} · {bankInfo.accountName}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
};

export default GiftSection;
