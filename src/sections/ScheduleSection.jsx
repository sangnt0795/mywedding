import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiExternalLink, FiHeart, FiMapPin } from 'react-icons/fi';
import SectionReveal from '../components/SectionReveal';
import CoupleNames from '../components/CoupleNames';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useCountdown } from '../hooks/useCountdown';
import { createGoogleCalendarUrl, formatShortDate, formatWeddingDate, getWeddingDateTime } from '../utils/date';

const weekDays = ['HAI', 'BA', 'TƯ', 'NĂM', 'SÁU', 'BẢY', 'CN'];

const buildCalendarDays = (weddingDate) => {
  const target = getWeddingDateTime(weddingDate);
  const year = target.getFullYear();
  const month = target.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const mondayOffset = firstDay === 0 ? 6 : firstDay - 1;
  const days = Array.from({ length: mondayOffset }, (_, index) => ({ key: `empty-${index}`, empty: true }));

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({ key: `day-${day}`, day, active: day === target.getDate() });
  }

  return days;
};

const CountdownItem = ({ value, label }) => (
  <div className="rounded-[1.25rem] bg-porcelain px-2 py-4 text-center shadow-sm">
    <div className="font-display text-3xl leading-none text-ink sm:text-5xl">{String(value).padStart(2, '0')}</div>
    <div className="mt-2 text-[0.62rem] uppercase tracking-[0.2em] text-ink/48">{label}</div>
  </div>
);

const ScheduleSection = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const countdown = useCountdown(data.weddingDate, data.ceremonyTime);
  const weddingDate = getWeddingDateTime(data.weddingDate);
  const calendarDays = buildCalendarDays(data.weddingDate);
  const calendarUrl = createGoogleCalendarUrl({
    brideName: data.brideName,
    groomName: data.groomName,
    weddingDate: data.weddingDate,
    ceremonyTime: data.ceremonyTime,
    location: data.location,
    timezone: data.timezone,
  });

  return (
    <SectionReveal className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.32em] text-sageblue">Invitation</p>
          <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-7xl">Lịch cưới</h2>
          <div className="mt-5 overflow-visible">
            <CoupleNames brideName={data.brideName} groomName={data.groomName} size="card" />
          </div>
          <div className="mt-7 space-y-2 text-sm leading-7 text-ink/62 sm:text-base sm:leading-8">
            {data.invitation.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-champagne/80 bg-white/70 p-7 shadow-card sm:p-9">
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-mist/40 blur-3xl" />
            <div className="relative">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-[1.3rem] bg-porcelain px-3 py-4 shadow-sm">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-ink/42">Năm</p>
                  <p className="mt-1 font-display text-4xl text-ink">{weddingDate.getFullYear()}</p>
                </div>
                <div className="rounded-[1.3rem] bg-mist/55 px-3 py-4 shadow-sm">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-ink/42">Ngày</p>
                  <p className="mt-1 font-display text-4xl text-ink">{String(weddingDate.getDate()).padStart(2, '0')}</p>
                </div>
                <div className="rounded-[1.3rem] bg-porcelain px-3 py-4 shadow-sm">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-ink/42">Tháng</p>
                  <p className="mt-1 font-display text-4xl text-ink">{String(weddingDate.getMonth() + 1).padStart(2, '0')}</p>
                </div>
              </div>

              <div className="mt-7 rounded-[1.8rem] border border-roseblue/35 bg-porcelain p-6 text-center shadow-sm">
                <FiCalendar className="mx-auto text-3xl text-sageblue" />
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-ink/45">{formatWeddingDate(data.weddingDate)}</p>
                <p className="mt-2 font-display text-6xl leading-none text-ink sm:text-7xl">{formatShortDate(data.weddingDate).slice(0, 5)}</p>
                <p className="mt-2 text-sm tracking-[0.2em] text-nude">{formatShortDate(data.weddingDate).slice(6)}</p>
                <p className="mt-4 text-xs text-ink/52">{data.invitation.lunarDate}</p>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
                <CountdownItem value={countdown.days} label="Ngày" />
                <CountdownItem value={countdown.hours} label="Giờ" />
                <CountdownItem value={countdown.minutes} label="Phút" />
                <CountdownItem value={countdown.seconds} label="Giây" />
              </div>

              <a
                href={calendarUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-card transition hover:bg-sageblue"
              >
                Thêm vào Google Calendar
                <FiExternalLink />
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2.2rem] border border-champagne/80 bg-white/65 p-5 shadow-card sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-sageblue">Calendar</p>
                  <h3 className="mt-2 font-display text-5xl leading-none text-ink">Tháng {weddingDate.getMonth() + 1}</h3>
                </div>
                <p className="rounded-full bg-mist/50 px-4 py-2 text-sm font-medium text-ink/65">{weddingDate.getFullYear()}</p>
              </div>

              <div className="mt-7 grid grid-cols-7 gap-2 text-center text-[0.62rem] font-medium tracking-[0.18em] text-ink/42">
                {weekDays.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {calendarDays.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={isMobile ? false : { opacity: 0, y: 12 }}
                    whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.012 }}
                    className={item.empty ? 'aspect-square' : 'relative flex aspect-square items-center justify-center rounded-2xl bg-porcelain text-sm text-ink/68 shadow-sm'}
                  >
                    {!item.empty && (
                      <>
                        {item.active && <span className="absolute inset-0 rounded-2xl bg-mist shadow-glow" />}
                        <span className="relative z-10">{item.day}</span>
                        {item.active && <FiHeart className="absolute -right-1 -top-1 z-10 text-sm text-[#5f91a5]" />}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {data.schedule.map((item) => (
                <article key={item.label} className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist/55 text-sageblue">
                    <FiClock />
                  </div>
                  <p className="mt-6 text-sm uppercase tracking-[0.22em] text-ink/45">{item.label}</p>
                  <h3 className="mt-2 font-display text-5xl text-ink">{item.time}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink/60">{item.note}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[2rem] border border-roseblue/35 bg-white/70 p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist/55 text-sageblue">
                  <FiMapPin />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-ink/45">Thời gian hôn lễ / Time</p>
                  <p className="mt-2 text-sm leading-7 text-ink/65">
                    Vào lúc {data.ceremonyTime} {formatWeddingDate(data.weddingDate)} tại {data.location.name}, {data.invitation.venueNote}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default ScheduleSection;
