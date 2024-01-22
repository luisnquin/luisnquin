import styles from '../styles/Footer.module.css'
import { firaCode, nerdFontsSymbols } from '../styles/fonts'
import React from 'react'

export const Footer = (): React.JSX.Element => {
  return (
    <footer
      className={`${styles.footer} ${firaCode.variable} ${nerdFontsSymbols.variable}`}
    >
      <span>^^</span>
      <a
        href="https://github.com/luisnquin/luisnquin"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-small-gap"
      >
        Source
        <span className={`${styles.external_link} very-small`}> </span>
      </a>
    </footer>
  )
}
