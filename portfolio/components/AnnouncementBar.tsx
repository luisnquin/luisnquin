import { MouseEvent, useEffect, useState } from 'react'
import styles from '../styles/AnnouncementBar.module.css'
import { firaCode } from '../styles/fonts.ts'
import { CloseSvg } from './CloseSvg.tsx'

const SKIPPED_AT_KEY = 'announcement-bar-closed-at'

const getClosedAt = (): Date | null => {
  try {
    const closedAt = localStorage.getItem(SKIPPED_AT_KEY)

    return closedAt ? new Date(closedAt) : null
  } catch (e) {
    console.log(`error parsing 'closedAt' value: ${e}`)
    return null
  }
}

export const AnnouncementBar = () => {
  const [closed, setClosed] = useState(true)

  useEffect(() => {
    const closedAt = getClosedAt()
    if (!closedAt) {
      setClosed(false)
      return
    }

    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    if (closedAt > twoDaysAgo) {
      setClosed(true)
    }
  }, [closed])

  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    localStorage.setItem(SKIPPED_AT_KEY, new Date().toISOString())
    setClosed(true)
  }

  return (
    <div
      className={`${styles.announcement_bar} ${firaCode.variable}`}
      style={{ display: closed ? 'none' : 'block' }}
    >
      <p>
        I'm your most valuable asset? Check out my{' '}
        <a href="https://wishlist.luisquinones.me" target="_blank">
          wishlist
        </a>
        !
      </p>

      <button onClick={handleClose}>
        <CloseSvg width={20} height={20} />
      </button>
    </div>
  )
}
