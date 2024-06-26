import React from 'react'

import { firaCode, nerdFontsSymbols } from '../styles/fonts.ts'
import styles from '../styles/TechnologiesSection.module.css'

import { Technology } from '../models/index.ts'
import { SectionTitle } from './SectionTitle.tsx'

interface Props {
  items: Technology[]
}

export const TechnologiesSection = ({ items }: Props) => {
  return (
    <section id="technologies" className={styles.technologies_section}>
      <SectionTitle title="Technologies" id="technologies" />

      <div className={styles.technologies_container}>
        <ul className={styles.technologies_list}>
          {items.map((item) => (
            <li
              key={item.name}
              className={`${firaCode.variable} ${nerdFontsSymbols.variable}`}
            >
              <h3>{item.name}</h3>
              <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
