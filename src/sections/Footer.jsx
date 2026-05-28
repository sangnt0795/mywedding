import SectionReveal from '../components/SectionReveal';
import CoupleNames from '../components/CoupleNames';
import { formatShortDate } from '../utils/date';

const Footer = ({ data }) => {
  return (
    <SectionReveal as="footer" className="px-5 pb-12 pt-10 text-center sm:px-8">
      <div className="mx-auto max-w-3xl rounded-[2.4rem] border border-champagne/80 bg-white/55 px-6 py-12 shadow-card backdrop-blur">
        <p className="text-xs uppercase tracking-[0.32em] text-sageblue">Thank you</p>
        <h2 className="mt-5 overflow-visible">
          <CoupleNames brideName={data.brideName} groomName={data.groomName} size="section" />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ink/62">
          Cảm ơn bạn đã dành thời gian yêu thương và chúc phúc cho ngày trọng đại của chúng tôi.
        </p>
        <div className="mx-auto mt-8 h-px w-36 bg-gradient-to-r from-transparent via-roseblue to-transparent" />
        <p className="mt-6 text-sm uppercase tracking-[0.26em] text-ink/50">{formatShortDate(data.weddingDate)}</p>
      </div>
    </SectionReveal>
  );
};

export default Footer;
