import { useState, useEffect } from 'react'
import React from 'react'
import styles from '../styles/Reviews.module.css'
import { Review } from '../models'

interface Props {
  items: Review[]
}

const msInterval = 3000

export const Reviews = ({ items }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + (1 % items.length)
        if (nextIndex >= items.length) {
          return 0
        }

        return prevIndex + (1 % items.length)
      })
    }, msInterval)

    return () => clearInterval(interval)
  }, [currentIndex, items.length])

  return (
    <section>
      <div className={styles.reviews_container}>
        <h2>Recommendations</h2>

        {items.map((review, index) => (
          <div
            key={index}
            className={`${styles.review_card} ${index === currentIndex ? styles.active : ''}`}
          >
            <h3>{review.author}</h3>
            {review.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
