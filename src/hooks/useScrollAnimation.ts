import { useEffect, useRef } from 'react'

const useScrollAnimation = () => {
  const elementsRef = useRef<NodeListOf<Element> | null>(null)

  useEffect(() => {
    // Get all elements with scroll-reveal class
    elementsRef.current = document.querySelectorAll('.scroll-reveal')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    // Observe all elements
    elementsRef.current.forEach(element => {
      observer.observe(element)
    })

    // Cleanup
    return () => {
      if (elementsRef.current) {
        elementsRef.current.forEach(element => {
          observer.unobserve(element)
        })
      }
    }
  }, [])

  return null
}

export default useScrollAnimation