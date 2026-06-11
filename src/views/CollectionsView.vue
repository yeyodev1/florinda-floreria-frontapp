<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection.vue'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.from('.collections-page__title', {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out',
  })
})
</script>

<template>
  <div class="collections-page">
    <header class="collections-page__header">
      <h1 class="collections-page__title">Nuestras Colecciones</h1>
    </header>
    <!-- Reuse the component for now, it already has the grid -->
    <FeaturedProductsSection />
  </div>
</template>

<style lang="scss" scoped>
.collections-page {
  padding-top: 120px;
  min-height: 100vh;
  background-color: $color-white;
  
  &__header {
    text-align: center;
    padding: $space-xl 0 0;
  }
  
  &__title {
    font-size: 3rem;
    
    @include mq(tablet) {
      font-size: 5rem;
    }
  }
}
</style>
