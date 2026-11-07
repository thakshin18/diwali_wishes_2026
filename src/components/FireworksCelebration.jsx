import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight, Play } from 'lucide-react';
import { FireworksShow } from '../utils/fireworksEngine';
import sound from '../utils/soundEngine';
import confetti from 'canvas-confetti';

/**
 * Screen 6: Full Festive Fireworks Celebration
 */
const FireworksCelebration = ({ onNext, greetingData }) => {
  const canvasRef = useRef(null);
  const fireworksRef = useRef(null);
  const [burstCount, setBurstCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fw = new FireworksShow(canvas);
    fireworksRef.current = fw;
    fw.start(true);

    // Initial celebratory audio pops
    sound.playFirework();
    setTimeout(() => sound.playFirework(), 600);
    setTimeout(() => sound.playFirework(), 1200);

    return () => {
      fw.stop();
    };
  }, []);

  const handleCanvasClick = (e) => {
    if (!canvasRef.current || !fireworksRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    fireworksRef.current.launch(x, y);
    sound.playFirework();
    setBurstCount((c) => c + 1);
  };

  const handleReplayFireworks = () => {
    sound.playFirework();
    if (fireworksRef.current) {
      fireworksRef.current.launch();
      setTimeout(() => fireworksRef.current?.launch(), 200);
      setTimeout(() => fireworksRef.current?.launch(), 400);
    }

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#ff006e', '#3a86ff', '#06d6a0', '#ffbe0b'],
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 w-full max-w-4xl mx-auto select-none">
      {/* Interactive Canvas Overlay */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-crosshair z-0"
        title="Tap anywhere to launch fireworks!"
      />

      {/* Main Festive Glowing Banner */}
      <div className="relative z-10 pointer-events-none mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-festive-midnight/80 border border-festive-gold/40 backdrop-blur-md mb-4 shadow-glow-gold pointer-events-auto"
        >
          <Sparkles className="w-4 h-4 text-festive-brightGold animate-spin-slow" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-festive-brightGold uppercase">
            Grand Deepavali Spectacle
          </span>
          <Sparkles className="w-4 h-4 text-festive-brightGold animate-spin-slow" />
        </motion.div>

        {/* Huge Animated Radiant Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: [1, 1.03, 1],
          }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-gold-shine tracking-wider leading-none drop-shadow-[0_0_35px_rgba(255,209,92,0.6)]"
        >
          HAPPY DIWALI! 🎆
        </motion.h1>

        {/* Subtitle / Blessing */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display italic text-lg sm:text-2xl text-slate-200 mt-4 max-w-xl mx-auto drop-shadow-md font-light"
        >
          May the sky of your life sparkle with infinite success, laughter, and prosperity!
        </motion.p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
        <button
          onClick={handleReplayFireworks}
          className="btn-gold-outline px-6 py-3 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 backdrop-blur-md shadow-md"
          aria-label="Replay Fireworks Show"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Launch More Fireworks 🎆</span>
        </button>

        <button
          onClick={() => {
            sound.playSparkle();
            onNext();
          }}
          className="btn-gold-festive px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold tracking-wider flex items-center gap-2 shadow-glow-flame group"
          aria-label="View Final Greeting & Wishes"
        >
          <span>Final Greeting & Wishes</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Tap hint */}
      <p className="relative z-10 text-xs text-festive-gold/70 mt-5 pointer-events-none">
        💡 Tap anywhere on the screen to launch custom firecracker rockets!
      </p>
    </div>
  );
};

export default FireworksCelebration;

