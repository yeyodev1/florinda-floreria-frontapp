import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { onMounted, onUnmounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function useSmoothScroll() {
  onMounted(() => {
    if (lenis) return

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  })

  return {
    lenis,
    scrollTo: (target: string | number | HTMLElement, options = {}) => {
      lenis?.scrollTo(target, options)
    }
  }
}
