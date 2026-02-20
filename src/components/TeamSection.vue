<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'

const team = [
  {
    name: 'Hakuro',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 10+ years in digital innovation.',
    avatar: '白',
    socials: ['ph:twitter-logo', 'ph:linkedin-logo'],
  },
  {
    name: 'Yuki Tanaka',
    role: 'CTO',
    bio: 'Full-stack architect passionate about scalable systems.',
    avatar: '雪',
    socials: ['ph:github-logo', 'ph:linkedin-logo'],
  },
  {
    name: 'Sakura Chen',
    role: 'Lead Designer',
    bio: 'Award-winning designer blending art with user experience.',
    avatar: '桜',
    socials: ['ph:dribbble-logo', 'ph:behance-logo'],
  },
  {
    name: 'Kai Murakami',
    role: 'Lead Engineer',
    bio: 'System architect specializing in high-performance applications.',
    avatar: '海',
    socials: ['ph:github-logo', 'ph:twitter-logo'],
  },
]

onMounted(() => {
  gsap.from('.team-header', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#team',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  gsap.from('.team-card', {
    y: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.team-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
})
</script>

<template>
  <section id="team" class="section team-section">
    <div class="container">
      <div class="team-header">
        <div class="accent-line"></div>
        <h2 class="section-title">Our Team</h2>
        <p class="section-subtitle">
          Meet the talented individuals who bring passion, expertise,
          and creativity to every project.
        </p>
      </div>

      <div class="team-grid">
        <div v-for="(member, i) in team" :key="i" class="team-card">
          <div class="team-card-inner">
            <!-- Avatar -->
            <div class="team-avatar">
              <span class="team-avatar-char">{{ member.avatar }}</span>
              <div class="team-avatar-ring"></div>
            </div>

            <h3 class="team-name">{{ member.name }}</h3>
            <span class="team-role">{{ member.role }}</span>
            <p class="team-bio">{{ member.bio }}</p>

            <div class="team-socials">
              <a
                v-for="(social, si) in member.socials"
                :key="si"
                href="#"
                class="team-social-link"
              >
                <Icon :icon="social" width="18" height="18" />
              </a>
            </div>
          </div>

          <!-- Decorative corner -->
          <div class="team-card-corner">
            <span class="sparkle"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  background: var(--color-bg-dark);
}

.team-header {
  margin-bottom: 60px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.team-card {
  position: relative;
  background: var(--color-white);
  border-radius: 24px;
  padding: 40px 24px;
  text-align: center;
  transition: all var(--transition-smooth);
  overflow: hidden;
  border: 1px solid transparent;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-elevated);
  border-color: var(--color-accent-light);
}

.team-card-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Avatar */
.team-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.team-avatar-char {
  font-size: 2rem;
  color: var(--color-white);
  font-weight: var(--font-weight-light);
}

.team-avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  opacity: 0;
  transition: all var(--transition-smooth);
  transform: scale(0.8);
}

.team-card:hover .team-avatar-ring {
  opacity: 1;
  transform: scale(1);
}

.team-name {
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  margin-bottom: 4px;
}

.team-role {
  font-size: 0.8rem;
  color: var(--color-accent-dark);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.team-bio {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.team-socials {
  display: flex;
  gap: 12px;
}

.team-social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.team-social-link:hover {
  background: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-2px);
}

/* Card Corner */
.team-card-corner {
  position: absolute;
  top: 16px;
  right: 16px;
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: all var(--transition-smooth);
}

.team-card:hover .team-card-corner {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
