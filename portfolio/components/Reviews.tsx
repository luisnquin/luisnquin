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
  const [pause, setPause] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + (1 % items.length)
          if (nextIndex >= items.length) {
            return 0
          }

          return prevIndex + (1 % items.length)
        })
      }
    }, msInterval)

    return () => clearInterval(interval)
  }, [pause, currentIndex, items.length])

  const handleLeftKeyAction = () => {
    const nextIndex = currentIndex - 1

    setCurrentIndex(nextIndex < 0 ? items.length - 1 : nextIndex)
  }

  const handleRightKeyAction = () => {
    const nextIndex = currentIndex + 1

    setCurrentIndex(nextIndex >= items.length ? 0 : nextIndex)
  }

  const handlePlayPauseAction = () => setPause(!pause)

  return (
    <section>
      <div className={styles.reviews_container}>
        <h2>Recommendations</h2>

        <div className={styles.review_card_wrapper}>
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

          <div className={styles.review_card_control}>
            <span className={styles.review_card_index}>{currentIndex}</span>
            <button
              onClick={handleLeftKeyAction}
              className={styles.review_card_arrow_left}
            >
              ←
            </button>
            <button
              onClick={handleRightKeyAction}
              className={styles.review_card_arrow_right}
            >
              →
            </button>
            <button
              onClick={handlePlayPauseAction}
              className={styles.review_card_play_pause}
            >
              {pause ? '⏵' : '⏸'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
