import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeIntro from './components/EnvelopeIntro';
import MusicControl from './components/MusicControl';
import FloatingOrnaments from './components/FloatingOrnaments';
import FallingPetals from './components/FallingPetals';
import BackgroundRoses from './components/BackgroundRoses';
import HeroSection from './sections/HeroSection';
import InvitationDialogSection from './sections/InvitationDialogSection';
import CoupleInfoSection from './sections/CoupleInfoSection';
import AlbumSection from './sections/AlbumSection';
import ScheduleSection from './sections/ScheduleSection';
import LocationSection from './sections/LocationSection';
import GiftSection from './sections/GiftSection';
import Footer from './sections/Footer';
import { weddingData } from './data/weddingData';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import { formatShortDate } from './utils/date';

const App = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { isPlaying, playRandomTrack, toggle } = useMusicPlayer(weddingData.musicList);

  useEffect(() => {
    const title = `${weddingData.groomName} & ${weddingData.brideName} | ${formatShortDate(weddingData.weddingDate)}`;
    document.title = title;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', weddingData.shortMessage);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute('content', weddingData.shortMessage);
  }, []);

  const handleOpenStart = () => {
    playRandomTrack();
  };

  const handleOpenComplete = () => {
    setIsOpened(true);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <AnimatePresence mode="wait">
        {!isOpened && (
          <EnvelopeIntro
            key="envelope"
            data={weddingData}
            onOpenStart={handleOpenStart}
            onOpenComplete={handleOpenComplete}
          />
        )}
      </AnimatePresence>

      {isOpened && <BackgroundRoses />}

      {isOpened && (
        <motion.main
          key="main-content"
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <HeroSection data={weddingData} />
          <InvitationDialogSection data={weddingData} />
          <CoupleInfoSection couple={weddingData.couple} />
          <AlbumSection album={weddingData.album} />
          <ScheduleSection data={weddingData} />
          <LocationSection location={weddingData.location} />
          <GiftSection bankInfo={weddingData.bankInfo} />
          <Footer data={weddingData} />
        </motion.main>
      )}

      {isOpened && <MusicControl isPlaying={isPlaying} onToggle={toggle} />}
      {isOpened && <FloatingOrnaments />}
      {isOpened && <FallingPetals />}
    </div>
  );
};

export default App;
