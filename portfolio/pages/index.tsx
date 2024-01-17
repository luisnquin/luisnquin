import { GithubActivity } from '../components/GithubActivity.jsx'
import { HeroCommand } from '../components/HeroCommand.jsx'
import { MainSkills } from '../components/MainSkills.tsx'
import { ScrollDown } from '../components/ScrollDown.jsx'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Head from 'next/head'

import data from '../data.json' assert { type: 'json' }

const { skills } = data

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
        <br />
        <ScrollDown />
        <br />
        <br />
        <HeroCommand command="npx luisnquin@latest" />
        <br />
        <br />
        <MainSkills skills={skills} />
        <br /> <br /> <br /> <br /> <br />
        <a
          href="https://github.com/luisnquin/nao/actions/workflows/go.yml"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width={90}
            height={20}
            src="https://github.com/luisnquin/nao/actions/workflows/go.yml/badge.svg"
            alt="repository-actions"
          />
        </a>
        <br />
        <br />
        <br />
        <GithubActivity title="Last activity in GitHub" />
      </main>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
      <br /> <br /> <br /> <br /> <br />
    </div>
  )
}
