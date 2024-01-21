import Head from 'next/head'

import styles from '../styles/Home.module.css'
import data from '../data.json' assert { type: 'json' }

import { JobExperiences } from '../components/JobExperiences.tsx'
import { Presentation } from '../components/Presentation.tsx'
import { Technologies } from '../components/Technologies.tsx'
import { SnakeBoard } from '../components/SnakeBoard.tsx'
import { Interests } from '../components/Interests.tsx'
import { ContactMe } from '../components/ContactMe.tsx'
import { Reviews } from '../components/Reviews.tsx'

const {
  jobExperiences,
  technologies,
  gpgPublicKey,
  contactEmail,
  interests,
  reviews,
} = data

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <Presentation publicKey={gpgPublicKey} />
        <JobExperiences items={jobExperiences} />
        <Interests items={interests} />
        <Reviews items={reviews} />
        <Technologies items={technologies} />
        <ContactMe email={contactEmail} />
        <SnakeBoard />
      </main>

      <footer className={styles.footer}>
        <span>^^</span>
        <a
          href="https://github.com/luisnquin/luisnquin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-small-gap"
        >
          Source
          <span className="nerd-fonts very-small"> </span>
        </a>
      </footer>
    </div>
  )
}
