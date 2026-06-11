<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection.vue'
</script>

<template>
  <div class="home-view">
    <HeroSection />
    <AboutSection />
    <FeaturedProductsSection />
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  display: flex;
  flex-direction: column;
}
</style>
