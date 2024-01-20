import { useState } from 'react'
import styles from '../styles/HeroCopy.module.css'

interface Props {
  text: string
  isCommand?: boolean
  isContactMail?: boolean
}

export const HeroCopy = ({ text, isCommand, isContactMail }: Props) => {
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

      {isContactMail ? (
        <a href={`mailto:<${text}>`}>{text}</a>
      ) : (
        <h4 className={styles.text}>{text}</h4>
      )}

      <button className={styles.copy_to_clipboard} onClick={copyToClipboard}>
        {copied ? '󰄬' : '󰆏'}
      </button>
    </div>
  )
}
