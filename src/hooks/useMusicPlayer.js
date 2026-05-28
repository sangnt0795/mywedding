import { useCallback, useEffect, useRef, useState } from 'react';
import { resolveAssetPath } from '../utils/assets';

export const useMusicPlayer = (musicList = []) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');

  const pickRandomTrack = useCallback(() => {
    if (!musicList.length) return '';
    const randomIndex = Math.floor(Math.random() * musicList.length);
    return resolveAssetPath(musicList[randomIndex]);
  }, [musicList]);

  const playTrack = useCallback(
    async (track = pickRandomTrack()) => {
      if (!track) return;

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
        audioRef.current.preload = 'auto';
      }

      audioRef.current.src = track;
      audioRef.current.volume = 0.48;
      setCurrentTrack(track);

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    },
    [pickRandomTrack],
  );

  const toggle = useCallback(async () => {
    if (!audioRef.current || !currentTrack) {
      await playTrack();
      return;
    }

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  }, [currentTrack, playTrack]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return { isPlaying, currentTrack, playRandomTrack: playTrack, toggle };
};
