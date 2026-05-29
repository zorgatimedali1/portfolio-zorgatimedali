# Technical Specification — Mohamed Ali Zorgati Portfolio

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | Vite React integration |
| typescript | ^5.6.0 | Type safety |
| tailwindcss | ^3.4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite plugin |
| gsap | ^3.12.0 | Animation engine, timelines, ScrollTrigger |
| lenis | ^1.1.0 | Smooth scroll with inertia |
| three | ^0.170.0 | WebGL renderer for curtain reveal & 3D carousel |
| @vfx-js/core | ^0.8.0 | WebGL shader pipeline for text scroll wave distortion |
| lucide-react | ^0.460.0 | Icon library |
| imagesloaded | ^5.0.0 | Image preload detection for layout stability |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | React DOM type definitions |
| @types/three | ^0.170.0 | Three.js type definitions |
| @types/imagesloaded | ^4.2.0 | imagesloaded type definitions |

### Fonts (loaded via Google Fonts CDN in index.html)

- Inter (weights: 400, 500, 600, 700, 800)
- Space Mono (weight: 500)

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navigation | Custom | Single | Fixed top bar with scroll-state transitions, mobile hamburger overlay. Scroll spy via IntersectionObserver. |
| Footer | Custom | Single | Minimal brand + copyright. No animations. |
| CustomCursor | Custom | Single | 8px dot with lerp follow, scales on interactive hover. Disabled on touch devices. Optional — skip if complexity exceeds budget. |
| BackToTop | Custom | Single | Fixed circle button, appears after 500px scroll. Lenis scroll-to-top on click. |
| PageLoader | Custom | Single | Full-screen overlay with brand text + loading bar. Orchestrates the load → reveal → unlock sequence. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Contains two zones: name/CTA center + scroll prompt bottom. Houses curtain canvas, text wave canvas, and entrance animation timeline. |
| AboutSection | Custom | Two-column layout (55/45). Contains GlassmorphismCard, stat counters, floating badges. |
| SkillsSection | Custom | CSS grid of SkillCard components (auto-fill, minmax 200px, 1fr). Proficiency bars with ScrollTrigger. |
| ProjectsSection | Custom | Two-column desktop: 3D cylinder left + sticky detail panel right. Contains TypographicCarousel, ProjectDetailPanel, ProjectModal. |
| ExperienceSection | Custom | Vertical timeline with alternating left/right items on desktop. GSAP draw-on-scroll line. |
| ServicesSection | Custom | 2×3 shimmer grid of ServiceCard components. |
| ContactSection | Custom | Centered form over AnimatedGradientMesh background. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| SectionHeading | Custom | About, Skills, Projects, Experience, Services, Contact | Pill label + heading text pair. Consistent entrance animation. |
| GlassmorphismCard | Custom | About (profile), Projects (detail panel), ProjectModal | Backdrop blur + semi-transparent bg + border + inner glow. Configurable via props. |
| SkillCard | Custom | SkillsSection | Deep Ocean Card effect: hover overlay reveal, proficiency bar. |
| ServiceCard | Custom | ServicesSection | ShimmerBorder wrapper + inner gradient mesh card. |
| ProjectModal | Custom | ProjectsSection | Full-screen lightbox overlay with glassmorphism card. Scale + opacity entrance. |
| StatCounter | Custom | AboutSection | Animated number count-up on scroll enter. |
| PillBadge | Custom | Projects, Services | Small tag badge with consistent styling. |
| FloatingBadge | Custom | AboutSection | Absolutely positioned pill that floats (translateY oscillation). |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollSpy | IntersectionObserver-based section tracking for nav active state |
| useLenis | Initialize Lenis, sync with GSAP ticker, expose scroll controls |
| useInView | Wrapper around IntersectionObserver for scroll-triggered animations |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Cinematic Curtain Reveal | Three.js + GSAP | Three PlaneGeometry ×3 with custom vertex/fragment shaders. GSAP timeline animates `uVal` uniform 0→1 over 3s. Canvas hidden on complete. | **High** 🔒 |
| Text Scroll Wave | @vfx-js/core | VFX-JS captures `.vfx` DOM elements to textures. Post-process sine-wave shader + per-element distortion shaders. Update loop lerp-scrolls uniforms each frame. | **High** 🔒 |
| Kinetic Typographic Carousel | Three.js + GSAP | Three Scene with extruded TextGeometry arranged in cylinder. Scroll rotation via lerp. Front-word emissive detection each frame. Click → glass shatter burst timeline. | **High** 🔒 |
| Glass Shatter Burst | Three.js + GSAP | Raycaster click detection. Per-letter shape sampling → fragment meshes. Dual timeline: fragments explode outward (t=0), letters fly to final positions (t=0.8). | **High** 🔒 |
| Deep Ocean Card Overlay | CSS + GSAP | CSS translateY(100%)→0 on hover with cubic-bezier transition. GSAP ScrollTrigger for proficiency bar width animation. | Low |
| Shimmer Border Grid | CSS | `@property --shimmer-angle` with conic-gradient background + `@keyframes` rotation. CSS `:hover` for speed change. No JS. | Low |
| Animated Gradient Mesh | CSS | 5 absolutely positioned blob divs with `mix-blend-mode: screen`, `filter: blur(80px)`, and independent `@keyframes` position/size animations. | Low |
| Hero Entrance Sequence | GSAP | Timeline with 6 staggered steps (subtitle → name lines → role → CTAs → scroll prompt). Fires after curtain reveal completes. | Medium |
| Role Text Cycle | React state + CSS | setInterval every 3s cycles role index. CSS blur transition (filter: blur) + opacity for crossfade. | Low |
| Nav Scroll State | CSS + React | Scroll event listener at 100px threshold toggles class. CSS transitions for backdrop-filter, background, border-color. | Low |
| Mobile Menu Overlay | GSAP | Full-screen overlay. Staggered link fade-in from bottom (50ms delay each). Reverse on close. | Low |
| Section Entrance Animations | GSAP ScrollTrigger | Each section: `gsap.from()` with ScrollTrigger start "top 80%". Direction varies per section (x/y slide + opacity). | Low |
| Stat Counter Animation | GSAP ScrollTrigger | `gsap.to()` on a proxy object, `onUpdate` sets React state. Counts from 0 to target over 1.5s. Stagger 200ms. | Low |
| Timeline Draw | GSAP ScrollTrigger | Line: `gsap.from({ scaleY: 0 })` with transform-origin top. Items: staggered fade + slide from side. Dots: scale 0→1. | Medium |
| Page Load Sequence | GSAP | Single master timeline: bar width → fade out → remove overlay → trigger curtain reveal. 4-step orchestration. | Medium |
| Scroll Prompt Bounce | CSS | `@keyframes` translateY oscillation 0↔8px, 2s infinite ease-in-out. | Low |
| Floating Badges | CSS | `@keyframes` translateY ±4px, 3s infinite ease-in-out. | Low |
| Card Hover Effects | CSS | Transitions on transform, box-shadow, filter. 300-400ms ease-out. | Low |
| Button Hover Glow | CSS | box-shadow transition on hover. Scale(1.02) on primary. | Low |
| Form Focus Glow | CSS | border-color + box-shadow transition on :focus. 300ms. | Low |
| Back-to-Top Button | GSAP | Fade + scale entrance/exit. Lenis smooth scroll on click. | Low |
| Project Detail Panel Update | React state | Cross-fade transition (300ms opacity) on active project change driven by cylinder rotation angle. | Low |
| Project Modal | CSS + GSAP | Overlay fade-in. Card scale 0.9→1 + opacity. Close: reverse. Escape/click-outside handlers. | Low |
| Custom Cursor | requestAnimationFrame | rAF loop with lerp interpolation (factor 0.15). Scale transition on interactive element hover. | Low |

