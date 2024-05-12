import React from 'react'

import { firaCode, nerdFontsSymbols } from '../styles/fonts'
import styles from '../styles/Footer.module.css'

export const Footer = (): React.JSX.Element => {
  return (
    <footer
      className={`${styles.footer} ${firaCode.variable} ${nerdFontsSymbols.variable}`}
    >
      <div>
        <span>^^</span>

        <div>
          <a
            href="https://github.com/luisnquin/luisnquin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-small-gap"
          >
            Source
            <span className={`${styles.external_link} very-small`}> </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
