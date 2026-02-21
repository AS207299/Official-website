<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Build info injected by Vite at compile time
const commitHash = __COMMIT_HASH__
const gitBranch = __GIT_BRANCH__
const buildTime = new Date(__BUILD_TIME__).toLocaleString()

onMounted(() => {
  // Footer parallax decoration
  gsap.to('.footer-deco-circle', {
    rotate: 360,
    ease: 'none',
    scrollTrigger: {
      trigger: '.footer-section',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 2,
    },
  })
})
</script>

<template>
  <footer id="contact" class="section section-dark footer-section">
    <div class="footer-deco">
      <div class="footer-deco-circle"></div>
    </div>
    <div class="container footer-content">
      <div class="footer-brand">
        <span class="footer-logo">HAKURO</span>
        <span class="sparkle"></span>
        <span class="footer-logo-sub">NETWORK INC.</span>
      </div>
      <p class="footer-copy">
        {{ t('contact.footer.copy') }}
      </p>
      <div class="footer-build">
        <span class="build-item">{{ commitHash }}</span>
        <span class="build-sep">·</span>
        <span class="build-item">{{ gitBranch }}</span>
        <span class="build-sep">·</span>
        <span class="build-item">{{ buildTime }}</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  @import '@/styles/components/footer.scss';
</style>
