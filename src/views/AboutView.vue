<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // GSAP Animations
  gsap.from('.about-page__title', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-page__header',
      start: 'top 80%',
    }
  })

  gsap.from('.about-page__text p', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-page__content',
      start: 'top 70%',
    }
  })
})
</script>

<template>
  <div class="about-page">
    <header class="about-page__header">
      <h1 class="about-page__title">Nuestra Historia</h1>
    </header>
    <section class="about-page__content">
      <div class="about-page__text">
        <p>Florinda nació de una pasión innegable por la botánica y el arte floral.</p>
        <p>Cada composición es un poema visual diseñado para evocar emociones profundas.</p>
        <p>Trabajamos con productores locales y seleccionamos a mano cada tallo, asegurando que solo las flores más frescas y extraordinarias lleguen a tus manos.</p>
      </div>
      <div class="about-page__image-container">
        <!-- Parallax effect via GSAP could be added here -->
        <img src="/images/about_florist_1781018307455.png" alt="Taller floral" class="about-page__image" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  padding-top: 120px;
  min-height: 100vh;
  
  &__header {
    text-align: center;
    padding: $space-xl 0 $space-md;
  }
  
  &__title {
    font-size: 3rem;
    
    @include mq(tablet) {
      font-size: 5rem;
    }
  }

  &__content {
    max-width: $bp-desktop;
    margin: 0 auto;
    padding: $space-md;
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-xl;
    
    @include mq(tablet) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
  }

  &__text {
    p {
      font-size: 1.2rem;
      margin-bottom: $space-md;
      color: $color-charcoal-light;
    }
  }

  &__image-container {
    overflow: hidden;
    border-radius: 4px;
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
</style>
