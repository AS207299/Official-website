<script setup>
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const services = computed(() => [
  {
    icon: 'ph:globe-bold',
    title: t('services.asnBgp.title'),
    description: t('services.asnBgp.description'),
    tags: ['ASN', 'BGP', 'Peering', 'IX'],
  },
  {
    icon: 'ph:code-bold',
    title: t('services.webDev.title'),
    description: t('services.webDev.description'),
    tags: ['Vue', 'React', 'Node.js'],
  },
  {
    icon: 'ph:device-mobile-bold',
    title: t('services.mobile.title'),
    description: t('services.mobile.description'),
    tags: ['iOS', 'Swift', 'Kotlin'],
  },
  {
    icon: 'ph:palette-bold',
    title: t('services.design.title'),
    description: t('services.design.description'),
    tags: ['Figma', 'Prototyping', 'Research'],
  },
  {
    icon: 'ph:cloud-bold',
    title: t('services.cloud.title'),
    description: t('services.cloud.description'),
    tags: ['AWS', 'DevOps', 'CI/CD'],
  },
  {
    icon: 'ph:brain-bold',
    title: t('services.ai.title'),
    description: t('services.ai.description'),
    tags: ['ML', 'NLP', 'Computer Vision'],
  },
])

const cardRefs = ref([])

onMounted(() => {
  // Staggered card entrance
  gsap.from('.service-card', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: {
      each: 0.12,
      from: 'start',
    },
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  // Section heading
  gsap.from('.services-header', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#services',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
})

// 3D tilt effect on mouse move
function handleMouseMove(e, index) {
  const card = cardRefs.value[index]
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -8
  const rotateY = ((x - centerX) / centerX) * 8

  gsap.to(card, {
    rotateX,
    rotateY,
    duration: 0.4,
    ease: 'power2.out',
    transformPerspective: 800,
  })

  const percentX = (x / rect.width) * 100
  const percentY = (y / rect.height) * 100
  card.style.setProperty('--glow-x', `${percentX}%`)
  card.style.setProperty('--glow-y', `${percentY}%`)
}

function handleMouseLeave(index) {
  const card = cardRefs.value[index]
  if (!card) return
  gsap.to(card, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  })
}
</script>

<template>
  <section id="services" class="section section-dark services-section">
    <div class="container">
      <div class="services-header">
        <div class="accent-line" style="background: var(--color-accent-light)"></div>
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-subtitle">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="services-grid">
        <div
          v-for="(service, i) in services"
          :key="i"
          :ref="(el) => (cardRefs[i] = el)"
          class="service-card"
          @mousemove="handleMouseMove($event, i)"
          @mouseleave="handleMouseLeave(i)"
        >
          <div class="service-icon">
            <Icon :icon="service.icon" width="32" height="32" />
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-tags">
            <span v-for="tag in service.tags" :key="tag" class="service-tag">
              {{ tag }}
            </span>
          </div>
          <div class="service-card-glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '@/styles/components/services-section.scss';
</style>
