import React from 'react';

/**
 * Traditional Indian Rangoli & Toran Decorative SVGs
 * Adds royal heritage, elegance, and festive warmth to the experience.
 */
export const RangoliCorner = ({ position = 'top-left' }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-x-[-1] scale-y-[-1]';
      default:
        return '';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      default:
        return 'top-0 left-0';
    }
  };

  return (
    <div
      className={`fixed ${getPositionClasses()} ${getTransforms()} pointer-events-none z-10 w-28 h-28 sm:w-44 sm:h-44 opacity-25 hover:opacity-40 transition-opacity duration-700`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-festive-gold"
      >
        <path
          d="M0 0 L180 0 C140 30 110 70 90 120 C70 90 30 70 0 60 Z"
          fill="url(#goldGradientCorner)"
          opacity="0.15"
        />
        {/* Outer ornate curves */}
        <path
          d="M0 20 C60 25 100 65 110 120"
          stroke="url(#goldGradientStroke)"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <path
          d="M20 0 C25 60 65 100 120 110"
          stroke="url(#goldGradientStroke)"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        {/* Petal arcs */}
        <circle cx="20" cy="20" r="12" stroke="url(#goldGradientStroke)" strokeWidth="1.5" />
        <circle cx="55" cy="25" r="8" stroke="url(#goldGradientStroke)" strokeWidth="1" />
        <circle cx="25" cy="55" r="8" stroke="url(#goldGradientStroke)" strokeWidth="1" />
        <circle cx="85" cy="40" r="6" fill="url(#goldGradientStroke)" />
        <circle cx="40" cy="85" r="6" fill="url(#goldGradientStroke)" />
        <circle cx="120" cy="120" r="4" fill="#ffd15c" />
        {/* Intricate corner flourishes */}
        <path
          d="M0 140 C50 130 90 90 140 0"
          stroke="url(#goldGradientStroke)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="goldGradientCorner" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd15c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldGradientStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe680" />
            <stop offset="50%" stopColor="#ffd15c" />
            <stop offset="100%" stopColor="#ff9900" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const SubtleMandalaBackdrop = () => {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] opacity-[0.06] animate-spin-slow"
      aria-hidden="true"
    >
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="250" cy="250" r="230" stroke="#ffd15c" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="250" cy="250" r="180" stroke="#ffd15c" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="130" stroke="#ffd15c" strokeWidth="2" strokeDasharray="4 8" />
        <circle cx="250" cy="250" r="80" stroke="#ffd15c" strokeWidth="1" />
        {/* 12 radial petals */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M250 70 C240 120 230 180 250 250 C270 180 260 120 250 70 Z"
                fill="#ffd15c"
                opacity="0.25"
              />
              <circle cx="250" cy="90" r="6" fill="#ffd15c" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
