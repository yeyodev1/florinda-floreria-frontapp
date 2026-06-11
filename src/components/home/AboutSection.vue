<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  // Image slide up
  gsap.from('.about__image-wrapper', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
    }
  })

  // Text stagger reveal
  gsap.from('.about__content > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 60%',
    }
  })
})
</script>

<template>
  <section class="about" id="about">
    <div class="about__container">
      <div class="about__image-wrapper">
        <img src="/images/about_florist_1781018307455.png" alt="Manos de florista trabajando" class="about__image" />
        <div class="about__image-accent"></div>
      </div>
      
      <div class="about__content">
        <span class="about__label">Nuestra Filosofía</span>
        <h2 class="about__title">La poesía de la naturaleza en cada detalle</h2>
        
        <p class="about__text">
          En Florinda, creemos que las flores son el lenguaje más puro de las emociones. 
          Cada tallo, pétalo y hoja es seleccionado con meticulosa atención para crear composiciones 
          que trascienden lo ordinario.
        </p>
        
        <p class="about__text">
          Nuestro taller es un santuario donde la botánica se encuentra con el diseño contemporáneo, 
          dando vida a arreglos que celebran la belleza efímera y la elegancia atemporal.
        </p>
        
        <a href="#collections" class="about__link">Conoce nuestro trabajo</a>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  padding: $space-xl $space-md;
  background-color: $color-beige;

  &__container {
    max-width: $bp-large;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-xl;
    align-items: center;
    
    @include mq(tablet) {
      grid-template-columns: 1fr 1fr;
      gap: 6rem;
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    padding-right: $space-lg;
    padding-bottom: $space-lg;
  }

  &__image {
    width: 100%;
    aspect-ratio: 4/5;
    object-fit: cover;
    z-index: 2;
    position: relative;
    box-shadow: 0 20px 40px rgba($color-charcoal, 0.1);
  }

  &__image-accent {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80%;
    height: 80%;
    background-color: rgba($color-mustard, 0.1);
    z-index: 1;
    transform: translate(10%, 10%);
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__label {
    font-family: $font-sans-alt;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: $color-mustard;
    margin-bottom: $space-sm;
  }

  &__title {
    margin-bottom: $space-md;
    font-size: 2.5rem;
    
    @include mq(tablet) {
      font-size: 3.5rem;
    }
  }

  &__text {
    margin-bottom: $space-md;
    font-size: 1.1rem;
    line-height: 1.8;
  }

  &__link {
    display: inline-block;
    margin-top: $space-sm;
    font-family: $font-sans-alt;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid $color-mustard;
    padding-bottom: 4px;
    
    &:hover {
      color: $color-mustard;
    }
  }
}
</style>
