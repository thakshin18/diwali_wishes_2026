import React from 'react';
import { motion } from 'framer-motion';

/**
 * 7-Step Festive Journey Progress Bar
 */
const ProgressBar = ({ currentStep = 1, totalSteps = 7, onSelectStep = null }) => {
  const steps = [
    { id: 1, label: 'Welcome' },
    { id: 2, label: 'Greeting' },
    { id: 3, label: 'Surprise' },
    { id: 4, label: 'Wishes' },
    { id: 5, label: 'Diyas' },
    { id: 6, label: 'Celebration' },
    { id: 7, label: 'Blessings' },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-festive-midnight/70 backdrop-blur-md border border-festive-gold/20 shadow-md">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isPassed = step.id < currentStep;

        return (
          <button
            key={step.id}
            onClick={() => onSelectStep && onSelectStep(step.id)}
            disabled={!onSelectStep}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            title={`${step.label} (Step ${step.id} of ${totalSteps})`}
            aria-label={`${step.label} Step ${step.id}`}
          >
            <div
              className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                isActive
                  ? 'w-6 h-6 bg-gradient-to-tr from-festive-amber to-festive-brightGold shadow-glow-gold scale-110'
                  : isPassed
                  ? 'w-3 h-3 bg-festive-gold/70 hover:bg-festive-gold'
                  : 'w-2.5 h-2.5 bg-festive-royalPurple border border-festive-gold/30 opacity-60'
              }`}
            >
              {isActive && (
                <span className="text-[10px] font-bold text-festive-midnight">🪔</span>
              )}
            </div>

            {/* Hover Tooltip */}
            <span className="absolute -bottom-7 scale-0 group-hover:scale-100 transition-transform duration-200 text-[10px] bg-festive-deepPurple px-2 py-0.5 rounded border border-festive-gold/40 text-festive-brightGold whitespace-nowrap shadow-lg pointer-events-none">
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProgressBar;

