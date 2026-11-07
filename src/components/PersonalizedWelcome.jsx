import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Gift } from 'lucide-react';
import sound from '../utils/soundEngine';

/**
 * Screen 2: Personalized Welcome
 */
const PersonalizedWelcome = ({ onNext, greetingData }) => {
  const receiverName = greetingData?.receiver || 'Beloved Family & Friends';
  const senderName = greetingData?.sender || 'Thakshin';
  const relation = greetingData?.relation || 'Family';

  const handleContinue = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-2xl mx-auto">
      {/* Decorative Envelope/Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-festive-royalPurple/50 border border-festive-gold/40 backdrop-blur-md mb-6 shadow-glow-gold"
      >
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
        <span className="text-xs sm:text-sm font-medium tracking-wide text-festive-brightGold">
          Personalized Diwali Wish for {relation}
        </span>
        <Sparkles className="w-4 h-4 text-festive-gold" />
      </motion.div>

      {/* Main Glass Card Greeting Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-festive-glass rounded-3xl p-6 sm:p-10 border border-festive-gold/30 shadow-card-lux relative overflow-hidden"
      >
        {/* Soft Background Radial Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-44 bg-festive-amber/15 rounded-full blur-3xl pointer-events-none" />

        {/* Personalized Receiver Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="font-script text-3xl sm:text-4xl text-festive-gold block mb-1">
            Warmest Festive Greetings
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
            Hey,{' '}
            <span className="text-gold-gradient underline decoration-festive-gold/40 decoration-wavy">
              {receiverName}
            </span>
            ! <span className="inline-block animate-pulse">❤️</span>
          </h2>
        </motion.div>

        {/* Beautiful Festival Blessing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative py-4"
        >
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-festive-gold to-transparent mx-auto mb-6" />
          <p className="font-sans text-lg sm:text-2xl text-slate-200 leading-relaxed font-light">
            “On this beautiful festival of lights,
            <br />
            <span className="font-medium text-festive-brightGold">
              may your life shine brighter than ever!
            </span>”
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-festive-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* From Sender Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs sm:text-sm text-festive-gold/70 mt-4 tracking-wide"
        >
          Specially crafted with love by{' '}
          <span className="text-festive-brightGold font-medium">{senderName}</span>
        </motion.p>
      </motion.div>

      {/* Continue CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-8"
      >
        <button
          onClick={handleContinue}
          className="btn-gold-festive px-8 sm:px-10 py-3.5 rounded-full text-base sm:text-lg font-semibold tracking-wider flex items-center gap-3 group"
          aria-label="Continue to Diwali Surprise"
        >
          <Gift className="w-5 h-5 text-yellow-200" />
          <span>See What's Next 🎁</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

export default PersonalizedWelcome;

