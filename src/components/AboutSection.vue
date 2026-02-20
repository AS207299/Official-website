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
    xPercent: 30,
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

<style scoped>
.about-section {
  position: relative;
}

.about-deco {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.about-deco-line {
  position: absolute;
  top: 30%;
  left: -10%;
  width: 120%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-accent) 30%,
    var(--color-accent) 70%,
    transparent 100%
  );
  opacity: 0.2;
}

.about-header {
  margin-bottom: 60px;
}

.highlight {
  color: var(--color-accent-dark);
  position: relative;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
  align-items: start;
}

.about-description {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--color-text);
  margin-bottom: 24px;
  font-weight: var(--font-weight-light);
}

.about-values {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 12px;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  background: rgba(200, 184, 154, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(200, 184, 154, 0.15);
  transition: all var(--transition-smooth);
}

.value-item:hover {
  background: rgba(200, 184, 154, 0.15);
  transform: translateX(8px);
}

.value-text {
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.05em;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-card {
  padding: 40px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all var(--transition-smooth);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.stat-number {
  font-size: 2.8rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
