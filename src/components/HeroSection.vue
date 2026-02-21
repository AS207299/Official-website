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

<style lang="scss" scoped>
  @import '@/styles/components/hero-section.scss';
</style>
