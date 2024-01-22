import styles from '../styles/Footer.module.css'
import { firaCode, nerdFontsSymbols } from '../styles/fonts'
import React from 'react'

export const Footer = (): React.JSX.Element => {
  return (
    <footer
      className={`${styles.footer} ${firaCode.variable} ${nerdFontsSymbols.variable}`}
    >
      <div>
        <span>^^</span>

        <div>
          <a
            href="https://excalidraw.com/#json=DSx9MC0Lnq3xoc0mGoZoo,hsAHxHw3rt-B6y7EXj0jUg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-small-gap"
          >
            Draft (Excalidraw)
            <span className={`${styles.external_link} very-small`}> </span>
          </a>
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
