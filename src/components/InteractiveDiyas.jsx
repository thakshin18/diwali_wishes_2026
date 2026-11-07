import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import DiyaAnimation from './DiyaAnimation';
import sound from '../utils/soundEngine';
import confetti from 'canvas-confetti';

const DIYA_ITEMS = [
  { id: 1, title: 'Spread Happiness', subtitle: 'Joy & Laughter', icon: '✨' },
  { id: 2, title: 'Share Love', subtitle: 'Kindness & Warmth', icon: '💖' },
  { id: 3, title: 'Stay Blessed', subtitle: 'Good Health & Grace', icon: '🙏' },
  { id: 4, title: 'Shine Bright', subtitle: 'Success & Wisdom', icon: '🌟' },
  { id: 5, title: 'Peace & Harmony', subtitle: 'Calm & Prosperity', icon: '🪷' },
];

/**
 * Screen 5: Interactive Diyas - Tap to light and bless
 */
const InteractiveDiyas = ({ onNext }) => {
  // Initially, first diya can be lit, or all unlit so user enjoys lighting each one!
  const [litDiyas, setLitDiyas] = useState({ 1: true });
  const [activeMessage, setActiveMessage] = useState('Spread Happiness');

  const handleLightDiya = (diya) => {
    sound.playDiyaLight();
    setActiveMessage(diya.title);

    setLitDiyas((prev) => {
      const updated = { ...prev, [diya.id]: true };
      const allLit = DIYA_ITEMS.every((item) => updated[item.id]);
      if (allLit && Object.keys(prev).length < DIYA_ITEMS.length) {
        // Grand celebration when all diyas are illuminated
        setTimeout(() => {
          confetti({
            particleCount: 70,
            spread: 90,
            origin: { y: 0.65 },
            colors: ['#ffd700', '#ffb703', '#ff6200', '#ffffff'],
          });
        }, 300);
      }
      return updated;
    });
  };

  const litCount = Object.keys(litDiyas).length;
  const isAllLit = litCount === DIYA_ITEMS.length;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-4xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-4"
      >
        <span className="font-script text-3xl sm:text-4xl text-festive-brightGold block mb-1">
          Festival of Lights
        </span>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
          Illuminate the Five Sacred Diyas
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mt-2">
          Tap each sacred diya to kindle its flame and receive a special Diwali blessing.
        </p>
      </motion.div>

      {/* Progress Counter */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-midnight/80 border border-festive-gold/30 backdrop-blur-md mb-8 text-xs sm:text-sm font-medium text-festive-brightGold shadow-sm">
        {isAllLit ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>All Diyas Illuminated! May darkness never touch your path.</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-festive-amber animate-spin-slow" />
            <span>{litCount} of {DIYA_ITEMS.length} Diyas Lit – Tap to light the rest!</span>
          </>
        )}
      </div>

      {/* Diyas Row / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 w-full justify-items-center mb-8">
        {DIYA_ITEMS.map((item, index) => {
          const isLit = Boolean(litDiyas[item.id]);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLightDiya(item)}
              className={`w-full max-w-[170px] flex flex-col items-center p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                isLit
                  ? 'bg-festive-royalPurple/40 border-festive-gold/60 shadow-glow-flame'
                  : 'bg-festive-midnight/60 border-festive-gold/20 hover:border-festive-gold/40 opacity-70 hover:opacity-90'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Light Diya for ${item.title}`}
            >
              {/* Diya Visual */}
              <div className="h-24 sm:h-28 flex items-center justify-center">
                <DiyaAnimation
                  size="sm"
                  isLit={isLit}
                  glowLevel={isLit ? 1.4 : 0.4}
                  showHalo={isLit}
                />
              </div>

              {/* Title & Blessing Tag */}
              <span className="text-xs sm:text-sm font-semibold text-festive-brightGold tracking-wide mt-2">
                {item.title}
              </span>
              <span className="text-[11px] text-slate-300 mt-0.5">
                {item.subtitle}
              </span>

              {/* Lit Status indicator */}
              <div className="mt-2 text-[10px] font-medium tracking-wider uppercase">
                {isLit ? (
                  <span className="text-festive-amber flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-festive-brightGold animate-ping" />
                    Glowing
                  </span>
                ) : (
                  <span className="text-slate-400">Tap to light</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Message Highlight Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMessage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-festive-glass border border-festive-gold/30 px-6 py-3 rounded-full shadow-glow-gold mb-8 inline-flex items-center gap-2"
        >
          <span className="text-lg">🪔</span>
          <span className="text-sm sm:text-base font-display text-white">
            Blessing: <span className="text-gold-gradient font-bold">{activeMessage}</span>
          </span>
          <span className="text-lg">✨</span>
        </motion.div>
      </AnimatePresence>

      {/* Button to Proceed to Fireworks Celebration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => {
            sound.playFirework();
            onNext();
          }}
          className="btn-gold-festive px-8 sm:px-10 py-3.5 rounded-full text-base sm:text-lg font-semibold tracking-wider flex items-center gap-3 group shadow-glow-flame"
          aria-label="Proceed to Fireworks Celebration"
        >
          <span>Grand Fireworks Celebration 🎆</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

export default InteractiveDiyas;

