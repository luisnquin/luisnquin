import React from 'react'
import styles from '../styles/Presentation.module.css'
import { ScrollDown } from './ScrollDown.tsx'
import { GPG } from '../components/GPG.tsx'
import { HeroCopy } from './HeroCopy.tsx'

interface Props {
  publicKey: string
}

export const Presentation = ({ publicKey }: Props) => {
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
            className="flex-small-gap"
          >
            GitHub
            <span className="nerd-fonts very-small"> </span>
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/luisnquin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-small-gap"
          >
            GitLab
            <span className="nerd-fonts very-small"> </span>
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/luisnquin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-small-gap"
          >
            LinkedIn
            <span className="nerd-fonts very-small"> </span>
          </a>
        </li>
        <li>
          <a
            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-small-gap"
          >
            Resume
            <span className="nerd-fonts very-small"> </span>
          </a>
        </li>
      </ul>

      <GPG publicKey={publicKey} />
    </section>
  )
}
