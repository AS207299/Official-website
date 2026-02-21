<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { Icon } from '@iconify/vue'
import { useTheme } from '../composables/useTheme'

const { t, locale } = useI18n()
const { theme, toggleTheme } = useTheme()

const scrolled = ref(false)
const menuOpen = ref(false)

const navLinks = [
  { key: 'nav.about', target: '#about' },
  { key: 'nav.services', target: '#services' },
  { key: 'nav.contact', target: '#contact' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

function scrollTo(target) {
  menuOpen.value = false
  const el = document.querySelector(target)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function toggleLocale() {
  const next = locale.value === 'en' ? 'zh' : 'en'
  locale.value = next
  localStorage.setItem('hakuro-locale', next)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  gsap.fromTo('.nav-bar',
    { y: -80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5,
      clearProps: 'transform,opacity',
    }
  )
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="nav-bar" :class="{ scrolled, 'menu-open': menuOpen }">
    <div class="nav-container container">
      <a class="nav-logo" @click.prevent="scrollTo('#hero')">
        <span class="nav-logo-text">HAKURO</span>
        <span class="nav-logo-dot sparkle"></span>
        <span class="nav-logo-sub">NETWORK</span>
      </a>

      <div class="nav-links" :class="{ open: menuOpen }">
        <a
          v-for="link in navLinks"
          :key="link.target"
          class="nav-link"
          @click.prevent="scrollTo(link.target)"
        >
          {{ t(link.key) }}
        </a>
      </div>

      <div class="nav-actions">
        <!-- Language Toggle -->
        <button class="nav-toggle-btn" @click="toggleLocale" :title="locale === 'en' ? '切换中文' : 'Switch to English'">
          <Icon icon="mdi:translate" width="20" height="20" />
        </button>

        <!-- Theme Toggle -->
        <button class="nav-toggle-btn" @click="toggleTheme" :title="theme === 'dark' ? 'Light mode' : 'Dark mode'">
          <Icon v-if="theme === 'dark'" icon="mdi:weather-sunny" width="20" height="20" />
          <Icon v-else icon="mdi:weather-night" width="20" height="20" />
        </button>

        <!-- Mobile Menu -->
        <button class="nav-menu-btn" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span class="menu-line" :class="{ active: menuOpen }"></span>
          <span class="menu-line" :class="{ active: menuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  @import '@/styles/components/nav-bar.scss';
</style>
