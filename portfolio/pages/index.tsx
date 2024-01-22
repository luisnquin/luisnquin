import Head from 'next/head'

import styles from '../styles/Home.module.css'
import data from '../data.json' assert { type: 'json' }

import {
  Presentation,
  Technologies,
  Experience,
  SnakeBoard,
  ContactMe,
  Interests,
  Reviews,
  Footer,
} from '../components'

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
