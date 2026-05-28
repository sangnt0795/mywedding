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
import { preloadImages } from './utils/assets';
import { formatShortDate } from './utils/date';

const App = () => {
  const [hasOpened, setHasOpened] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
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

  useEffect(() => {
    preloadImages(
      [
        weddingData.coverImage,
        weddingData.heroImage,
        '/images/blue-rose.webp',
        weddingData.couple.groom.image,
        weddingData.couple.bride.image,
        weddingData.location.previewImage,
        weddingData.bankInfo.qrImage,
        ...weddingData.album.map((image) => image.src),
      ],
      { concurrency: 2 },
    );
  }, []);

  const handleOpenStart = () => {
    setHasOpened(true);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
    playRandomTrack();
  };

  const handleOpenComplete = () => {
    setIsIntroVisible(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-paper text-ink">
      <AnimatePresence mode="wait">
        {isIntroVisible && (
          <EnvelopeIntro
            key="envelope"
            data={weddingData}
            onOpenStart={handleOpenStart}
            onOpenComplete={handleOpenComplete}
          />
        )}
      </AnimatePresence>

      {hasOpened && <BackgroundRoses />}

      <motion.main
        key="main-content"
        aria-hidden={!hasOpened}
        initial={false}
        animate={{ opacity: hasOpened ? 1 : 0 }}
        transition={{ duration: hasOpened ? 0.9 : 0, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 ${hasOpened ? '' : 'pointer-events-none select-none'}`}
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

      {hasOpened && <MusicControl isPlaying={isPlaying} onToggle={toggle} />}
      {hasOpened && <FloatingOrnaments />}
      {hasOpened && <FallingPetals />}
    </div>
  );
};

export default App;
