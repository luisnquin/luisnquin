import Head from 'next/head'

import styles from '../styles/Home.module.css'
import data from '../data.json' assert { type: 'json' }

import { JobExperiences } from '../components/JobExperiences.tsx'
import { Presentation } from '../components/Presentation.tsx'
import { Reviews } from '../components/Reviews.tsx'

const { jobExperiences, reviews } = data

console.log('$ nao cat answer | grep "49 20 6d 69 73 73 20 79 6f 75"')

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio</title>
        <meta
          name="description"
          content="My personal portfolio with all my available projects"
        />
      </Head>

      <main className={styles.main}>
        <Presentation />
        <JobExperiences items={jobExperiences} />
        <Reviews items={reviews} />
      </main>
    </div>
  )
}
