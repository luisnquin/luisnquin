import React from 'react'
import styles from '../styles/Presentation.module.css'
import { nerdFontsSymbols } from '../styles/fonts.ts'
import { ScrollDown } from './ScrollDown.tsx'
import { GPG } from '../components/GPG.tsx'
import { SocialNetwork } from '../models'
import { HeroCopy } from './HeroCopy.tsx'

interface Props {
  socialNetworks: SocialNetwork[]
  publicKey: string
}

export const Presentation = ({ socialNetworks, publicKey }: Props) => {
  return (
    <section id="presentation" className={styles.presentation}>
      <ScrollDown className={styles.scroll_down} />

      <div className={styles.whoami}>
        <h1>Luis Quiñones Requelme</h1>
        <h2 className={styles.position_title}>Software Developer</h2>
      </div>

      <HeroCopy isCommand text="npx luisnquin@latest" />

      <ul className={`${styles.social_media} ${nerdFontsSymbols.variable}`}>
        {socialNetworks.map((socialNetwork) => (
          <li key={socialNetwork.name}>
            <a
              href={socialNetwork.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-small-gap"
            >
              {socialNetwork.name}
              <span className={`${styles.external_link} very-small`}> </span>
            </a>
          </li>
        ))}
      </ul>

      <GPG publicKey={publicKey} />
    </section>
  )
}
