# ✨ Diwali Moments – A Little Light, A Lot of Happiness ✨

A premium, interactive, visually stunning Diwali Wishes Web Experience crafted with **React, Vite, Tailwind CSS, Framer Motion, and the Web Audio API**.

Designed specifically to be shared with family, relatives, and friends via **WhatsApp**, featuring personalized greetings, cinematic animations, interactive golden diyas, 3D gift unwrap, grand fireworks celebration, and ambient festive Indian music.

---

## 🌟 Key Highlights & Features

- 🪔 **Magical Welcome (Screen 1):** Central animated golden diya with dynamic flame flicker, floating golden stardust, and celebratory entrance.
- ❤️ **Personalized Greeting (Screen 2):** Tailored specifically for the recipient (e.g. `Hey, Family! ❤️`), relation-aware (Family, Friend, Relative, Special Person).
- 🎁 **The Diwali Surprise (Screen 3):** Interactive 3D golden gift box that unties its red silk ribbon, pops open with golden confetti, and reveals an illuminated treasure.
- 📜 **Heartfelt Diwali Wish (Screen 4):** Elegant animated typography with traditional blessing stanzas and optional custom sender message.
- 🪔 **Interactive Diyas (Screen 5):** 5 sacred traditional diyas to tap and illuminate, each unlocking uplifting virtues: *Spread Happiness*, *Share Love*, *Stay Blessed*, *Shine Bright*, and *Peace & Harmony*.
- 🎆 **Grand Fireworks Finale (Screen 6):** 60fps high-performance canvas fireworks spectacle with auto-launch mode and tap-to-launch rockets.
- 💌 **Final Greeting & WhatsApp Sharing (Screen 7):** Pre-formatted festive WhatsApp message generator via `wa.me`, direct copy-to-clipboard button with fallback, and quick replay.
- 🎵 **Festive Audio Synthesizer:** Built completely on the native Web Audio API — zero external audio dependencies or broken MP3 URLs. Features warm Tanpura/ambient Indian classical drone harmonies, gentle chime arpeggios, diya ignition whoosh, gift unwrap fanfare, and firework sound effects with a floating Mute/Unmute controller.
- 🪄 **Dynamic URL Personalization:** Supports URL query parameters (`?from=Thakshin&to=Family&rel=Family&msg=...`). Any recipient who opens the link sees their name and custom message immediately!

---

## 📁 Project Structure

```
diwali-wishes-2026/
├── index.html                     # HTML5 entry with Google Fonts & festive metadata
├── package.json                   # Dependencies & build scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Custom luxury colors, animations, & glows
├── postcss.config.js              # PostCSS autoprefixer & Tailwind integration
├── src/
│   ├── main.jsx                   # React application mount
│   ├── App.jsx                    # Master state machine & screen transitions (1–7)
│   ├── styles/
│   │   └── index.css              # Glassmorphism, gold gradients, & custom keyframes
│   ├── components/
│   │   ├── WelcomeScreen.jsx         # Screen 1: Magical Welcome & Central Diya
│   │   ├── PersonalizedWelcome.jsx   # Screen 2: Dynamic Greeting with Recipient Name
│   │   ├── GiftSurprise.jsx          # Screen 3: 3D Golden Gift Box Unwrap
│   │   ├── HeartfeltWish.jsx         # Screen 4: Animated Typography & Blessing Stanzas
│   │   ├── InteractiveDiyas.jsx      # Screen 5: 5 Sacred Interactive Diyas
│   │   ├── FireworksCelebration.jsx  # Screen 6: Interactive Multi-Color Canvas Fireworks
│   │   ├── FinalGreeting.jsx         # Screen 7: Sender Sign-off & WhatsApp Sharing
│   │   ├── DiyaAnimation.jsx         # Multi-layered glowing vector Diya (Oil Lamp)
│   │   ├── ParticleBackground.jsx    # Floating golden stardust & ember canvas
│   │   ├── RangoliDecorations.jsx    # Intricate golden Rangoli corner & mandala motifs
│   │   ├── MusicController.jsx       # Floating audio player with sound wave visualizer
│   │   ├── PersonalizationModal.jsx  # Modal for customizing Sender, Receiver, Relation & Message
│   │   └── ProgressBar.jsx           # 7-Step festive journey indicator
│   └── utils/
│       ├── soundEngine.js            # Web Audio API ambient drone & procedural sound effects
│       ├── urlParams.js              # URL parameter extractor & WhatsApp share generator
│       └── fireworksEngine.js        # High-performance canvas fireworks engine
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm** or **yarn**

### 2. Installation
Open your terminal in the project directory:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### 4. Build for Production
To create an optimized, minified production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

---

## 📲 How WhatsApp Sharing Works

1. Open the website and click **"Customize Wish"** (or tap **"2. Create Another Wish"** on Screen 7).
2. Enter:
   - **Your Name (Sender)**
   - **Receiver's Name** (e.g., *Uncle Ramesh*, *Pooja*, *My Dearest Friend*)
   - **Relationship** (Family, Friend, Relative, Someone Special, Colleague, Bestie)
   - **Optional Custom Message**
3. Click **"Share on WhatsApp"**.
4. WhatsApp will open with a pre-formatted festive message containing your personalized URL:
   ```text
   ✨ Happy Diwali 2026! 🪔✨

   Dear Pooja, I have created a special magical Diwali surprise just for you! 🎁

   May your life be illuminated with endless joy, wealth, health, and prosperity!

   👉 Click here to open your surprise:
   https://your-domain.vercel.app/?from=Thakshin&to=Pooja&rel=Friend

   With love & warm wishes,
   Thakshin ❤️
   ```
5. When Pooja taps the link, the website will automatically address her by name on Screen 2, display the heartfelt wish, and show it is sent from you!

---

## 🌐 Deploying Online (Free & Fast)

To share this website with friends and family worldwide through WhatsApp, deploy the `dist/` build to any free modern static hosting platform:

### Option A: Vercel (Recommended - 1 Click)
1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**. Your site will be live instantly on `https://your-project.vercel.app`!

### Option B: Netlify
1. Drag and drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Your site is live immediately!

### Option C: GitHub Pages
1. In `vite.config.js`, set `base: './'`.
2. Run `npm run build` and deploy the `dist/` folder to GitHub Pages.

---

## 🎨 Creative & Technical Polish

- **Cultural Aesthetics:** Deep midnight purple background (`#07010f`), royal violet gradients, warm saffron/amber lighting, and golden rangoli accents.
- **Micro-interactions:** Interactive tap-to-brighten Diyas, reactive sound synthesis, floating motes, and smooth spring physics.
- **Mobile-First Responsiveness:** Optimized touch targets, thumb-friendly buttons, and zero horizontal scrolling on all iPhone, Android, and tablet devices.
- **Resilient Audio:** Never fails due to missing MP3 assets; synthesized directly in the browser using the Web Audio API.

---

*Wishing you and your loved ones a blessed, prosperous, and joyful Diwali! 🪔✨*

