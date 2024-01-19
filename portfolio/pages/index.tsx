import { GithubActivity } from '../components/GithubActivity.jsx'
import { JobExperiences } from '../components/JobExperiences.tsx'
import { HeroCommand } from '../components/HeroCommand.jsx'
import { MainSkills } from '../components/MainSkills.tsx'
import { ScrollDown } from '../components/ScrollDown.tsx'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Head from 'next/head'

import data from '../data.json' assert { type: 'json' }

const { skills, jobExperiences } = data

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
        <ScrollDown className={styles.scrollDown} />

        <section id="presentation" className={styles.presentation}>
          <div>
            <h1>Luis Quiñones Requelme</h1>
            <h4>Software Developer</h4>
          </div>

          <HeroCommand command="npx luisnquin@latest" />

          <ul className={styles.social_media}>
            <li>
              <a
                href="https://github.com/luisnquin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://gitlab.com/luisnquin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitLab
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/luisnquin"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </li>
          </ul>
        </section>

        <JobExperiences jobExperiences={jobExperiences} />

        {/* <MainSkills skills={skills} />
        <GithubActivity title="Last activity in GitHub" /> */}
      </main>
    </div>
  )
}
