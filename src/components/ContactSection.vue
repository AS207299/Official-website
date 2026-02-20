<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Build info injected by Vite at compile time
const commitHash = __COMMIT_HASH__
const gitBranch = __GIT_BRANCH__
const buildTime = new Date(__BUILD_TIME__).toLocaleString()

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const contactInfo = [
  { icon: 'ph:envelope-simple', label: 'noc@starrail.cloud' },
  { icon: 'ph:map-pin', label: 'Colorado, United States' },
  { icon: 'ph:phone', label: '+1 (470) 326-0666' },
]

const socialLinks = [
  { icon: 'ph:twitter-logo', label: 'Twitter', url: 'https://x.com/AS207299' },
  { icon: 'ph:github-logo', label: 'GitHub', url: 'https://github.com/AS207299' },
]

onMounted(() => {
  gsap.from('.contact-content > *', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  })

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

function handleSubmit() {
  const subject = encodeURIComponent('Project Inquiry')
  const body = encodeURIComponent(
    `Name: ${formData.value.name}\nEmail: ${formData.value.email}\n\n${formData.value.message}`
  )
  window.location.href = `mailto:noc@starrail.cloud?subject=${subject}&body=${body}`
}
</script>

<template>
  <section id="contact" class="section section-dark contact-section">
    <div class="container contact-content">
      <div class="contact-header">
        <div class="accent-line" style="background: var(--color-accent-light)"></div>
        <h2 class="section-title">{{ t('contact.title1') }}<br />{{ t('contact.title2') }}</h2>
        <p class="section-subtitle">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="contact-grid">
        <!-- Form -->
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <input
              v-model="formData.name"
              type="text"
              :placeholder="t('contact.name')"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="formData.email"
              type="email"
              :placeholder="t('contact.email')"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              v-model="formData.message"
              :placeholder="t('contact.message')"
              class="form-input form-textarea"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">
            <span>{{ t('contact.send') }}</span>
            <span class="sparkle"></span>
          </button>
        </form>

        <!-- Info -->
        <div class="contact-info">
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            class="contact-info-item"
          >
            <div class="info-icon">
              <Icon :icon="info.icon" width="22" height="22" />
            </div>
            <span class="info-label">{{ info.label }}</span>
          </div>

          <div class="contact-socials">
            <a
              v-for="(social, i) in socialLinks"
              :key="i"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :title="social.label"
            >
              <Icon :icon="social.icon" width="22" height="22" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer-section">
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
  </section>
</template>

<style scoped>
.contact-section {
  padding-bottom: 0;
}

.contact-header {
  margin-bottom: 60px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 80px;
  align-items: start;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 18px 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-white);
  font-family: var(--font-primary);
  font-size: 0.95rem;
  transition: all var(--transition-smooth);
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-input:focus {
  border-color: var(--color-accent);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 3px rgba(200, 184, 154, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 40px;
  background: var(--color-accent);
  color: var(--color-primary);
  border-radius: 60px;
  font-size: 0.95rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.05em;
  transition: all var(--transition-smooth);
  cursor: pointer;
  align-self: flex-start;
}

.submit-btn:hover {
  background: var(--color-accent-light);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(200, 184, 154, 0.3);
}

.submit-btn .sparkle {
  background: var(--color-primary);
  width: 10px;
  height: 10px;
  transition: transform var(--transition-smooth);
}

.submit-btn:hover .sparkle {
  transform: rotate(90deg);
}

/* Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 8px;
}

.contact-info-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.info-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(200, 184, 154, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-light);
  flex-shrink: 0;
}

.info-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.contact-socials {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-fast);
}

.social-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-3px);
}

/* Footer */
.footer-section {
  position: relative;
  margin-top: 100px;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.footer-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.footer-deco-circle {
  position: absolute;
  right: -60px;
  bottom: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid rgba(200, 184, 154, 0.1);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-logo {
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.15em;
}

.footer-logo-sub {
  font-size: 0.7rem;
  font-weight: var(--font-weight-light);
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
}

.footer-copy {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}

.footer-build {
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.build-item {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.02em;
}

.build-sep {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
