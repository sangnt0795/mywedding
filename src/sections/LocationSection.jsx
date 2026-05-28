import { FiMapPin, FiNavigation, FiExternalLink } from 'react-icons/fi';
import SectionReveal from '../components/SectionReveal';
import { resolveAssetPath } from '../utils/assets';

const LocationSection = ({ location }) => {
  return (
    <SectionReveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] border border-champagne/80 bg-white/62 shadow-soft backdrop-blur">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative p-7 sm:p-10">
            <div className="absolute -left-20 top-10 h-48 w-48 rounded-full bg-blush/42 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.32em] text-sageblue">Location</p>
              <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-7xl">Địa điểm</h2>
              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-mist/55 text-sageblue">
                <FiMapPin className="text-2xl" />
              </div>
              <h3 className="mt-6 font-display text-4xl leading-tight text-ink sm:text-5xl">{location.name}</h3>
              <p className="mt-5 text-sm leading-7 text-ink/62 sm:text-base sm:leading-8">{location.address}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card transition hover:bg-sageblue"
                >
                  Chỉ đường
                  <FiNavigation />
                </a>
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-roseblue/50 bg-white/75 px-5 py-3 text-sm font-medium text-ink shadow-sm transition hover:bg-mist/45"
                >
                  Mở Google Maps
                  <FiExternalLink />
                </a>
              </div>
            </div>
          </div>

          <div className="min-h-[340px] border-t border-champagne/70 bg-porcelain lg:border-l lg:border-t-0">
            {location.mapEmbed ? (
              <iframe
                title={location.name}
                src={location.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[340px] w-full"
              />
            ) : (
              <img src={resolveAssetPath(location.previewImage)} alt={location.name} className="h-full min-h-[340px] w-full object-cover" loading="lazy" />
            )}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default LocationSection;
