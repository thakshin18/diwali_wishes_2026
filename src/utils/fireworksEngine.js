/**
 * High-performance Canvas Fireworks Engine for Diwali Moments 2026
 * Supports auto-burst grand finale, multi-color explosions, crackle sparkles,
 * and interactive tap-to-launch fireworks.
 */

export class FireworksShow {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.rockets = [];
    this.animationFrame = null;
    this.isRunning = false;
    this.autoLaunchInterval = null;
    this.colors = [
      '#ffd700', // Gold
      '#ff6b6b', // Crimson
      '#4ecdc4', // Cyan
      '#ffbe0b', // Amber Gold
      '#fb5607', // Deep Orange
      '#ff006e', // Magenta
      '#8338ec', // Violet
      '#3a86ff', // Electric Blue
      '#06d6a0', // Festive Emerald
    ];

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  launch(targetX, targetY) {
    const startX = targetX ? targetX + (Math.random() * 40 - 20) : this.width * (0.2 + Math.random() * 0.6);
    const startY = this.height;
    const destX = targetX || this.width * (0.15 + Math.random() * 0.7);
    const destY = targetY || this.height * (0.15 + Math.random() * 0.45);
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];

    this.rockets.push(new Rocket(startX, startY, destX, destY, color));
  }

  explode(x, y, color) {
    const particleCount = 45 + Math.floor(Math.random() * 30);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  start(autoLaunch = true) {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();

    if (autoLaunch) {
      // Immediate burst
      this.launch();
      setTimeout(() => this.launch(), 200);
      setTimeout(() => this.launch(), 450);

      this.autoLaunchInterval = setInterval(() => {
        if (!this.isRunning) return;
        this.launch();
        if (Math.random() > 0.4) {
          setTimeout(() => this.launch(), 250);
        }
      }, 750);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.autoLaunchInterval) {
      clearInterval(this.autoLaunchInterval);
      this.autoLaunchInterval = null;
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    window.removeEventListener('resize', this.resize);
  }

  animate() {
    if (!this.isRunning) return;

    // Soft trail clear effect
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'lighter';

    // Update and draw rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const rocket = this.rockets[i];
      rocket.update();
      rocket.draw(this.ctx);

      if (rocket.hasReachedTarget()) {
        this.explode(rocket.x, rocket.y, rocket.color);
        this.rockets.splice(i, 1);
      }
    }

    // Update and draw explosion particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);

      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }

    this.animationFrame = requestAnimationFrame(this.animate);
  }
}

class Rocket {
  constructor(x, y, targetX, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;

    const angle = Math.atan2(targetY - y, targetX - x);
    const distance = Math.hypot(targetX - x, targetY - y);
    const speed = Math.max(7, distance / 32);

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.history = [];
  }

  update() {
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 5) this.history.shift();

    this.x += this.vx;
    this.y += this.vy;
  }

  hasReachedTarget() {
    return this.vy < 0 ? this.y <= this.targetY : this.y >= this.targetY;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (this.history.length > 0) {
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }
    } else {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.vx, this.y - this.vy);
    }
    ctx.stroke();

    // Glowing head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5.5 + 1.2;

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.gravity = 0.08;
    this.friction = 0.96;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.012;
    this.radius = Math.random() * 2.2 + 1;
    this.shimmer = Math.random() > 0.4;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  isDead() {
    return this.alpha <= 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Shimmer sparkle
    if (this.shimmer && Math.random() > 0.5) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

