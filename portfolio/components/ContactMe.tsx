import React from 'react'
import { HeroCopy } from './HeroCopy.tsx'
import styles from '../styles/ContactMe.module.css'

interface Props {
  email: string
}

export const ContactMe = ({ email }: Props) => {
  return (
    <section id="contact-me" className={styles.contact_me}>
      <h2>Contact Me</h2>
      <div className={styles.contact_me_message}>
        <p>Feel free to contact me at:</p>
        <HeroCopy isContactMail text={email} />
      </div>
    </section>
  )
}
