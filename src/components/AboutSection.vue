<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = ref([
  { value: 10, suffix: '+', labelKey: 'about.stats.projects' },
  { value: 15, suffix: '+', labelKey: 'about.stats.team' },
  { value: 99, suffix: '%', labelKey: 'about.stats.satisfaction' },
  { value: 1, suffix: '+', labelKey: 'about.stats.years' },
])

const countValues = ref(stats.value.map(() => 0))

onMounted(() => {
  // Refresh ScrollTrigger to clear stale state from HMR
  ScrollTrigger.refresh()

  // Text reveal animations
  gsap.utils.toArray('.about-reveal').forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
    })
  })

  // Stats counter animation
  stats.value.forEach((stat, i) => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: stat.value,
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        countValues.value[i] = Math.round(obj.val)
      },
      onComplete() {
        countValues.value[i] = stat.value
      },
    })
  })

  // Parallax for decoration
  gsap.to('.about-deco-line', {
    xPercent: 90,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
})
</script>

<template>
  <section id="about" class="section about-section">
    <!-- Decorative -->
    <div class="about-deco">
      <div class="about-deco-line"></div>
    </div>

    <div class="container">
      <div class="about-header about-reveal">
        <div class="accent-line"></div>
        <h2 class="section-title">
          {{ t('about.title1') }}<br />
          <span class="highlight">{{ t('about.title2') }}</span>
        </h2>
        <p class="section-subtitle">
          {{ t('about.description') }}
        </p>
      </div>

      <div class="about-grid">
        <div class="about-text about-reveal">
          <p class="about-description">
            {{ t('about.paragraph1') }}
          </p>
          <p class="about-description">
            {{ t('about.paragraph2') }}
          </p>
        </div>

        <div class="about-values about-reveal">
          <div class="value-item" v-for="value in [t('about.innovation'), t('about.precision'), t('about.artistry')]" :key="value">
            <span class="sparkle"></span>
            <span class="value-text">{{ value }}</span>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid about-reveal">
        <div v-for="(stat, i) in stats" :key="i" class="stat-card glass-card">
          <span class="stat-number">{{ countValues[i] }}{{ stat.suffix }}</span>
          <span class="stat-label">{{ t(stat.labelKey) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '@/styles/components/about-section.scss';
</style>
