<script setup>
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
let rafId = null

onMounted(() => {
  // Initialize Lenis smooth scroll
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
  }
  if (rafId) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <div id="app-wrapper">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<style>
#app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
