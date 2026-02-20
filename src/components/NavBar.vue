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

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 24px 0;
  transition: all var(--transition-smooth);
}

.nav-bar.scrolled {
  padding: 16px 0;
  background: var(--nav-bg-blur);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 10;
}

.nav-logo-text {
  font-size: 1.4rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.15em;
  color: var(--color-primary);
}

.nav-logo-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
}

.nav-logo-sub {
  font-size: 0.8rem;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 40px;
}

.nav-link {
  font-size: 0.85rem;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
  position: relative;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-smooth);
}

.nav-link:hover {
  color: var(--color-accent-dark);
}

.nav-link:hover::after {
  width: 100%;
}

/* Actions Group */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
}

.nav-toggle-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: transparent;
}

.nav-toggle-btn:hover {
  background: var(--color-accent);
  color: #1a1a1a;
  border-color: var(--color-accent);
}

.toggle-label {
  font-family: var(--font-primary);
  letter-spacing: 0;
}

.toggle-icon {
  font-size: 1rem;
  line-height: 1;
}

/* Hamburger */
.nav-menu-btn {
  display: none;
  flex-direction: column;
  gap: 6px;
  z-index: 10;
  padding: 4px;
}

.menu-line {
  width: 24px;
  height: 2px;
  background: var(--color-primary);
  transition: all var(--transition-smooth);
  transform-origin: center;
}

.menu-line.active:first-child {
  transform: translateY(4px) rotate(45deg);
}

.menu-line.active:last-child {
  transform: translateY(-4px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-menu-btn {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-bg);
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-smooth);
  }

  .nav-links.open {
    opacity: 1;
    pointer-events: auto;
  }

  .nav-links .nav-link {
    font-size: 1.5rem;
  }
}
</style>
