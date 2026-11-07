import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Traditional Indian Diya (Oil Lamp)
 * Features dynamic multi-layered flickering flame, realistic light halo,
 * and ornate golden clay base.
 */
const DiyaAnimation = ({
  isLit = true,
  size = 'md',
  glowLevel = 1,
  showHalo = true,
  className = '',
  onClick = null,
}) => {
  // Dimensions map
  const sizeMap = {
    sm: { width: 80, height: 70, flameHeight: 28 },
    md: { width: 130, height: 110, flameHeight: 46 },
    lg: { width: 180, height: 150, flameHeight: 64 },
    xl: { width: 240, height: 200, flameHeight: 85 },
  };

  const { width, height } = sizeMap[size] || sizeMap.md;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      style={{ width, height }}
      role={onClick ? 'button' : 'img'}
      aria-label={isLit ? 'Lit Diwali Diya' : 'Unlit Diwali Diya'}
    >
      {/* Radial Flame Light Halo */}
      {isLit && showHalo && (
        <motion.div
          animate={{
            scale: [1 * glowLevel, 1.15 * glowLevel, 0.98 * glowLevel, 1 * glowLevel],
            opacity: [0.65 * glowLevel, 0.85 * glowLevel, 0.6 * glowLevel, 0.65 * glowLevel],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-6 rounded-full pointer-events-none"
          style={{
            width: width * 1.5,
            height: width * 1.5,
            background:
              'radial-gradient(circle, rgba(255, 170, 0, 0.45) 0%, rgba(255, 90, 0, 0.22) 40%, rgba(255, 215, 0, 0.08) 65%, transparent 80%)',
            filter: 'blur(16px)',
          }}
        />
      )}

      {/* SVG Container for Flame + Brass Diya Vessel */}
      <svg
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Flame Gradients */}
          <radialGradient id="flameInner" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fff3a1" />
            <stop offset="70%" stopColor="#ffb703" />
            <stop offset="100%" stopColor="#fb8500" />
          </radialGradient>

          <linearGradient id="flameOuter" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ff5400" />
            <stop offset="60%" stopColor="#ff9e00" />
            <stop offset="100%" stopColor="#ffd166" />
          </linearGradient>

          {/* Diya Body Brass/Gold Gradient */}
          <linearGradient id="diyaGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe680" />
            <stop offset="25%" stopColor="#d4a318" />
            <stop offset="65%" stopColor="#8a5a00" />
            <stop offset="90%" stopColor="#573800" />
            <stop offset="100%" stopColor="#301d00" />
          </linearGradient>

          <linearGradient id="diyaRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff2a1" />
            <stop offset="50%" stopColor="#ffd15c" />
            <stop offset="100%" stopColor="#b38200" />
          </linearGradient>

          <radialGradient id="oilPool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe37a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#bf7300" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5e3000" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* FLAME SECTION */}
        {isLit ? (
          <g className="animate-flame-flicker origin-bottom" style={{ transformOrigin: '80px 72px' }}>
            {/* Outer Flame Teardrop */}
            <path
              d="M80 18 C70 38 62 52 64 68 C66 79 73 85 80 85 C87 85 94 79 96 68 C98 52 90 38 80 18 Z"
              fill="url(#flameOuter)"
              opacity="0.9"
            />
            {/* Middle Flame */}
            <path
              d="M80 26 C73 43 68 54 70 68 C71 77 75 81 80 81 C85 81 89 77 90 68 C92 54 87 43 80 26 Z"
              fill="url(#flameInner)"
            />
            {/* White-Hot Core Spark */}
            <path
              d="M80 44 C76 54 74 62 75 72 C76 77 78 79 80 79 C82 79 84 77 85 72 C86 62 84 54 80 44 Z"
              fill="#ffffff"
              opacity="0.95"
            />
            {/* Tiny blue base flame */}
            <ellipse cx="80" cy="74" rx="4" ry="2.5" fill="#3a86ff" opacity="0.7" />
          </g>
        ) : (
          /* Unlit Wick */
          <path
            d="M80 73 C79 66 82 62 81 58"
            stroke="#261b11"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* DIYA VESSEL BASE */}
        {/* Under shadow */}
        <ellipse cx="80" cy="120" rx="48" ry="10" fill="#000000" opacity="0.45" />

        {/* Diya Lower Pedestal / Base Rim */}
        <path
          d="M60 114 C60 120 70 124 80 124 C90 124 100 120 100 114 Z"
          fill="#8a5a00"
        />

        {/* Main Diya Bowl Curved Body */}
        <path
          d="M26 76 C32 108 55 120 80 120 C105 120 128 108 134 76 C134 76 110 82 80 82 C50 82 26 76 26 76 Z"
          fill="url(#diyaGold)"
        />

        {/* Top Rim Oval Surface with Oil Pool */}
        <ellipse cx="80" cy="76" rx="54" ry="12" fill="url(#diyaRim)" />
        <ellipse cx="80" cy="76" rx="47" ry="9" fill="url(#oilPool)" />

        {/* Ornate Engraving details along the rim */}
        {[...Array(9)].map((_, i) => {
          const cx = 38 + i * 10.5;
          return <circle key={i} cx={cx} cy={82} r="1.5" fill="#ffe680" opacity="0.8" />;
        })}

        {/* Spout tip where wick sits */}
        <path
          d="M74 72 C77 69 83 69 86 72 C84 75 76 75 74 72 Z"
          fill="#ff9e00"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default DiyaAnimation;

