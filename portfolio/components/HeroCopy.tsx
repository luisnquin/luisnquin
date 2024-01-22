import { useState } from 'react'
import { nerdFontsSymbols } from '../styles/fonts'
import styles from '../styles/HeroCopy.module.css'

interface Props {
  text: string
  tooltip?: string
  isCommand?: boolean
  isContactMail?: boolean
}

export const HeroCopy = ({
  text,
  tooltip,
  isCommand,
  isContactMail,
}: Props) => {
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
        <h3 className={styles.text}>
          {text}
          {tooltip ? <span>{tooltip}</span> : null}
        </h3>
      )}

      <button
        className={`${styles.copy_to_clipboard} ${nerdFontsSymbols.variable}`}
        onClick={copyToClipboard}
      >
        {copied ? '󰄬' : '󰆏'}
      </button>
    </div>
  )
}
