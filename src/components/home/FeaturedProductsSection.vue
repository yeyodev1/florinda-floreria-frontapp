<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
}

const products = ref<Product[]>([
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
  },
  {
    id: 4,
    title: 'Noche Estrellada',
    price: '$120.00',
    image: '/images/product_bouquet_1781018318453.png',
    category: 'Premium'
  }
])

const carouselRef = ref<HTMLElement | null>(null)

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return
  const cardWidth = carouselRef.value.querySelector('.product-card')?.clientWidth || 300
  const gap = 32 // $space-lg approx in px
  const scrollAmount = cardWidth + gap
  
  const left = direction === 'left' ? -scrollAmount : scrollAmount
  carouselRef.value.scrollBy({ left, behavior: 'smooth' })
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.from('.product-card', {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.products__carousel',
      start: 'top 85%',
    }
  })
})
</script>

<template>
  <section class="products" id="collections">
    <div class="products__container">
      <div class="products__header">
        <div class="products__header-text">
          <h2 class="products__title">Colecciones Destacadas</h2>
          <p class="products__subtitle">Descubre nuestras creaciones más icónicas, diseñadas para emocionar.</p>
        </div>
        <div class="products__controls">
          <button class="control-btn" @click="scrollCarousel('left')" aria-label="Anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button class="control-btn" @click="scrollCarousel('right')" aria-label="Siguiente">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      
      <div class="products__carousel" ref="carouselRef">
        <article 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
        >
          <div class="product-card__image-container">
            <img :src="product.image" :alt="product.title" class="product-card__image" loading="lazy" />
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
  background-color: $color-beige; // Changed to elegant beige
  overflow: hidden;

  &__container {
    max-width: $bp-large;
    margin: 0 auto;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $space-md;
    margin-bottom: $space-xl;
    
    @include mq(tablet) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }

  &__title {
    margin-bottom: $space-xs;
  }

  &__subtitle {
    font-size: 1.1rem;
    color: $color-charcoal-light;
    max-width: 500px;
  }

  &__controls {
    display: flex;
    gap: $space-sm;
    align-self: flex-end;
  }

  .control-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba($color-mustard, 0.5);
    background-color: transparent;
    color: $color-mustard;
    cursor: pointer;
    transition: all 0.3s $ease-smooth;
    @include flex-center;

    &:hover {
      background-color: $color-mustard;
      color: $color-white;
      transform: scale(1.05);
    }
  }

  &__carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    gap: $space-lg;
    padding-bottom: $space-md;
    margin: 0 -#{$space-md}; // Bleed to edges on mobile
    padding-left: $space-md;
    padding-right: $space-md;
    
    @include mq(tablet) {
      margin: 0;
      padding-left: 0;
      padding-right: 0;
    }
    
    /* Ocultar scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__footer {
    margin-top: $space-xl;
    text-align: center;
  }
}

.product-card {
  scroll-snap-align: start;
  flex: 0 0 85%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  @include mq(tablet) {
    flex: 0 0 calc(33.333% - 1.4rem);
  }

  &:hover {
    .product-card__image { transform: scale(1.05); }
    .product-card__overlay { opacity: 1; }
  }

  &__image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    overflow: hidden;
    margin-bottom: $space-md;
    background-color: $color-charcoal;
    border-radius: 2px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba($color-charcoal, 0.25);
    opacity: 0;
    transition: opacity 0.4s ease;
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
    transform: translateY(15px);
    transition: transform 0.4s ease;
  }
  
  &:hover &__btn {
    transform: translateY(0);
  }

  &__info {
    text-align: left;
  }

  &__category {
    font-family: $font-sans-alt;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: $color-mustard;
    margin-bottom: 4px;
    display: block;
  }

  &__title {
    font-family: $font-serif-display;
    font-size: 1.5rem;
    margin-bottom: 4px;
    color: $color-charcoal;
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
  padding: $space-sm $space-lg;
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
