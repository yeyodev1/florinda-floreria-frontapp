<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const products = ref([
  {
    id: 1,
    title: 'Bouquet Alba',
    price: '$85.00',
    image: '/images/product_bouquet_1781018318453.png',
    category: 'Elegancia Blanca'
  },
  {
    id: 2,
    title: 'Esencia Oliva',
    price: '$110.00',
    image: '/images/product_bouquet_1781018318453.png',
    category: 'Orgánico'
  },
  {
    id: 3,
    title: 'Amanecer',
    price: '$95.00',
    image: '/images/product_bouquet_1781018318453.png',
    category: 'Clásicos'
  }
])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.from('.product-card', {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.products__grid',
      start: 'top 80%',
    }
  })
})
</script>

<template>
  <section class="products" id="collections">
    <div class="products__container">
      <div class="products__header">
        <h2 class="products__title">Colecciones Destacadas</h2>
        <p class="products__subtitle">Descubre nuestras creaciones más icónicas, diseñadas para emocionar.</p>
      </div>
      
      <div class="products__grid">
        <article 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
        >
          <div class="product-card__image-container">
            <img :src="product.image" :alt="product.title" class="product-card__image" />
            <div class="product-card__overlay">
              <button class="product-card__btn">Ver Detalles</button>
            </div>
          </div>
          <div class="product-card__info">
            <span class="product-card__category">{{ product.category }}</span>
            <h3 class="product-card__title">{{ product.title }}</h3>
            <span class="product-card__price">{{ product.price }}</span>
          </div>
        </article>
      </div>
      
      <div class="products__footer">
        <button class="btn-outline">Ver Todo el Catálogo</button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.products {
  padding: $space-xl $space-md;
  background-color: $color-white;

  &__container {
    max-width: $bp-large;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    max-width: 600px;
    margin: 0 auto $space-xl;
  }

  &__title {
    margin-bottom: $space-sm;
  }

  &__subtitle {
    font-size: 1.1rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-xl;
    
    @include mq(tablet) {
      grid-template-columns: repeat(3, 1fr);
      gap: $space-lg;
    }
  }

  &__footer {
    margin-top: $space-xl;
    @include flex-center;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    .product-card__image {
      transform: scale(1.03);
    }
    
    .product-card__overlay {
      opacity: 1;
    }
  }

  &__image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    overflow: hidden;
    margin-bottom: $space-md;
    background-color: $color-charcoal; // Match the dark studio bg
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s $ease-custom;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-charcoal, 0.4);
    opacity: 0;
    transition: opacity 0.4s $ease-custom;
    @include flex-center;
  }

  &__btn {
    background-color: $color-white;
    color: $color-charcoal;
    padding: $space-sm $space-md;
    font-family: $font-sans-alt;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    transform: translateY(20px);
    transition: transform 0.4s $ease-custom;
  }
  
  &:hover &__btn {
    transform: translateY(0);
  }

  &__info {
    text-align: center;
  }

  &__category {
    font-family: $font-sans-alt;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: $color-mustard;
    margin-bottom: $space-xs;
    display: block;
  }

  &__title {
    font-family: $font-serif-display;
    font-size: 1.5rem;
    margin-bottom: $space-xs;
  }

  &__price {
    font-family: $font-sans;
    color: $color-charcoal-light;
    font-size: 1rem;
  }
}

.btn-outline {
  display: inline-block;
  border: 1px solid $color-charcoal;
  padding: $space-sm $space-md;
  font-family: $font-sans-alt;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: $color-charcoal;
  transition: all 0.3s $ease-smooth;
  
  &:hover {
    background-color: $color-charcoal;
    color: $color-white;
  }
}
</style>
