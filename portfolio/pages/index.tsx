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
  Projects,
  Reviews,
  Footer,
} from '../components'

const {
  gpgPublicKey: publicKey,
  companyExperiences,
  externalLinks,
  lastCLIUpdate,
  technologies,
  contactEmail,
  interests,
  projects,
  reviews,
} = data

export default function Home() {
  const meta = {
    title: 'Portfolio',
    favicon: '/favicon.png',
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{meta.title}</title>
        <link rel="shortcut icon" href={meta.favicon} />
      </Head>

      <main className={styles.main}>
        <Presentation
          lastCLIUpdate={lastCLIUpdate}
          externalLinks={externalLinks}
          publicKey={publicKey}
        />
        <Experience items={companyExperiences} />
        <Projects items={projects} />
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
