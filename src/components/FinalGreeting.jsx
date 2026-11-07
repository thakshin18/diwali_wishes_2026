import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Edit3, Copy, Check, Sparkles, Heart } from 'lucide-react';
import DiyaAnimation from './DiyaAnimation';
import sound from '../utils/soundEngine';
import { generateWhatsAppLink, buildShareableUrl, copyToClipboard } from '../utils/urlParams';
import confetti from 'canvas-confetti';

/**
 * Screen 7: Final Greeting & Sharing Suite
 */
const FinalGreeting = ({ greetingData, onReplay, onOpenPersonalize }) => {
  const [copied, setCopied] = useState(false);
  const senderName = greetingData?.sender || 'Thakshin';
  const receiverName = greetingData?.receiver || 'Beloved Family & Friends';

  const handleShareWhatsApp = () => {
    sound.playSparkle();
    const link = generateWhatsAppLink(greetingData);
    window.open(link, '_blank');
  };

  const handleCopyLink = async () => {
    sound.playSparkle();
    const url = buildShareableUrl(greetingData);
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffd700', '#ffb703', '#ffffff'],
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 z-10 max-w-2xl mx-auto">
      {/* Decorative Diya at Top */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mb-4"
      >
        <DiyaAnimation size="lg" isLit={true} glowLevel={1.5} />
      </motion.div>

      {/* Main Blessing Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-festive-glass rounded-3xl p-6 sm:p-10 border border-festive-gold/30 shadow-card-lux mb-8 relative overflow-hidden"
      >
        {/* Heart Icon Floating Accent */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 mb-3 shadow-inner">
          <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
        </div>

        <h2 className="font-script text-3xl sm:text-5xl text-festive-gold mb-2">
          With Love & Best Wishes
        </h2>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-festive-gold to-transparent mx-auto my-4" />

        <p className="font-cinzel text-lg sm:text-2xl text-slate-100 font-semibold mb-2">
          From:{' '}
          <span className="text-gold-gradient text-xl sm:text-3xl font-bold">
            {senderName}
          </span>
        </p>

        <p className="font-display italic text-base sm:text-xl text-festive-brightGold font-light mt-3">
          “May your days always be filled with light!”
        </p>

        {/* Receiver dedication reminder */}
        <p className="text-xs text-festive-gold/70 mt-5">
          Sent with immense joy to <span className="font-medium text-white">{receiverName}</span>
        </p>
      </motion.div>

      {/* Primary Action Buttons (Prompt Requirement: 1. Share on WhatsApp, 2. Create Another Wish, 3. Replay Experience) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full space-y-3 sm:space-y-4"
      >
        {/* 1. Share This Wish on WhatsApp */}
        <button
          onClick={handleShareWhatsApp}
          className="w-full btn-gold-festive py-4 px-6 rounded-2xl text-base sm:text-lg font-bold tracking-wide flex items-center justify-center gap-3 shadow-glow-flame group"
          aria-label="Share This Wish on WhatsApp"
        >
          <Share2 className="w-5 h-5 text-white" />
          <span>1. Share This Wish on WhatsApp 📲</span>
        </button>

        {/* Copy Link Quick Action */}
        <button
          onClick={handleCopyLink}
          className="w-full btn-gold-outline py-3 px-6 rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
          aria-label="Copy Shareable Link"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 font-bold">Personalized Link Copied to Clipboard! ✨</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-festive-brightGold" />
              <span>Copy Direct Greeting Link 🔗</span>
            </>
          )}
        </button>

        {/* Secondary Row: Create Another Wish + Replay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* 2. Create Another Wish */}
          <button
            onClick={() => {
              sound.playSparkle();
              onOpenPersonalize();
            }}
            className="py-3 px-4 rounded-xl bg-festive-midnight/80 border border-festive-gold/40 text-festive-brightGold hover:border-festive-gold hover:bg-festive-deepPurple transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            aria-label="Create Another Wish"
          >
            <Edit3 className="w-4 h-4" />
            <span>2. Create Another Wish ✍️</span>
          </button>

          {/* 3. Replay the Experience */}
          <button
            onClick={() => {
              sound.playSparkle();
              onReplay();
            }}
            className="py-3 px-4 rounded-xl bg-festive-midnight/80 border border-festive-gold/40 text-slate-200 hover:text-white hover:border-festive-gold hover:bg-festive-deepPurple transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            aria-label="Replay the Experience"
          >
            <RotateCcw className="w-4 h-4 text-festive-gold" />
            <span>3. Replay Experience 🔄</span>
          </button>
        </div>
      </motion.div>

      {/* Helpful Deployment & Sharing note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.8 }}
        className="text-[11px] text-slate-400 mt-6 max-w-md mx-auto"
      >
        💡 When hosted online (e.g., on Vercel, Netlify, or GitHub Pages), WhatsApp recipients will instantly see your customized greeting upon tapping the link!
      </motion.p>
    </div>
  );
};

export default FinalGreeting;

