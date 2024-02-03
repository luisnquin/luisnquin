import React from 'react'

import { firaCode, nerdFontsSymbols } from '../styles/fonts.ts'
import styles from '../styles/InterestsSection.module.css'

import { SectionTitle } from './SectionTitle.tsx'
import { Interest } from '../models/index.ts'

interface Props {
  items: Interest[]
}

export const InterestsSection = ({ items }: Props): React.JSX.Element => {
  return (
    <section id="interests" className={styles.interests_section}>
      <SectionTitle title="Interests" id="interests" />

      <table className={styles.interests_table}>
        <tbody className={`${firaCode.variable} ${nerdFontsSymbols.variable}`}>
          <tr>
            <th style={{ width: '22%' }}></th>
            <th style={{ width: '78%' }}></th>
          </tr>

          {items.map((item) => (
            <tr key={item.name}>
              <td>
                <a
                  href={item.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                  <span className={`${styles.external_link} very-small`}>
                    {' '}
                    
                  </span>
                </a>
              </td>
              <td>
                <p>{item.desc}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
