import React from 'react'
import { firaCode, nerdFontsSymbols } from '../styles/fonts.ts'
import styles from '../styles/Interests.module.css'
import { SectionTitle } from './SectionTitle.tsx'
import { Interest } from '../models'

interface Props {
  items: Interest[]
}

export const Interests = ({ items }: Props): React.JSX.Element => {
  return (
    <section id="interests" className={styles.interests_section}>
      <SectionTitle title="Interests" id="interests" />

      <table className={styles.interests_table}>
        <tbody className={`${firaCode.variable} ${nerdFontsSymbols.variable}`}>
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
