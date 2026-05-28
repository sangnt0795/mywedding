const pad = (value) => String(value).padStart(2, '0');

export const getWeddingDateTime = (date, time = '00:00') => {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hour || 0, minute || 0, 0);
};

export const formatWeddingDate = (date) => {
  const weddingDate = getWeddingDateTime(date);
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(weddingDate);
};

export const formatShortDate = (date) => {
  const weddingDate = getWeddingDateTime(date);
  return `${pad(weddingDate.getDate())}.${pad(weddingDate.getMonth() + 1)}.${weddingDate.getFullYear()}`;
};

export const createGoogleCalendarUrl = ({
  brideName,
  groomName,
  weddingDate,
  ceremonyTime,
  location,
  timezone = 'Asia/Ho_Chi_Minh',
}) => {
  const start = getWeddingDateTime(weddingDate, ceremonyTime);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const format = (date) =>
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Lễ cưới ${groomName} & ${brideName}`,
    dates: `${format(start)}/${format(end)}`,
    ctz: timezone,
    details: 'Trân trọng kính mời bạn đến dự lễ cưới của chúng tôi.',
    location: `${location.name}, ${location.address}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
