import React, { useEffect, useRef } from 'react';

/**
 * Magical Floating Golden Particles & Festive Stardust Background
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Number of particles adapted to screen size
    const particleCount = Math.min(Math.floor((width * height) / 14000), 70);
    const particles = [];

    const colors = [
      'rgba(255, 215, 0, ', // Gold
      'rgba(255, 179, 0, ', // Amber
      'rgba(255, 240, 180, ', // Light Gold Spark
      'rgba(255, 98, 0, ', // Saffron
      'rgba(255, 120, 200, ', // Rose Sparkle
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.2,
        alpha: 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.15, // Gentle upward drift like diya embers
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Sinusoidal pulsing glow
        const currentAlpha = p.baseAlpha + Math.sin(time * 2 + p.pulseOffset) * 0.25;
        const safeAlpha = Math.max(0.05, Math.min(0.9, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${safeAlpha})`;
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};

export default ParticleBackground;

