import Head from 'next/head'

import styles from '../styles/Home.module.css'
import data from '../data.json' assert { type: 'json' }

import { Presentation } from '../components/Presentation.tsx'
import { Technologies } from '../components/Technologies.tsx'
import { Experience } from '../components/Experience.tsx'
import { SnakeBoard } from '../components/SnakeBoard.tsx'
import { ContactMe } from '../components/ContactMe.tsx'
import { Interests } from '../components/Interests.tsx'
import { Reviews } from '../components/Reviews.tsx'
import { Footer } from '../components/Footer.tsx'

const {
  gpgPublicKey: publicKey,
  companyExperiences,
  socialNetworks,
  technologies,
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
        <Presentation socialNetworks={socialNetworks} publicKey={publicKey} />
        <Experience items={companyExperiences} />
        <Interests items={interests} />
        <Reviews items={reviews} />
        <Technologies items={technologies} />
        <ContactMe email={contactEmail} />
        <SnakeBoard />
      </main>

      <Footer />
    </div>
  )
}
