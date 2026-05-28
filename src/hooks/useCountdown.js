import { useEffect, useMemo, useState } from 'react';
import { getWeddingDateTime } from '../utils/date';

const getRemainingTime = (targetDate) => {
  const diff = Math.max(targetDate.getTime() - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: diff === 0 };
};

export const useCountdown = (date, time) => {
  const targetDate = useMemo(() => getWeddingDateTime(date, time), [date, time]);
  const [remaining, setRemaining] = useState(() => getRemainingTime(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemainingTime(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return remaining;
};
