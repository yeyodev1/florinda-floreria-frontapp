<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const isVisible = ref(true)
const preloaderRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // Ensure the user sees the preloader for at least 2.5 seconds to appreciate the animation
  // In a real scenario, this would be tied to a store loading state.
  
  const tl = gsap.timeline({
    onComplete: () => {
      isVisible.value = false
    }
  })

  // 1. Initial logo pulse
  tl.fromTo(logoRef.value, 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
  )
  .to(logoRef.value, { scale: 1.05, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, "-=0.2")
  
  // 2. Text fade in
  .fromTo(textRef.value,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    "-=1"
  )

  // 3. Exit animation
  .to([logoRef.value, textRef.value], {
    opacity: 0,
    y: -20,
    duration: 0.5,
    ease: 'power2.in',
    delay: 0.3
  })
  .to(preloaderRef.value, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut'
  })
})
</script>

<template>
  <div v-if="isVisible" class="preloader" ref="preloaderRef">
    <div class="preloader__content">
      <img src="@/assets/logo/logo.png" alt="Florinda Florería" class="preloader__logo" ref="logoRef" />
      <div class="preloader__text" ref="textRef">
        <span>Preparando la magia...</span>
        <div class="preloader__progress">
          <div class="preloader__progress-bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-beige;
  z-index: 99999; // Ensure it's above everything
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-lg;
  }

  &__logo {
    width: 120px;
    height: auto;
    
    @include mq(tablet) {
      width: 150px;
    }
  }

  &__text {
    text-align: center;
    font-family: $font-sans-alt;
    color: $color-mustard;
    font-size: 0.9rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__progress {
    width: 200px;
    height: 2px;
    background-color: rgba($color-mustard, 0.2);
    margin-top: $space-sm;
    overflow: hidden;
    position: relative;
    border-radius: 2px;

    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 50%;
      background-color: $color-mustard;
      animation: load 2s ease-in-out infinite alternate;
    }
  }
}

@keyframes load {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
</style>
