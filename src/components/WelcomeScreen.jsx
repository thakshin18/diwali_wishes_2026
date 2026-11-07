import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import DiyaAnimation from './DiyaAnimation';
import sound from '../utils/soundEngine';
import confetti from 'canvas-confetti';

/**
 * Screen 1: Magical Welcome
 */
const WelcomeScreen = ({ onNext, greetingData }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [glowLevel, setGlowLevel] = useState(1);

  const handleOpenSurprise = () => {
    if (isOpening) return;
    setIsOpening(true);
    setGlowLevel(2.2);

    sound.playDiyaLight();
    sound.startFestiveMusic();

    // Subtle celebratory golden sparkles
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ffd700', '#ffb703', '#ff6200', '#fff3b0'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      onNext();
    }, 900);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-3xl mx-auto">
      {/* Decorative Top Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-midnight/80 border border-festive-gold/30 backdrop-blur-md mb-6 shadow-md"
      >
        <Sparkles className="w-4 h-4 text-festive-brightGold animate-pulse" />
        <span className="text-xs sm:text-sm tracking-widest uppercase font-medium text-festive-brightGold">
          Shubh Deepavali 2026
        </span>
        <Sparkles className="w-4 h-4 text-festive-brightGold animate-pulse" />
      </motion.div>

      {/* Main Center Animated Diya with Interactive Tap */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="my-3 sm:my-5 relative"
      >
        <DiyaAnimation
          size="xl"
          glowLevel={glowLevel}
          isLit={true}
          onClick={() => {
            sound.playDiyaLight();
            setGlowLevel((prev) => (prev > 1.8 ? 1 : prev + 0.4));
          }}
        />
        <p className="text-[11px] text-festive-gold/60 mt-1 tracking-wider uppercase">
          (Tap the diya to brighten the flame)
        </p>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black text-gold-gradient tracking-tight leading-tight my-4"
      >
        A Little Light,
        <br />
        <span className="font-display italic font-bold text-white drop-shadow-[0_0_25px_rgba(255,209,92,0.4)]">
          A Lot of Happiness
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-sans text-base sm:text-xl text-slate-300 max-w-lg mb-8 font-light"
      >
        Something special is waiting for you...
      </motion.p>

      {/* Glowing CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <button
          onClick={handleOpenSurprise}
          disabled={isOpening}
          className="btn-gold-festive px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-semibold tracking-wider flex items-center gap-3 group"
          aria-label="Open Your Diwali Surprise"
        >
          <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
          <span>✨ Open Your Diwali Surprise ✨</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>

      {/* Subtle Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 text-xs text-festive-gold/60"
      >
        Turn on sound for the magical festive music 🎵
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;

