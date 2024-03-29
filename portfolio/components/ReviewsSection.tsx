import React, { useState, useEffect } from 'react'

import { firaCode, nerdFontsSymbols } from '../styles/fonts.ts'
import styles from '../styles/ReviewsSection.module.css'

import { SectionTitle } from './SectionTitle.tsx'
import { Review } from '../models/index.ts'

interface Props {
  items: Review[]
}

const msInterval = 3000

export const ReviewsSection = ({ items }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [pause, setPause] = useState(false)

  const getNextIndex = (): number => {
    const nextIndex = currentIndex + (1 % items.length)
    if (nextIndex >= items.length) {
      return 0
    }

    return currentIndex + (1 % items.length)
  }

  const getPrevIndex = (): number => {
    const nextIndex = currentIndex - 1
    return nextIndex < 0 ? items.length - 1 : nextIndex
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        setCurrentIndex(reverse ? getPrevIndex() : getNextIndex())
      }
    }, msInterval)

    return () => clearInterval(interval)
  }, [reverse, pause, currentIndex, items.length])

  const handleLeftKeyAction = () => setCurrentIndex(getPrevIndex())
  const handleRightKeyAction = () => setCurrentIndex(getNextIndex())
  const handleReverseAction = () => setReverse(!reverse)
  const handlePlayPauseAction = () => setPause(!pause)

  return (
    <section id="recommendations">
      <div className={styles.reviews_container}>
        <SectionTitle title="Recommendations" id="recommendations" />

        <div className={styles.review_card_wrapper}>
          {items.map((review, index) =>
            review.propaganda ? (
              <div
                key={index}
                className={`${styles.review_card} ${index === currentIndex ? styles.active : ''}`}
              >
                <div>
                  <h3>Your comment can be here</h3>

                  <p>
                    If we have worked together in the past or present and you
                    want to share your thoughts about your experience working
                    with me, you can request to submit a recommendation on my
                    LinkedIn. I'd love to hear from you. ;)
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={`${styles.review_card} ${index === currentIndex ? styles.active : ''}`}
              >
                <div>
                  <h3>{review.author}</h3>
                  <span>{review.position}</span>
                </div>

                {review.content.split('\n').map((line, i) => (
                  <p key={i}>"{line}"</p>
                ))}
              </div>
            )
          )}

          <div
            className={`${styles.review_card_control} ${firaCode.variable} ${nerdFontsSymbols.variable}`}
          >
            <span className={styles.review_card_index}>
              {currentIndex}
              <span>index</span>
            </span>
            <span
              className={styles.review_card_next_index}
              style={pause ? { backgroundColor: '#dedecc' } : {}}
            >
              {reverse ? getPrevIndex() : getNextIndex()}
              <span>next</span>
            </span>
            <span className={styles.review_card_capacity}>
              {items.length}
              <span>cap</span>
            </span>

            <button
              onClick={handleLeftKeyAction}
              className={styles.review_card_arrow_left}
            >
              
            </button>
            <button
              onClick={handleRightKeyAction}
              className={styles.review_card_arrow_right}
            >
              
            </button>
            <button
              onClick={handlePlayPauseAction}
              className={styles.review_card_play_pause}
            >
              <span>{pause ? '' : '='}</span>
            </button>
            <button
              onClick={handleReverseAction}
              className={styles.review_card_reverse}
            >
              
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
