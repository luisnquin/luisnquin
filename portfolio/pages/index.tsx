import Head from 'next/head'

import styles from '../styles/Home.module.css'
import data from '../data/luis-quinones.json' assert { type: 'json' }

import {
  TechnologiesSection,
  PresentationSection,
  ExperienceSection,
  InterestsSection,
  ProjectsSection,
  ContactSection,
  ReviewsSection,
  SnakeBoard,
  Footer,
} from '../components'

const {
  gpgPublicKey: publicKey,
  companyExperiences,
  externalLinks,
  technologies,
  contactEmail,
  interests,
  projects,
  reviews,
  whoami,
  cli,
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
        <PresentationSection
          externalLinks={externalLinks}
          publicKey={publicKey}
          whoami={whoami}
          cli={cli}
        />
        <ExperienceSection items={companyExperiences} />
        <ProjectsSection items={projects} />
        <InterestsSection items={interests} />
        <ReviewsSection items={reviews} />
        <TechnologiesSection items={technologies} />
        <ContactSection email={contactEmail} />
        <SnakeBoard />
      </main>

      <Footer />
    </div>
  )
}
