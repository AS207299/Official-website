<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    title: 'Project Aurora',
    category: 'Web Application',
    description: 'A next-gen streaming platform with real-time collaboration features.',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
  },
  {
    title: 'Stellar Dashboard',
    category: 'UI/UX Design',
    description: 'Intuitive analytics dashboard for data-driven decision making.',
    gradient: 'linear-gradient(135deg, #c8b89a 0%, #a89878 100%)',
  },
  {
    title: 'Kitsune Engine',
    category: 'AI Platform',
    description: 'Intelligent content moderation powered by machine learning.',
    gradient: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 100%)',
  },
  {
    title: 'Nebula Connect',
    category: 'Mobile App',
    description: 'Social networking reimagined with privacy-first architecture.',
    gradient: 'linear-gradient(135deg, #d9cdb5 0%, #c8b89a 100%)',
  },
]

const scrollContainer = ref(null)

onMounted(() => {
  // Horizontal scroll pinning
  const container = scrollContainer.value
  if (!container) return

  const scrollWidth = container.scrollWidth - window.innerWidth

  gsap.to(container, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '#showcase',
      start: 'top top',
      end: () => `+=${scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  // Title entrance
  gsap.from('.showcase-header', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#showcase',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
})
</script>

<template>
  <section id="showcase" class="showcase-section">
    <div class="showcase-header container">
      <div class="accent-line"></div>
      <h2 class="section-title">Featured Work</h2>
      <p class="section-subtitle">
        A curated selection of projects that showcase our expertise and creative vision.
      </p>
    </div>

    <div ref="scrollContainer" class="showcase-track">
      <!-- Spacer for header -->
      <div class="showcase-spacer"></div>

      <div
        v-for="(project, i) in projects"
        :key="i"
        class="showcase-card"
      >
        <div class="showcase-card-visual" :style="{ background: project.gradient }">
          <div class="showcase-card-pattern">
            <div v-for="n in 6" :key="n" class="pattern-line"></div>
          </div>
          <span class="showcase-number">0{{ i + 1 }}</span>
        </div>
        <div class="showcase-card-info">
          <span class="showcase-category">{{ project.category }}</span>
          <h3 class="showcase-title">{{ project.title }}</h3>
          <p class="showcase-desc">{{ project.description }}</p>
          <div class="showcase-link">
            <span>View Project</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- End spacer -->
      <div class="showcase-spacer-end"></div>
    </div>
  </section>
</template>

<style scoped>
.showcase-section {
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
}

.showcase-header {
  padding-top: var(--section-padding);
  padding-bottom: 60px;
}

.showcase-track {
  display: flex;
  gap: 32px;
  align-items: stretch;
  padding: 0 0 80px 0;
  will-change: transform;
}

.showcase-spacer {
  flex-shrink: 0;
  width: calc(var(--container-padding));
}

.showcase-spacer-end {
  flex-shrink: 0;
  width: 100px;
}

.showcase-card {
  flex-shrink: 0;
  width: min(500px, 80vw);
  border-radius: 24px;
  overflow: hidden;
  background: var(--color-white);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-smooth);
  display: flex;
  flex-direction: column;
}

.showcase-card:hover {
  box-shadow: var(--shadow-elevated);
  transform: translateY(-8px);
}

.showcase-card-visual {
  position: relative;
  height: 320px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 24px;
  overflow: hidden;
}

.showcase-card-pattern {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  opacity: 0.15;
}

.pattern-line {
  width: 70%;
  height: 1px;
  background: white;
}

.showcase-number {
  font-size: 5rem;
  font-weight: var(--font-weight-black);
  color: rgba(255, 255, 255, 0.15);
  line-height: 1;
  letter-spacing: -0.05em;
}

.showcase-card-info {
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.showcase-category {
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-accent-dark);
  margin-bottom: 8px;
}

.showcase-title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.showcase-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.showcase-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  cursor: pointer;
  transition: gap var(--transition-smooth);
}

.showcase-link:hover {
  gap: 14px;
  color: var(--color-accent-dark);
}

@media (max-width: 768px) {
  .showcase-card {
    width: min(350px, 85vw);
  }

  .showcase-card-visual {
    height: 220px;
  }
}
</style>
