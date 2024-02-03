import React from 'react'

import styles from '../styles/PresentationSection.module.css'
import { nerdFontsSymbols } from '../styles/fonts.ts'

import { ExternalLink } from '../models/index.ts'
import { ScrollDown } from './ScrollDown.tsx'
import { HeroCopy } from './HeroCopy.tsx'
import { GPG } from './GPG.tsx'

interface Props {
  externalLinks: ExternalLink[]
  lastCLIUpdate: string
  publicKey: string
}

export const PresentationSection = ({
  lastCLIUpdate,
  externalLinks,
  publicKey,
}: Props) => {
  return (
    <section id="presentation" className={styles.presentation}>
      <ScrollDown className={styles.scroll_down} />

      <div className={styles.whoami}>
        <h1>Luis Quiñones Requelme</h1>
        <h2 className={styles.position_title}>Software Developer</h2>
      </div>

      <HeroCopy
        isCommand
        text="npx luisnquin@latest"
        tooltip={`Last modification: ${lastCLIUpdate}`}
      />

      <ul className={`${styles.social_media} ${nerdFontsSymbols.variable}`}>
        {externalLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-small-gap"
            >
              {link.name}
              <span className={`${styles.external_link} very-small`}> </span>
            </a>
          </li>
        ))}
      </ul>

      <GPG publicKey={publicKey} />
    </section>
  )
}
