import React from 'react'
import styles from '../styles/ContactMe.module.css'
import { SectionTitle } from './SectionTitle.tsx'
import { HeroCopy } from './HeroCopy.tsx'

interface Props {
  email: string
}

export const ContactMe = ({ email }: Props) => {
  return (
    <section id="contact-me" className={styles.contact_me}>
      <SectionTitle title="Contact Me" id="contact-me" />

      <div className={styles.contact_me_message}>
        <p>Feel free to contact me at:</p>
        <HeroCopy isContactMail text={email} />
      </div>
    </section>
  )
}