---

## State & Logic Plan

### Global State

No external state library needed. Use React context for:

- **Scroll state**: `{ isScrolled: boolean, scrollY: number, scrollProgress: number }` — consumed by Navigation, BackToTop, and scroll-dependent effects.
- **Loading state**: `{ isLoaded: boolean, isRevealed: boolean }` — consumed by PageLoader, HeroSection. PageLoader sets `isLoaded` after bar animation; curtain reveal callback sets `isRevealed`.

### Local Component State

- **HeroSection**: `activeRole` index (0–2) for cycling text. `showContent` boolean (gates entrance animations until reveal complete).
- **Navigation**: `isMobileMenuOpen` boolean. `activeSection` string (updated by scroll spy).
- **ProjectsSection**: `activeProject` index (0–7, derived from cylinder rotation). `modalProject` index | null.
- **SkillsSection**: No state — hover handled purely by CSS.
- **ServicesSection**: No state — hover handled purely by CSS.
- **ContactSection**: Form fields (name, email, message) + submission status.

### Three.js ↔ React Bridge

The Three.js scenes (curtain reveal, typographic carousel) exist outside React's render cycle. Bridge pattern:

1. Each scene is managed by a class (e.g., `CurtainScene`, `CarouselScene`) instantiated in a `useEffect` hook.
2. The class owns the renderer, scene, camera, animation loop, and disposal logic.
3. React passes callbacks via the class constructor (e.g., `onRevealComplete` → sets global `isRevealed`).
4. The class exposes imperative methods: `resize()`, `dispose()`, `updateMouse(x, y)`.
5. Cleanup: `useEffect` return calls `dispose()` which removes event listeners, cancels rAF, and disposes Three.js resources.

