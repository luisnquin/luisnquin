import React, { useState } from 'react'

import styles from '../styles/ProjectsSection.module.css'
import { nerdFontsSymbols } from '../styles/fonts.ts'

import { SectionTitle } from './SectionTitle.tsx'
import { Project } from '../models/index.ts'

interface Props {
  items: Project[]
}

export const ProjectsSection = ({ items }: Props): React.JSX.Element => {
  const [more, setMore] = useState(false)

  const handleMoreClick = () => setMore(!more)

  return (
    <section id="projects" className={styles.section}>
      <SectionTitle id="projects" title="Projects" />

      <div className={styles.card}>
        <ul>
          {items.slice(0, more ? items.length : 3).map((item) => (
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

        {items.length > 3 && (
          <button
            type="button"
            className={styles.show_more}
            onClick={handleMoreClick}
          >
            {more ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </section>
  )
}
