import React from 'react'
import { nerdFontsSymbols } from '../styles/fonts.ts'
import { SectionTitle } from './SectionTitle.tsx'
import styles from '../styles/Projects.module.css'
import { Project } from '../models'

interface Props {
  items: Project[]
}

export const Projects = ({ items }: Props): React.JSX.Element => {
  return (
    <section className={styles.section}>
      <SectionTitle title="Projects" id="projects" />

      <div>
        <ul>
          {items.map((item) => (
            <li key={item.title} className={styles.project}>
              <div>
                <h4>
                  <a
                    href={item.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={nerdFontsSymbols.variable}
                  >
                    {item.title}

                    <span className={`${styles.external_link} very-small`}>
                      {' '}
                      
                    </span>
                  </a>
                </h4>

                <p>{item.desc}</p>
              </div>

              <div>
                <h5>Why?</h5>
                <p>{item.why}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