### Scroll Synchronization

Lenis and GSAP must share a single animation frame:

```
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

Hero scroll lock: during curtain reveal, `lenis.stop()` is called. On reveal complete, `lenis.start()` is called and `document.body.style.overflow` is restored.

### Font Loading Gate

All Three.js text geometry creation must wait for `document.fonts.ready`. The carousel scene initializes only after fonts are confirmed loaded. The Inter font must be loaded as a `FontFace` object for Three.js `FontLoader` compatibility — preload the `.woff2` file and parse it via `FontLoader.parse()`.

---

## Project Structure

```
├── public/
│   ├── fonts/
│   │   └── Inter-Bold.woff2          # Three.js FontLoader source
│   └── images/
│       ├── profile.jpg               # About section portrait
│       ├── project-moviexpress.jpg   # Project screenshots (8)
│       ├── project-smartspend.jpg
│       ├── project-eduhub.jpg
│       ├── project-travelnest.jpg
│       ├── project-recruitpro.jpg
│       ├── project-gamevault.jpg
│       ├── project-aifighter.jpg
│       └── project-hotelmaster.jpg
│
├── src/
│   ├── main.tsx                      # Entry point, font loading gate
│   ├── App.tsx                       # Root: Lenis provider, layout shell, section composition
│   ├── index.css                     # Global styles, Tailwind directives, CSS keyframes, custom properties
│   │
│   ├── context/
│   │   └── ScrollContext.tsx         # Global scroll state (isScrolled, scrollY, progress)
│   │
│   ├── hooks/
│   │   ├── useLenis.ts              # Lenis init + GSAP ticker sync
│   │   ├── useScrollSpy.ts          # IntersectionObserver section tracking
│   │   └── useInView.ts             # Generic viewport entry detection
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx          # Curtain canvas, text wave, entrance timeline, role cycle
│   │   ├── AboutSection.tsx         # Two-column bio + glassmorphism profile card
│   │   ├── SkillsSection.tsx        # Grid of SkillCard with section heading
│   │   ├── ProjectsSection.tsx      # Carousel scene + detail panel + modal
│   │   ├── ExperienceSection.tsx    # Vertical animated timeline
│   │   ├── ServicesSection.tsx      # 2×3 shimmer grid
│   │   └── ContactSection.tsx       # Form over gradient mesh background
│   │
│   ├── components/
│   │   ├── Navigation.tsx           # Fixed nav bar with scroll spy
│   │   ├── Footer.tsx               # Minimal brand footer
│   │   ├── PageLoader.tsx           # Load sequence overlay
│   │   ├── BackToTop.tsx            # Fixed scroll-to-top button
│   │   ├── CustomCursor.tsx         # Optional cursor dot
│   │   ├── SectionHeading.tsx       # Reusable pill label + heading
│   │   ├── GlassmorphismCard.tsx    # Glassmorphism container component
│   │   ├── SkillCard.tsx            # Deep Ocean Card with overlay
│   │   ├── ServiceCard.tsx          # Shimmer border + gradient mesh card
│   │   ├── ProjectDetailPanel.tsx   # Sticky right panel for project info
│   │   ├── ProjectModal.tsx         # Full-screen project lightbox
│   │   ├── StatCounter.tsx          # Animated number counter
│   │   ├── PillBadge.tsx            # Small tag badge
│   │   └── FloatingBadge.tsx        # Oscillating position badge
│   │
│   ├── three/
│   │   ├── CurtainScene.ts          # Three.js curtain reveal scene class
│   │   ├── CarouselScene.ts         # Three.js typographic carousel scene class
│   │   ├── shaders/
│   │   │   ├── curtainVertex.glsl   # Curtain curl deformation vertex shader
│   │   │   ├── curtainFragment.glsl # Curtain feather alpha fragment shader
│   │   │   ├── postProcess.glsl     # VFX-JS post-process sine wave shader
│   │   │   ├── elementA.glsl        # VFX-JS per-element distortion shader A
│   │   │   └── elementB.glsl        # VFX-JS per-element distortion shader B
│   │   └── utils/
│   │       └── fontLoader.ts        # FontFace → Three.js Font parser
│   │
│   ├── data/
│   │   ├── skills.ts                # 16 skill objects (name, category, proficiency, desc, tags)
│   │   ├── projects.ts              # 8 project objects (title, description, tech, image)
│   │   ├── services.ts              # 6 service objects (name, icon, description, tags)
│   │   └── experience.ts            # 3 timeline items (title, institution, date, description)
│   │
│   └── types/
│       └── index.ts                 # Shared TypeScript interfaces
│
├── index.html                        # Google Fonts link, meta tags, favicon
├── vite.config.ts                    # Vite + React + Tailwind config
├── tailwind.config.js                # Custom colors, fonts, spacing tokens
└── tsconfig.json
```

---

## Key Implementation Notes

### Three.js Resource Management

- **Curtain canvas**: After `uVal` reaches 1 and GSAP onComplete fires, call `renderer.dispose()`, `geometry.dispose()`, and all `material.dispose()`. Set canvas `display: none`. This frees GPU memory before the carousel scene initializes.
- **Carousel canvas**: Shared renderer persists for the Projects section lifetime. On section unmount (if using route-based), dispose all text geometries and materials. For single-page: keep alive, but call `renderer.setAnimationLoop(null)` when section leaves viewport to pause rendering.
- **Font geometry**: `TextGeometry` instances are expensive. Create once on init, reuse for animations. The glass shatter creates temporary fragment geometries that must be disposed after the animation completes.

### VFX-JS Integration Pattern

VFX-JS operates outside React's render cycle. In `HeroSection.useEffect`:
1. Wait for `document.fonts.ready`.
2. Instantiate `new VFX({ ... })`.
3. Query all `.vfx` elements and register with `vfx.add()`.
4. Start the update RAF loop that calls `vfx.setUniform()` for `scroll` and `opacity`.
5. On resize: `vfx.clear()` + re-register all elements.
6. Cleanup: cancel RAF, `vfx.destroy()`.

### Responsive Breakpoints

| Breakpoint | Key Changes |
|------------|-------------|
| < 768px | Single column everywhere. Mobile menu. Simplified 3D carousel (no env map, reduced bevel). Skill grid 1 col. Service grid 1 col. Hero CTAs stack. |
| 768–1023px | Timeline single column. Service grid 2 col. Skill grid 2 col. Carousel centered with detail panel below. |
| 1024–1279px | Desktop layout. About 55/45 split. Projects two-column. Services 3 col. |
| ≥ 1280px | Content max-width capped at 1280px, centered. |

### Performance Budget

- Limit `devicePixelRatio` to 2 for all Three.js renderers.
- Use `will-change: transform` on frequently animated elements (floating badges, scroll prompt).
- GSAP ScrollTrigger `batch()` for staggered card entrances to reduce observer overhead.
- Lazy-load project images with `loading="lazy"` and placeholder blur.
- The typographic carousel is the heaviest ongoing GPU cost. Pause its rAF loop when the Projects section is not in viewport (use ScrollTrigger `onEnter`/`onLeave`).
