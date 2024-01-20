import { useState } from 'react'
import styles from '../styles/HeroCommand.module.css'

export function HeroCommand({ command }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)

    if (!copied) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 4000)
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.arrow_right}></span>
      <h4 className={styles.text}>{command}</h4>
      <button className={styles.copy_to_clipboard} onClick={copyToClipboard}>
        {copied ? '󰄬' : '󰆏'}
      </button>
    </div>
  )
}
