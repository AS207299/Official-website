<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const heroRef = ref(null)
const titleChars = ref([])
const subtitleVisible = ref(false)
const welcomeMessage = ref('')

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  return 'night'
}

async function fetchLocationInfo() {
  try {
    const res = await fetch('https://ip-api.4eva.org/')
    if (res.ok) {
      const data = await res.json()
      const asn = `AS${data.asn}`
      const org = data.asn_org || 'Anywhere'
      const greeting = getGreeting()
      welcomeMessage.value = `Welcome users from ${asn} ${org}, Good ${greeting}.`
    }
  } catch {
    welcomeMessage.value = `Welcome, Good ${getGreeting()}.`
  }
}

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.8 })

  // Logo entrance
  tl.from('.hero-logo-img', {
    opacity: 0,
    scale: 0.8,
    y: 40,
    duration: 1.2,
    ease: 'power3.out',
  })

  // Title chars stagger
  tl.from(
    '.hero-title .char',
    {
      opacity: 0,
      y: 80,
      rotateX: 90,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power3.out',
    },
    '-=0.6'
  )

  // Subtitle typewriter
  tl.add(() => {
    subtitleVisible.value = true
  }, '-=0.3')

  tl.from(
    '.hero-subtitle',
    {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    },
    '-=0.2'
  )

  // CTA buttons
  tl.from('.hero-cta-btn', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
  }, '-=0.4')

  // Scroll indicator
  tl.from('.scroll-indicator', {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: 'power2.out',
  })

  // Welcome message
  tl.from('.welcome-message', {
    opacity: 0,
    y: 15,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.4')

  // Fetch visitor info
  fetchLocationInfo()

  // Parallax on scroll

  gsap.to('.hero-bg-layer-2', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  gsap.to('.hero-content', {
    yPercent: 20,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '60% top',
      scrub: true,
    },
  })
})

const companyName = computed(() => t('hero.company'))
</script>

<template>
  <section id="hero" ref="heroRef" class="hero-section">
    <!-- Background Layers for Parallax -->
    <div class="hero-bg">
      <div class="hero-bg-layer-2"></div>
    </div>

    <!-- Main Content -->
    <div class="hero-content container">
      <div class="hero-logo">
        <img
          class="hero-logo-img"
          src="/logo.png"
          alt="Hakuro Network Inc."
        />
      </div>

      <h1 class="hero-title">
        <span
          v-for="(char, i) in companyName"
          :key="i"
          class="char"
          :class="{ space: char === ' ' }"
        >{{ char === ' ' ? '\u00A0' : char }}</span>
      </h1>

      <p class="hero-subtitle">
        {{ t('hero.subtitle') }}
      </p>

      <p v-if="welcomeMessage" class="welcome-message">
        {{ welcomeMessage }}
      </p>

      <div class="hero-cta">
        <a href="#about" class="hero-cta-btn primary" @click.prevent="$el.closest('main')?.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })">
          {{ t('hero.discover') }}
          <span class="btn-sparkle sparkle"></span>
        </a>
        <a href="#contact" class="hero-cta-btn secondary" @click.prevent="$el.closest('main')?.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })">
          {{ t('hero.getInTouch') }}
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <svg class="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* --- Background Layers --- */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-bg-layer-2 {
  position: absolute;
  inset: 0;
  will-change: transform;
}

/* Decorative Circles */
.deco-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--color-border);
}

.deco-circle-1 {
  width: 500px;
  height: 500px;
  top: -150px;
  right: -100px;
  opacity: 0.3;
}

.deco-circle-2 {
  width: 300px;
  height: 300px;
  bottom: 10%;
  left: -80px;
  opacity: 0.2;
}

.deco-circle-3 {
  width: 200px;
  height: 200px;
  top: 40%;
  right: 15%;
  opacity: 0.15;
  border-color: var(--color-accent);
}

/* --- Content --- */
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  will-change: transform, opacity;
}

.hero-logo {
  margin-bottom: -8px;
}

.hero-logo-img {
  width: min(800px, 60vw);
  height: auto;
  filter: invert(0) drop-shadow(0 10px 30px rgba(26, 26, 26, 0.15));
  transition: filter 0.3s ease;
}

[data-theme='dark'] .hero-logo-img {
  filter: invert(1) drop-shadow(0 10px 30px rgba(200, 184, 154, 0.2));
}

.hero-title {
  font-size: clamp(1.4rem, 5vw, 3.2rem);
  font-weight: var(--font-weight-black);
  letter-spacing: 0.12em;
  line-height: 1.2;
  color: var(--color-primary);
  perspective: 500px;
  /* Allow wrapping on small screens avoiding overflow */
  text-align: center;
}

.hero-title .char {
  display: inline-block;
  will-change: transform, opacity;
}

.hero-title .char.space {
  width: 0.3em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  font-weight: var(--font-weight-light);
  color: var(--color-text-muted);
  max-width: 560px;
  line-height: 1.8;
  letter-spacing: 0.02em;
}

.welcome-message {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: var(--font-weight-light);
  color: var(--color-accent-dark);
  font-style: italic;
  letter-spacing: 0.02em;
  margin-top: 4px;
}

/* --- CTA Buttons --- */
.hero-cta {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.hero-cta-btn {
  padding: 16px 36px;
  border-radius: 60px;
  font-size: 0.9rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all var(--transition-smooth);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-cta-btn.primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.hero-cta-btn.primary:hover {
  background: #2a2a2a;
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(26, 26, 26, 0.3);
}

.hero-cta-btn.secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}

.hero-cta-btn.secondary:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
}

.btn-sparkle {
  width: 10px;
  height: 10px;
  background: var(--color-accent);
  transition: transform var(--transition-smooth);
}

.hero-cta-btn:hover .btn-sparkle {
  transform: rotate(90deg) scale(1.2);
}

/* --- Scroll Indicator --- */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-arrow {
  color: var(--color-text-muted);
  animation: arrow-bounce 2s ease-in-out infinite;
}

@keyframes arrow-bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateY(8px);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }

  .hero-cta-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .hero-logo-img {
    width: 80vw;
  }
  
  .hero-subtitle {
    font-size: 0.95rem;
    padding: 0 16px;
  }
  
  .welcome-message {
    font-size: 0.8rem;
    padding: 0 16px;
  }

  .deco-circle-1 {
    width: 300px;
    height: 300px;
  }
}
</style>
