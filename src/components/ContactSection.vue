<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
  </section>
</template>

<style lang="scss" scoped>
  @import '@/styles/components/contact-section.scss';
</style>
