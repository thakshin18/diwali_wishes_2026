import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Sparkles } from 'lucide-react';

// Components
import WelcomeScreen from './components/WelcomeScreen';
import PersonalizedWelcome from './components/PersonalizedWelcome';
import GiftSurprise from './components/GiftSurprise';
import HeartfeltWish from './components/HeartfeltWish';
import InteractiveDiyas from './components/InteractiveDiyas';
import FireworksCelebration from './components/FireworksCelebration';
import FinalGreeting from './components/FinalGreeting';
import MusicController from './components/MusicController';
import ParticleBackground from './components/ParticleBackground';
import { RangoliCorner, SubtleMandalaBackdrop } from './components/RangoliDecorations';
import ProgressBar from './components/ProgressBar';
import PersonalizationModal from './components/PersonalizationModal';

// Utilities
import { getGreetingFromUrl, buildShareableUrl } from './utils/urlParams';
import sound from './utils/soundEngine';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [greetingData, setGreetingData] = useState(() => getGreetingFromUrl());
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  // Read URL params whenever location changes or on mount
  useEffect(() => {
    const data = getGreetingFromUrl();
    setGreetingData(data);
  }, []);

  const handleNextStep = () => {
    if (currentStep === 1 && !hasStartedMusic) {
      setHasStartedMusic(true);
    }
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectStep = (stepNumber) => {
    sound.playSparkle();
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    sound.playSparkle();
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveGreeting = (newGreeting) => {
    setGreetingData(newGreeting);
    // Update browser URL query params without reloading
    const newUrl = buildShareableUrl(newGreeting);
    window.history.replaceState({}, '', newUrl);
  };

  // Screen transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.4 } },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-radial-vignette flex flex-col justify-between selection:bg-festive-gold selection:text-festive-midnight">
      {/* 1. Ambient Background Layer */}
      <ParticleBackground />
      <SubtleMandalaBackdrop />
      <RangoliCorner position="top-left" />
      <RangoliCorner position="top-right" />
      <RangoliCorner position="bottom-left" />
      <RangoliCorner position="bottom-right" />

      {/* 2. Top Header Navigation Bar */}
      <header className="relative z-40 w-full px-4 pt-4 sm:pt-6 flex items-center justify-between">
        {/* Left: Quick Personalize Pill */}
        <button
          onClick={() => {
            sound.playSparkle();
            setIsPersonalizeOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-festive-midnight/80 border border-festive-gold/30 hover:border-festive-gold text-festive-brightGold hover:text-white backdrop-blur-md transition-all text-xs font-medium shadow-sm hover:scale-105 active:scale-95"
          title="Customize Names & Greeting"
          aria-label="Customize Greeting"
        >
          <Edit3 className="w-3.5 h-3.5 text-festive-gold" />
          <span className="hidden sm:inline">Customize Wish</span>
          <span className="sm:hidden">Edit</span>
        </button>

        {/* Center: Journey Progress Indicator */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={7}
          onSelectStep={handleSelectStep}
        />

        {/* Right: Music Controller */}
        <MusicController isAutoStarted={hasStartedMusic} />
      </header>

      {/* 3. Main Dynamic Step Content */}
      <main className="relative z-20 flex-1 flex items-center justify-center py-6 px-3 sm:px-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step-1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <WelcomeScreen onNext={handleNextStep} greetingData={greetingData} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step-2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <PersonalizedWelcome onNext={handleNextStep} greetingData={greetingData} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step-3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <GiftSurprise onNext={handleNextStep} greetingData={greetingData} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="step-4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <HeartfeltWish onNext={handleNextStep} greetingData={greetingData} />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div key="step-5" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <InteractiveDiyas onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div key="step-6" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <FireworksCelebration onNext={handleNextStep} greetingData={greetingData} />
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div key="step-7" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full">
              <FinalGreeting
                greetingData={greetingData}
                onReplay={handleReplay}
                onOpenPersonalize={() => setIsPersonalizeOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Elegant Festive Footer */}
      <footer className="relative z-20 pb-4 text-center text-xs text-festive-gold/60">
        <p className="flex items-center justify-center gap-1.5 font-light tracking-wider">
          <span>✨</span>
          <span>Diwali Moments 2026 – Designed with Love & Festive Joy</span>
          <span>✨</span>
        </p>
      </footer>

      {/* 5. Personalization Panel Modal */}
      <PersonalizationModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        currentGreeting={greetingData}
        onSaveGreeting={handleSaveGreeting}
      />
    </div>
  );
}

export default App;

