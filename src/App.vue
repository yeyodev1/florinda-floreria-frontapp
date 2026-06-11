<script setup lang="ts">
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import ThePreloader from '@/components/layout/ThePreloader.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

// Initialize smooth scroll (Lenis + GSAP ScrollTrigger)
const { scrollTo } = useSmoothScroll()
const route = useRoute()

// GSAP Transition Hooks - Premium Awwwards Style
const onLeave = (el: Element, done: () => void) => {
  // Scale down and fade out the leaving page
  gsap.to(el, { 
    opacity: 0, 
    scale: 0.98, 
    y: -30,
    duration: 0.5, 
    ease: 'power3.inOut', 
    onComplete: done 
  })
}

const onEnter = (el: Element, done: () => void) => {
  // Scroll to top immediately before new page enters
  scrollTo(0, { immediate: true })
  
  // Scale down to normal and fade in the entering page
  gsap.fromTo(el, 
    { opacity: 0, scale: 1.02, y: 30 }, 
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out', onComplete: done }
  )
}
</script>

<template>
  <div class="app-wrapper">
    <ThePreloader />
    <TheHeader />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition @enter="onEnter" @leave="onLeave" :css="false" mode="out-in">
          <div :key="route.fullPath">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
}

// Global page transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
