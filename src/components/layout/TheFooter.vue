<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__brand">
        <img src="@/assets/logo/logo.png" alt="Florinda Florería" class="footer__logo" />
        <p class="footer__description">
          Arreglos florales exclusivos y detalles botánicos que transforman momentos en recuerdos eternos.
        </p>
      </div>

      <div class="footer__links">
        <h4 class="footer__title">Enlaces Rápidos</h4>
        <nav class="footer__nav">
          <router-link to="/">Inicio</router-link>
          <router-link to="/about">Nosotros</router-link>
          <router-link to="/collections">Colecciones</router-link>
          <router-link to="/contact">Contacto</router-link>
        </nav>
      </div>

      <div class="footer__social">
        <h4 class="footer__title">Síguenos</h4>
        <div class="footer__social-icons">
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Pinterest">Pinterest</a>
        </div>
      </div>

      <div class="footer__legal">
        <h4 class="footer__title">Información Legal</h4>
        <div class="footer__legal-content">
          <p><strong>Razón Social:</strong> CAICEDO ALVARADO STEFANO DAVID</p>
          <p><strong>RUC:</strong> 2350255481001</p>
          <p><strong>Dirección:</strong> Barrio COOPSANTA EUFRACIA, Número SOL 15, Manzana E. Provincia GUAYAS, Cantón GUAYAQUIL, Parroquia TARQUI</p>
          <p><strong>Referencia:</strong> JUNTO AL PARQUE CHILDREN INTERNACIONAL</p>
          <p><strong>Teléfono:</strong> 0997229056</p>
          <p><strong>Email:</strong> stefano.caicedo@outlook.com</p>
        </div>
      </div>
    </div>
    
    <div class="footer__bottom">
      <p>&copy; {{ currentYear }} Florinda Florería. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $color-charcoal;
  color: $color-white;
  padding: $space-xl $space-md $space-md;

  &__container {
    max-width: $bp-large;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-lg;

    @include mq(tablet) {
      grid-template-columns: 1.5fr 1fr 1fr 2fr;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__logo {
    width: 120px;
    margin-bottom: $space-sm;
    filter: brightness(0) invert(1); // Make the logo white
  }

  &__description {
    color: rgba($color-white, 0.7);
    font-family: $font-serif-classic;
    font-size: 1.1rem;
    font-style: italic;
    max-width: 300px;
  }

  &__title {
    color: $color-mustard;
    font-family: $font-sans-alt;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: $space-md;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: $space-xs;

    a {
      color: rgba($color-white, 0.8);
      font-family: $font-sans;
      font-size: 0.9rem;
      
      &:hover {
        color: $color-mustard;
        transform: translateX(4px);
      }
    }
  }

  &__social-icons {
    display: flex;
    flex-direction: column;
    gap: $space-xs;

    a {
      color: rgba($color-white, 0.8);
      font-family: $font-sans;
      font-size: 0.9rem;
      
      &:hover {
        color: $color-mustard;
      }
    }
  }

  &__legal-content {
    display: flex;
    flex-direction: column;
    gap: $space-xs;

    p {
      color: rgba($color-white, 0.8);
      font-family: $font-sans;
      font-size: 0.8rem;
      margin: 0;
      line-height: 1.4;

      strong {
        color: $color-white;
        font-weight: 600;
      }
    }
  }

  &__bottom {
    margin-top: $space-xl;
    padding-top: $space-md;
    border-top: 1px solid rgba($color-white, 0.1);
    text-align: center;
    
    p {
      color: rgba($color-white, 0.5);
      font-size: 0.8rem;
      margin: 0;
    }
  }
}
</style>
