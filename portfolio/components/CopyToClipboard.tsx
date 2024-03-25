import { useState } from 'react'

import { nerdFontsSymbols } from '../styles/fonts'
import styles from '../styles/CopyToClipboard.module.css'

interface Props {
  className?: string
  text: string
  hidden: boolean
}

export const CopyToClipboard = ({ className, text, hidden }: Props) => {
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
    <button
      className={`${nerdFontsSymbols.variable} ${styles.copy_to_clipboard} ${className ? className : ''}`}
      onClick={copyToClipboard}
      hidden={hidden}
    >
      {copied ? '󰄬' : '󰆏'}
    </button>
  )
}
