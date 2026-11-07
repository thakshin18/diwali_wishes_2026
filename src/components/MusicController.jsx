import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import sound from '../utils/soundEngine';

/**
 * Festive Ambient Sound & Music Controller
 */
const MusicController = ({ isAutoStarted = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isAutoStarted && !isPlaying) {
      sound.startFestiveMusic();
      setIsPlaying(true);
    }
  }, [isAutoStarted]);

  const handleToggleMusic = () => {
    sound.playSparkle();
    const playing = sound.toggleMusic();
    setIsPlaying(playing);
    if (playing && isMuted) {
      sound.setMuted(false);
      setIsMuted(false);
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    setIsMuted(muted);
    sound.playSparkle();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Sound Waves Animation badge */}
      <AnimatePresence>
        {isPlaying && !isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-festive-midnight/80 border border-festive-gold/30 backdrop-blur-md shadow-glow-gold"
          >
            <span className="text-[11px] font-medium tracking-wide text-festive-gold">
              Festive Ambience
            </span>
            <div className="flex items-end gap-[3px] h-3 ml-1">
              <span className="w-1 bg-festive-amber rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
              <span className="w-1 bg-festive-brightGold rounded-full animate-bounce [animation-delay:-0.15s] h-2" />
              <span className="w-1 bg-festive-saffron rounded-full animate-bounce h-3.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Music Toggle Button */}
      <div className="relative">
        <button
          onClick={handleToggleMusic}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`relative p-2.5 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-md border ${
            isPlaying && !isMuted
              ? 'bg-festive-violet/80 border-festive-gold text-festive-brightGold shadow-glow-gold'
              : 'bg-festive-midnight/80 border-festive-gold/30 text-slate-300 hover:text-festive-gold hover:border-festive-gold/60'
          }`}
          aria-label={isPlaying ? 'Pause Festive Music' : 'Play Festive Music'}
          title="Toggle Festive Music"
        >
          <div className="flex items-center justify-center">
            {isPlaying ? (
              <Disc className="w-5 h-5 animate-spin-slow text-festive-gold" />
            ) : (
              <Music className="w-5 h-5" />
            )}
          </div>
          
          {/* Subtle pulse ring when playing */}
          {isPlaying && !isMuted && (
            <span className="absolute inset-0 rounded-full border border-festive-gold/40 animate-ping opacity-40 pointer-events-none" />
          )}
        </button>

        {/* Small Mute Quick-Toggle icon */}
        {isPlaying && (
          <button
            onClick={handleToggleMute}
            className="absolute -bottom-1 -right-1 p-1 bg-festive-deepPurple border border-festive-gold/50 rounded-full text-festive-brightGold hover:scale-110 transition-transform shadow-md"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute Music' : 'Mute Music'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-festive-gold" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicController;

