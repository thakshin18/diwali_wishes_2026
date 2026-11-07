import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, ArrowRight, Heart } from 'lucide-react';
import sound from '../utils/soundEngine';
import confetti from 'canvas-confetti';

/**
 * Screen 3: The Diwali Surprise - 3D Golden Gift Box Unwrap
 */
const GiftSurprise = ({ onNext, greetingData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUnwrap = () => {
    if (isOpen) {
      onNext();
      return;
    }
    setIsOpen(true);
    sound.playGiftUnwrap();

    // Golden Celebration Confetti Burst
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ffb703', '#ff6200', '#ffffff', '#e63946'],
      ticks: 200,
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-2xl mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <span className="font-script text-3xl sm:text-4xl text-festive-brightGold block mb-2">
          A Token of Festive Love
        </span>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
          There's a Little Surprise Waiting for You!
        </h2>
      </motion.div>

      {/* 3D Golden Gift Box Container */}
      <div className="relative my-6 sm:my-8 flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
        {/* Glow behind the box */}
        <motion.div
          animate={{
            scale: isOpen ? [1, 1.4, 1.2] : [1, 1.15, 1],
            opacity: isOpen ? 0.9 : 0.45,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-festive-amber via-festive-brightGold to-festive-flame blur-2xl pointer-events-none"
        />

        {/* Gift Box Graphic */}
        <div
          onClick={handleUnwrap}
          className="relative cursor-pointer group select-none"
          title="Click to unwrap the gift!"
          role="button"
          tabIndex={0}
          aria-label="Diwali Gift Box"
        >
          {/* Light Rays bursting from open box */}
          {isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.8, 1.3, 1.1], opacity: [0.6, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-t from-festive-gold via-festive-brightGold to-transparent rounded-full blur-xl pointer-events-none"
            />
          )}

          {/* SVG Gift Box with Ribbon & Bow */}
          <svg
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-56 h-56 sm:w-64 sm:h-64 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          >
            <defs>
              <linearGradient id="giftBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd15c" />
                <stop offset="35%" stopColor="#e5a912" />
                <stop offset="85%" stopColor="#9e6c00" />
                <stop offset="100%" stopColor="#6e4a00" />
              </linearGradient>

              <linearGradient id="giftLid" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffe680" />
                <stop offset="40%" stopColor="#f5b822" />
                <stop offset="100%" stopColor="#9e6c00" />
              </linearGradient>

              <linearGradient id="ribbonRed" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff4d6d" />
                <stop offset="50%" stopColor="#c9184a" />
                <stop offset="100%" stopColor="#800f2f" />
              </linearGradient>
            </defs>

            {/* Gift Inside Reveal Floating Element */}
            {isOpen && (
              <g className="animate-bounce">
                <circle cx="120" cy="80" r="32" fill="#ffe680" opacity="0.9" filter="drop-shadow(0 0 10px #ffb703)" />
                <text x="120" y="88" fontSize="26" textAnchor="middle" fill="#000">🪔</text>
              </g>
            )}

            {/* Gift Box Base */}
            <rect
              x="50"
              y="110"
              width="140"
              height="100"
              rx="12"
              fill="url(#giftBody)"
              stroke="#ffe680"
              strokeWidth="2"
            />

            {/* Vertical Base Ribbon */}
            <rect x="106" y="110" width="28" height="100" fill="url(#ribbonRed)" />
            <line x1="120" y1="110" x2="120" y2="210" stroke="#ffccd5" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Subtle base shadow */}
            <ellipse cx="120" cy="218" rx="70" ry="12" fill="#000000" opacity="0.5" />

            {/* Gift Box Lid with Motion (pops and tilts when opened) */}
            <g
              style={{
                transform: isOpen
                  ? 'translate(-20px, -55px) rotate(-18deg)'
                  : 'translate(0px, 0px) rotate(0deg)',
                transformOrigin: '50px 110px',
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Lid Box */}
              <rect
                x="42"
                y="85"
                width="156"
                height="32"
                rx="8"
                fill="url(#giftLid)"
                stroke="#ffe680"
                strokeWidth="2"
              />

              {/* Lid Ribbon */}
              <rect x="106" y="85" width="28" height="32" fill="url(#ribbonRed)" />

              {/* Luxury Bow */}
              {/* Left loop */}
              <path
                d="M120 85 C100 55 60 60 75 80 C88 95 110 85 120 85 Z"
                fill="url(#ribbonRed)"
                stroke="#ffccd5"
                strokeWidth="1.5"
              />
              {/* Right loop */}
              <path
                d="M120 85 C140 55 180 60 165 80 C152 95 130 85 120 85 Z"
                fill="url(#ribbonRed)"
                stroke="#ffccd5"
                strokeWidth="1.5"
              />
              {/* Bow Center knot */}
              <circle cx="120" cy="85" r="9" fill="#ff4d6d" stroke="#ffccd5" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      {/* Action Button & Revealed Message */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="unwrap-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={handleUnwrap}
              className="btn-gold-festive px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg font-semibold tracking-wider flex items-center gap-3 shadow-glow-flame"
              aria-label="Unwrap Your Happiness"
            >
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
              <span>Unwrap Your Happiness 🎁</span>
            </button>
            <p className="text-xs text-festive-gold/70">(Click the button or tap the gift box)</p>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <div className="bg-festive-glass border border-festive-gold/50 p-6 rounded-2xl max-w-md shadow-card-lux">
              <span className="text-3xl block mb-2">✨ 🪔 ✨</span>
              <h3 className="font-display text-xl font-bold text-festive-brightGold mb-2">
                A Treasure of Joy & Blessings!
              </h3>
              <p className="text-sm text-slate-200">
                A pure heart's prayer brings the sweetest light. Here is our heartfelt wish for you!
              </p>
            </div>

            <button
              onClick={() => {
                sound.playSparkle();
                onNext();
              }}
              className="btn-gold-festive px-8 sm:px-10 py-3.5 rounded-full text-base sm:text-lg font-semibold tracking-wider flex items-center gap-3 group shadow-glow-gold"
              aria-label="Read Heartfelt Wish"
            >
              <span>Read Your Diwali Wish</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftSurprise;

