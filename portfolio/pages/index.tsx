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
    faviconLight: '/favicon.png',
    faviconDark: '/favicon-dark.png',
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" type="image/png" href={meta.faviconDark} />
        <link
          rel="icon"
          type="image/png"
          href={meta.faviconLight}
          media="(prefers-color-scheme: dark)"
        />
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
