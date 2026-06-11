<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from('.contact-page__element', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="contact-page">
    <div class="contact-page__container">
      <h1 class="contact-page__title contact-page__element">Hablemos</h1>
      <p class="contact-page__subtitle contact-page__element">Estamos aquí para hacer tus ideas florecer.</p>
      
      <form class="contact-page__form contact-page__element" @submit.prevent>
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" placeholder="Tu nombre" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="tu@email.com" />
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea id="message" rows="5" placeholder="¿En qué podemos ayudarte?"></textarea>
        </div>
        <button type="submit" class="contact-page__submit">Enviar Mensaje</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-page {
  padding-top: 150px;
  min-height: 100vh;
  background-color: $color-beige;
  @include flex-center;
  align-items: flex-start;
  
  &__container {
    max-width: 600px;
    width: 100%;
    padding: $space-md;
  }
  
  &__title {
    font-size: 3rem;
    text-align: center;
    margin-bottom: $space-xs;
  }
  
  &__subtitle {
    text-align: center;
    margin-bottom: $space-xl;
    font-family: $font-serif-classic;
    font-style: italic;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $space-md;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $space-xs;
  
  label {
    font-family: $font-sans-alt;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: $color-charcoal;
  }
  
  input, textarea {
    padding: $space-sm;
    border: none;
    border-bottom: 1px solid rgba($color-charcoal, 0.3);
    background: transparent;
    font-family: $font-sans;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-bottom-color: $color-mustard;
    }
  }
}

.contact-page__submit {
  margin-top: $space-sm;
  background-color: $color-charcoal;
  color: $color-white;
  padding: $space-sm $space-lg;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-family: $font-sans-alt;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: $color-mustard;
  }
}
</style>
