import React from 'react'
import { Interest } from '../models/interest'
import styles from '../styles/Interests.module.css'

interface Props {
  items: Interest[]
}

export const Interests = ({ items }: Props): React.JSX.Element => {
  return (
    <section className={styles.interests_section}>
      <h2>Interests</h2>

      <table className={styles.interests_table}>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td>
                <a
                  href={item.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="nerd-fonts very-small"></span> {item.name}
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
