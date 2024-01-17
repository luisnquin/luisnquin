import { useState } from 'react'
import styles from '../styles/HeroCommand.module.css'
import Image from 'next/image'

export function HeroCommand({ command }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)

    if (!copied) {
      setCopied(true) &&
        setTimeout(() => {
          setCopied(false)
        }, 3000)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Image
        src="/arrow-right.png"
        alt="arrow-right"
        width={13}
        height={13}
        className={styles.arrow_right}
      />

      <h4 className={styles.text}>{command}</h4>
      <Image
        src={copied ? '/done.png' : '/copy-to-clipboard.png'}
        alt="copy-to-clipboard"
        width={15}
        height={15}
        className={styles.copy_to_clipboard}
        onClick={copyToClipboard}
      />
    </div>
  )
}
