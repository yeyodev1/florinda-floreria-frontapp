<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import gsap from 'gsap'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const menuOverlay = ref<HTMLElement | null>(null)

const links = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/about' },
  { name: 'Colecciones', path: '/collections' },
  { name: 'Contacto', path: '/contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// GSAP Animation Logic
let tl: gsap.core.Timeline | null = null

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Setup timeline but pause it initially
  tl = gsap.timeline({ paused: true })
  
  if (menuOverlay.value) {
    tl.to(menuOverlay.value, {
      clipPath: 'circle(150% at 100% 0%)',
      duration: 0.8,
      ease: 'power3.inOut'
    })
    .from('.menu__link-text', {
      y: 150,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power4.out'
    }, "-=0.4")
    .from('.menu__footer', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    }, "-=0.4")
  }
})

watch(isMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden' // Prevent scrolling
    tl?.play()
  } else {
    document.body.style.overflow = ''
    tl?.reverse()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header :class="['header', { 'header--scrolled': isScrolled, 'header--open': isMenuOpen }]">
    <div class="header__container">
      <router-link to="/" class="header__logo" @click="isMenuOpen && toggleMenu()">
        <img src="@/assets/logo/logo.png" alt="Florinda Florería" class="header__logo-img" />
      </router-link>

      <button class="header__toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span class="header__toggle-text">{{ isMenuOpen ? 'Cerrar' : 'Menú' }}</span>
        <div class="header__toggle-icon">
          <span :class="['line', { 'line--open': isMenuOpen }]"></span>
          <span :class="['line', { 'line--open': isMenuOpen }]"></span>
        </div>
      </button>
    </div>

    <!-- Fullscreen Menu Overlay -->
    <div class="menu-overlay" ref="menuOverlay">
      <nav class="menu__nav">
        <div class="menu__link-wrapper" v-for="(link, index) in links" :key="index">
          <router-link :to="link.path" class="menu__link" @click="toggleMenu">
            <span class="menu__link-text">{{ link.name }}</span>
          </router-link>
        </div>
      </nav>
      
      <div class="menu__footer">
        <p>Florinda Florería Boutique</p>
        <div class="menu__social">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: background-color 0.4s $ease-smooth, padding 0.4s $ease-smooth;
  padding: $space-md 0;
  background-color: transparent;

  &--scrolled {
    background-color: rgba($color-beige, 0.95);
    backdrop-filter: blur(10px);
    padding: $space-sm 0;
    box-shadow: 0 4px 20px rgba($color-charcoal, 0.05);
  }
  
  &--open {
    background-color: transparent !important;
    backdrop-filter: none;
    box-shadow: none;
    
    .header__logo-img {
      filter: brightness(0) invert(1); // Make logo white on dark bg
      transition: filter 0.4s ease;
    }
    
    .header__toggle-text,
    .line {
      color: $color-white !important;
      background-color: $color-white !important;
    }
  }

  &__container {
    max-width: $bp-large;
    margin: 0 auto;
    padding: 0 $space-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 101; // Above overlay
  }

  &__logo {
    display: block;
    width: 60px;
    transition: transform 0.3s ease;

    @include mq(tablet) {
      width: 80px;
    }

    &:hover {
      transform: scale(1.05);
    }

    &-img {
      width: 100%;
      height: auto;
      object-fit: contain;
      transition: filter 0.4s ease;
    }
  }

  &__toggle {
    display: flex;
    align-items: center;
    gap: $space-sm;
    background: none;
    border: none;
    cursor: pointer;
    font-family: $font-sans-alt;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
    color: $color-charcoal;
    z-index: 101;
    transition: color 0.4s ease;

    &-text {
      display: none;
      
      @include mq(tablet) {
        display: block;
      }
    }

    &-icon {
      width: 30px;
      height: 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;

      .line {
        width: 100%;
        height: 2px;
        background-color: $color-charcoal;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        transform-origin: center;

        &--open {
          &:nth-child(1) {
            transform: translateY(4px) rotate(45deg);
          }
          &:nth-child(2) {
            transform: translateY(-4px) rotate(-45deg);
          }
        }
      }
    }
  }
}

.menu-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-charcoal; // Dark elegant background
  z-index: 100;
  clip-path: circle(0% at 100% 0%); // Start hidden at top right
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $space-xl;
}

.menu {
  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    text-align: center;
    
    @include mq(tablet) {
      gap: $space-md;
    }
  }

  &__link-wrapper {
    overflow: hidden; // For the text stagger effect
  }

  &__link {
    display: block;
    text-decoration: none;
    
    &-text {
      display: inline-block;
      font-family: $font-cursive;
      font-size: 4rem;
      color: $color-white;
      transition: color 0.3s ease, transform 0.3s ease;

      @include mq(tablet) {
        font-size: 6.5rem;
      }
      
      &:hover {
        color: $color-mustard;
        transform: translateX(10px);
      }
    }
  }

  &__footer {
    position: absolute;
    bottom: $space-xl;
    left: $space-md;
    right: $space-md;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-sm;
    color: rgba($color-white, 0.6);
    font-family: $font-sans-alt;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    
    @include mq(tablet) {
      flex-direction: row;
      justify-content: space-between;
      left: $space-xl;
      right: $space-xl;
    }
  }

  &__social {
    display: flex;
    gap: $space-md;
    
    a {
      color: rgba($color-white, 0.8);
      transition: color 0.3s ease;
      
      &:hover {
        color: $color-mustard;
      }
    }
  }
}
</style>
