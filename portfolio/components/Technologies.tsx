import React from 'react'
// import Image from 'next/image'
import { Technology } from '../models/technology'
import styles from '../styles/Technologies.module.css'

interface Props {
  items: Technology[]
}

export const Technologies = ({ items }: Props) => {
  return (
    <section>
      <div className={styles.technologies_container}>
        <h2>Technologies</h2>
        <ul className={styles.technologies_list}>
          {items.map((item) => (
            <li key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
