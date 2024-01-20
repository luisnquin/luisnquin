import React from 'react'
import { ScrollDown } from './ScrollDown.tsx'
import { HeroCopy } from './HeroCopy.tsx'
import styles from '../styles/Presentation.module.css'

export const Presentation = () => {
  return (
    <section id="presentation" className={styles.presentation}>
      <ScrollDown className={styles.scroll_down} />

      <div className={styles.whoami}>
        <h1>Luis Quiñones Requelme</h1>
        <h4>Software Developer</h4>
      </div>

      <HeroCopy isCommand text="npx luisnquin@latest" />

      <ul className={styles.social_media}>
        <li>
          <a
            href="https://github.com/luisnquin"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/luisnquin"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitLab
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/luisnquin"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </li>
      </ul>
    </section>
  )
}
