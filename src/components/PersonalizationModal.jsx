import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, Check, Share2, Eye, User, HeartHandshake, MessageSquare } from 'lucide-react';
import { RELATION_OPTIONS, buildShareableUrl, generateWhatsAppLink, copyToClipboard } from '../utils/urlParams';
import sound from '../utils/soundEngine';

/**
 * Personalization Modal with Live Preview and Shareable URL Generator
 */
const PersonalizationModal = ({ isOpen, onClose, currentGreeting, onSaveGreeting }) => {
  const [formData, setFormData] = useState({
    sender: currentGreeting.sender || '',
    receiver: currentGreeting.receiver || '',
    relation: currentGreeting.relation || 'Family',
    customMessage: currentGreeting.customMessage || '',
  });

  const [copied, setCopied] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyLink = async () => {
    sound.playSparkle();
    const shareUrl = buildShareableUrl(formData);
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    sound.playSparkle();
    onSaveGreeting(formData);
    const link = generateWhatsAppLink(formData);
    window.open(link, '_blank');
  };

  const handleApply = () => {
    sound.playSparkle();
    onSaveGreeting(formData);
    onClose();
  };

  if (!isOpen) return null;

  const generatedUrl = buildShareableUrl(formData);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-festive-dark/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-festive-midnight/95 border border-festive-gold/40 rounded-3xl p-6 sm:p-8 shadow-card-lux my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white bg-festive-royalPurple/40 hover:bg-festive-royalPurple border border-festive-gold/20 transition-all"
            aria-label="Close Personalization Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-2xl block mb-1">✨ 🪔 ✨</span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-festive-brightGold">
              Personalize Your Diwali Surprise
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Create a unique greeting link to share with loved ones via WhatsApp!
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 text-left">
            {/* Sender Name */}
            <div>
              <label className="block text-xs font-medium text-festive-gold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Your Name (Sender)
              </label>
              <input
                type="text"
                name="sender"
                value={formData.sender}
                onChange={handleChange}
                placeholder="e.g. Thakshin"
                maxLength={40}
                className="w-full px-4 py-2.5 rounded-xl bg-festive-deepPurple/60 border border-festive-gold/30 text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold focus:ring-1 focus:ring-festive-gold transition-all text-sm"
              />
            </div>

            {/* Receiver Name */}
            <div>
              <label className="block text-xs font-medium text-festive-gold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Receiver's Name
              </label>
              <input
                type="text"
                name="receiver"
                value={formData.receiver}
                onChange={handleChange}
                placeholder="e.g. Grandma, Rahul, Sharma Family"
                maxLength={50}
                className="w-full px-4 py-2.5 rounded-xl bg-festive-deepPurple/60 border border-festive-gold/30 text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold focus:ring-1 focus:ring-festive-gold transition-all text-sm"
              />
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-xs font-medium text-festive-gold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" /> Relationship
              </label>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-festive-deepPurple/80 border border-festive-gold/30 text-white focus:outline-none focus:border-festive-gold transition-all text-sm"
              >
                {RELATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-festive-deepPurple text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-xs font-medium text-festive-gold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Custom Diwali Message (Optional)
              </label>
              <textarea
                name="customMessage"
                value={formData.customMessage}
                onChange={handleChange}
                rows={3}
                placeholder="Write a sweet personal wish or memory..."
                maxLength={250}
                className="w-full px-4 py-2.5 rounded-xl bg-festive-deepPurple/60 border border-festive-gold/30 text-white placeholder-slate-400 focus:outline-none focus:border-festive-gold focus:ring-1 focus:ring-festive-gold transition-all text-sm resize-none"
              />
              <span className="text-[10px] text-slate-400 block text-right">
                {formData.customMessage.length}/250 characters
              </span>
            </div>
          </div>

          {/* Toggle Live Preview */}
          <div className="mt-4">
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="text-xs text-festive-brightGold hover:underline flex items-center gap-1.5 font-medium"
            >
              <Eye className="w-3.5 h-3.5" />
              {showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}
            </button>

            {showLivePreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-4 rounded-xl bg-festive-deepPurple/80 border border-festive-gold/40 text-left text-xs text-slate-200"
              >
                <p className="font-semibold text-festive-brightGold mb-1">
                  Preview for: {formData.receiver || 'Receiver'} ({formData.relation})
                </p>
                <p className="italic">
                  “Hey, {formData.receiver || 'Friend'}! On this festival of lights, may your life shine brighter than ever!”
                </p>
                <p className="mt-2 text-festive-gold/80">From: {formData.sender || 'Sender'}</p>
              </motion.div>
            )}
          </div>

          {/* Generated Shareable Link Bar */}
          <div className="mt-5 p-3 rounded-xl bg-festive-dark border border-festive-gold/25 flex items-center justify-between gap-2">
            <div className="overflow-hidden text-left">
              <span className="text-[10px] uppercase font-bold text-festive-gold/80 block">
                Shareable Link
              </span>
              <p className="text-xs text-slate-300 font-mono truncate">
                {generatedUrl}
              </p>
            </div>
            <button
              onClick={handleCopyLink}
              className="btn-gold-outline px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shrink-0"
              title="Copy personalized link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 btn-gold-festive py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-glow-flame"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>
            <button
              onClick={handleApply}
              className="btn-gold-outline py-3 px-6 rounded-xl text-sm font-semibold text-festive-brightGold"
            >
              Apply Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PersonalizationModal;

