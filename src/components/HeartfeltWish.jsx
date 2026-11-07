import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import sound from '../utils/soundEngine';

/**
 * Screen 4: Heartfelt Diwali Wish with Staggered Typography
 */
const HeartfeltWish = ({ onNext, greetingData }) => {
  const receiverName = greetingData?.receiver || 'Beloved Family & Friends';
  const customMessage = greetingData?.customMessage;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const handleNext = () => {
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-3xl mx-auto">
      {/* Decorative Traditional Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mb-4"
      >
        <span className="text-3xl sm:text-4xl">🪔 🌸 🪔</span>
        <h2 className="font-cinzel text-xl sm:text-3xl font-bold text-festive-brightGold tracking-wider mt-2">
          Blessings of Light & Prosperity
        </h2>
      </motion.div>

      {/* Main Glassmorphism Wish Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-festive-glass rounded-3xl p-6 sm:p-12 border border-festive-gold/30 shadow-card-lux relative overflow-hidden"
      >
        {/* Subtle Radial Glow */}
        <div className="absolute -bottom-10 right-0 w-60 h-60 bg-festive-saffron/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-0 w-60 h-60 bg-festive-violet/25 rounded-full blur-3xl pointer-events-none" />

        {/* Receiver Callout */}
        <motion.p
          variants={itemVariants}
          className="font-script text-2xl sm:text-3xl text-festive-gold mb-4"
        >
          Dedicated with warmth to {receiverName}
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-festive-gold to-transparent mx-auto mb-6"
        />

        {/* Stanza 1 */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-xl text-slate-100 font-light leading-relaxed mb-6"
        >
          May this Diwali bring <span className="font-medium text-festive-brightGold">endless happiness</span>,
          <br className="hidden sm:inline" /> beautiful memories, good health,
          <br className="hidden sm:inline" /> success, peace, and prosperity into your life.
        </motion.p>

        {/* Stanza 2 */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base sm:text-xl text-slate-100 font-light leading-relaxed mb-6"
        >
          May every diya <span className="text-festive-amber font-normal">remove darkness</span>,
          <br className="hidden sm:inline" /> every sparkle bring hope,
          <br className="hidden sm:inline" /> and every moment fill your heart with joy.
        </motion.p>

        {/* Optional Custom Message from Sender */}
        {customMessage && (
          <motion.div
            variants={itemVariants}
            className="my-5 p-4 rounded-xl bg-festive-royalPurple/40 border border-festive-gold/25 text-sm sm:text-base text-festive-brightGold italic font-serif"
          >
            "{customMessage}"
          </motion.div>
        )}

        {/* Stanza 3 / Conclusion */}
        <motion.div variants={itemVariants} className="pt-2">
          <p className="font-display text-lg sm:text-2xl font-bold text-gold-gradient tracking-wide">
            Wishing you and your family
            <br />
            a very Happy and Prosperous Diwali! 🪔❤️
          </p>
        </motion.div>
      </motion.div>

      {/* Button to proceed to Interactive Diyas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <button
          onClick={handleNext}
          className="btn-gold-festive px-8 sm:px-10 py-3.5 rounded-full text-base sm:text-lg font-semibold tracking-wider flex items-center gap-3 group"
          aria-label="Light the Sacred Diyas"
        >
          <span>Light the Sacred Diyas 🪔</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
        <p className="text-xs text-festive-gold/60">Continue the celebration</p>
      </motion.div>
    </div>
  );
};

export default HeartfeltWish;

