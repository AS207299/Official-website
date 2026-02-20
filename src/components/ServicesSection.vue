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

<style scoped>
.services-section {
  padding-bottom: 140px;
}

.services-header {
  margin-bottom: 60px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  position: relative;
  padding: 40px 32px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color var(--transition-smooth), background var(--transition-smooth);
  will-change: transform;
  overflow: hidden;
}

.service-card:hover {
  border-color: rgba(200, 184, 154, 0.3);
  background: rgba(255, 255, 255, 0.06);
}

.service-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  opacity: 0;
  transition: opacity var(--transition-smooth);
  background: radial-gradient(
    circle at var(--glow-x, 50%) var(--glow-y, 50%),
    rgba(200, 184, 154, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.service-card:hover .service-card-glow {
  opacity: 1;
}

.service-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(200, 184, 154, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-light);
  margin-bottom: 24px;
  transition: all var(--transition-smooth);
}

.service-card:hover .service-icon {
  background: var(--color-accent);
  color: var(--color-primary);
  transform: scale(1.05);
}

.service-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 12px;
  letter-spacing: 0.02em;
}

.service-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
  margin-bottom: 20px;
  font-weight: var(--font-weight-light);
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  background: rgba(200, 184, 154, 0.1);
  color: var(--color-accent-light);
  letter-spacing: 0.05em;
  border: 1px solid rgba(200, 184, 154, 0.15);
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
