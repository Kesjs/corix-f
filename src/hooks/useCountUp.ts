import { useState, useEffect, useRef } from "react"

interface UseCountUpProps {
  end: number
  duration?: number
  startOnView?: boolean
}

export function useCountUp({ end, duration = 2000, startOnView = true }: UseCountUpProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnView)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!startOnView) {
      // Démarrer l'animation immédiatement
      animate()
      return
    }

    // Observer pour détecter quand l'élément est visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [startOnView])

  useEffect(() => {
    if (!isVisible) return

    animate()
  }, [isVisible, end, duration])

  const animate = () => {
    const startTime = performance.now()
    const startValue = 0

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (easeOutQuart)
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
      const easedProgress = easeOutQuart(progress)
      
      const currentValue = Math.floor(startValue + (end - startValue) * easedProgress)
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }

  return { count, elementRef }
}
