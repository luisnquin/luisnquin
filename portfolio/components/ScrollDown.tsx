import { useEffect, useRef, useState } from 'react'
import styles from '../styles/ScrollDown.module.css'

interface Props {
  className: string
}

export const ScrollDown = ({ className }: Props) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHover, setHover] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setIsVisible(false)

        observer.disconnect()
      }
    })

    observer.observe(ref.current)
  }, [ref])

  return isVisible ? (
    <span
      ref={ref}
      className={`${styles.scroll_down} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      [{isHover ? `Just do it, don't hover me 🦭` : 'scroll down'}]
    </span>
  ) : null
}
