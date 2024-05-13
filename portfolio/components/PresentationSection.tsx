import React from 'react'

import styles from '../styles/PresentationSection.module.css'
import { nerdFontsSymbols } from '../styles/fonts.ts'

import { ExternalLink } from '../models/index.ts'
import { ScrollDown } from './ScrollDown.tsx'
import { HeroCopy } from './HeroCopy.tsx'
import { GPG } from './GPG.tsx'

interface Props {
  externalLinks: ExternalLink[]
  cli: { command: string }
  whoami: { names: string; position: string }
  publicKey: string
}

export const PresentationSection = ({
  externalLinks,
  publicKey,
  whoami,
  cli,
}: Props) => {
  return (
    <section id="presentation" className={styles.presentation}>
      <ScrollDown className={styles.scroll_down} />

      <div className={styles.whoami}>
        <h1>{whoami.names}</h1>
        <h2 className={styles.position_title}>{whoami.position}</h2>
      </div>

      <HeroCopy isCommand text={cli.command} />

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
