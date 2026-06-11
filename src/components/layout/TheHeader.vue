<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]">
    <div class="header__container">
      <!-- Logo -->
      <router-link to="/" class="header__logo">
        <img src="@/assets/logo/logo.png" alt="Florinda Florería" class="header__logo-img" />
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="header__nav">
        <router-link to="/" class="header__link">Inicio</router-link>
        <router-link to="/about" class="header__link">Nosotros</router-link>
        <router-link to="/collections" class="header__link">Colecciones</router-link>
        <router-link to="/contact" class="header__link">Contacto</router-link>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button class="header__toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span class="header__toggle-line"></span>
        <span class="header__toggle-line"></span>
        <span class="header__toggle-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide">
      <nav v-if="isMenuOpen" class="header__mobile-nav">
        <router-link to="/" class="header__mobile-link" @click="toggleMenu">Inicio</router-link>
        <router-link to="/about" class="header__mobile-link" @click="toggleMenu">Nosotros</router-link>
        <router-link to="/collections" class="header__mobile-link" @click="toggleMenu">Colecciones</router-link>
        <router-link to="/contact" class="header__mobile-link" @click="toggleMenu">Contacto</router-link>
      </nav>
    </transition>
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

  &__container {
    max-width: $bp-large;
    margin: 0 auto;
    padding: 0 $space-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: block;
    width: 60px;

    @include mq(tablet) {
      width: 80px;
    }

    &-img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }

  &__nav {
    display: none;

    @include mq(tablet) {
      display: flex;
      gap: $space-md;
    }
  }

  &__link {
    font-family: $font-sans-alt;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $color-charcoal;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background-color: $color-mustard;
      transition: width 0.3s $ease-custom;
    }

    &:hover::after,
    &.router-link-active::after {
      width: 100%;
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;

    @include mq(tablet) {
      display: none;
    }

    &-line {
      width: 100%;
      height: 2px;
      background-color: $color-charcoal;
      border-radius: 2px;
    }
  }

  &__mobile-nav {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $color-beige;
    padding: $space-md;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    box-shadow: 0 10px 20px rgba($color-charcoal, 0.05);
  }

  &__mobile-link {
    font-family: $font-sans-alt;
    font-size: 1.1rem;
    color: $color-charcoal;
    padding: $space-xs 0;
    border-bottom: 1px solid rgba($color-charcoal, 0.1);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s $ease-custom, opacity 0.4s $ease-custom;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
