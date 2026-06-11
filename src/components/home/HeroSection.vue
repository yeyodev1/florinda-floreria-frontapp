<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  // Parallax background
  gsap.to('.hero__bg-image', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  })
})
</script>

<template>
  <section class="hero" id="home">
    <div class="hero__background">
      <img src="/images/hero_floral_bg_1781018294747.png" alt="Arreglo floral elegante" class="hero__bg-image" />
      <div class="hero__overlay"></div>
    </div>
    
    <div class="hero__content">
      <h2 class="hero__subtitle">Bienvenido a</h2>
      <h1 class="hero__title">Florinda Florería</h1>
      <p class="hero__description">Arte botánico que transforma espacios y emociones.</p>
      <button class="hero__cta">
        Descubrir Colecciones
        <span class="hero__cta-line"></span>
      </button>
    </div>
    
    <div class="hero__scroll-indicator">
      <span class="hero__scroll-text">Deslizar</span>
      <div class="hero__scroll-line"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &__bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1.05);
    animation: slowZoom 20s ease-out infinite alternate;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba($color-charcoal, 0.3) 0%,
      rgba($color-charcoal, 0.7) 100%
    );
  }

  &__content {
    text-align: center;
    color: $color-white;
    padding: 0 $space-md;
    max-width: 800px;
    z-index: 10;
    animation: fadeUp 1.2s $ease-custom forwards;
  }

  &__subtitle {
    font-family: $font-sans-alt;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: $space-sm;
    color: rgba($color-white, 0.8);
  }

  &__title {
    font-family: $font-cursive;
    font-size: 4.5rem;
    color: $color-white;
    line-height: 1;
    margin-bottom: $space-md;
    text-shadow: 0 4px 20px rgba($color-black, 0.3);
    
    @include mq(tablet) {
      font-size: 7rem;
    }
  }

  &__description {
    font-family: $font-serif-classic;
    font-size: 1.2rem;
    font-style: italic;
    color: rgba($color-white, 0.9);
    margin-bottom: $space-lg;
    
    @include mq(tablet) {
      font-size: 1.5rem;
    }
  }

  &__cta {
    color: $color-white;
    font-family: $font-sans-alt;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    padding-bottom: $space-xs;
    overflow: hidden;
    
    &-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $color-mustard;
      transform: translateX(-101%);
      transition: transform 0.4s $ease-custom;
    }
    
    &:hover &-line {
      transform: translateX(0);
    }
  }

  &__scroll-indicator {
    position: absolute;
    bottom: $space-xl;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-xs;
    opacity: 0;
    animation: fadeIn 1s 1s forwards;
  }

  &__scroll-text {
    font-family: $font-sans-alt;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba($color-white, 0.6);
  }

  &__scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, rgba($color-white, 0.6), transparent);
    animation: scrollDrop 2s infinite cubic-bezier(0.77, 0, 0.175, 1);
  }
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes scrollDrop {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.1% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
</style>
