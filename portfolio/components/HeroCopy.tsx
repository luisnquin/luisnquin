import { useState } from 'react'
import styles from '../styles/HeroCopy.module.css'

interface Props {
  text: string
  isCommand?: boolean
}

export function HeroCopy({ text, isCommand }: Props) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)

    if (!copied) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 4000)
    }
  }

  return (
    <div className={styles.container}>
      {isCommand ? <span className={styles.arrow_right}>$</span> : null}

      <h4 className={styles.text}>{text}</h4>
      <button className={styles.copy_to_clipboard} onClick={copyToClipboard}>
        {copied ? '󰄬' : '󰆏'}
      </button>
    </div>
  )
}
