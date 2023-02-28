import { GithubActivity } from '../components/GithubActivity.jsx'
import { useGetCVInfo } from '../services/hooks/useGetCVInfo'
import { HeroCommand } from '../components/HeroCommand.jsx'
import { MainSkills } from '../components/MainSkills.jsx'
import { ScrollDown } from '../components/ScrollDown.jsx'
import { ToastContainer, toast } from 'react-toastify'
import styles from '../styles/Home.module.css'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'

// import { JobExperience } from '../components/JobExperience.jsx'

console.log('$ nao cat answer | grep "49 20 6d 69 73 73 20 79 6f 75"')

const reviews = [
    {
        author: 'Kallie Alma Robson',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras porttitor eros vitae eleifend ullamcorper. Praesent sit amet lacinia sapien. Nunc vel massa ultricies, rhoncus diam a, semper mauris. Pellentesque non lacus eu nulla molestie mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum consequat porta magna id viverra. Morbi et nunc varius, fringilla tellus vitae, fringilla nisi. Donec non neque maximus orci fringilla porta at id ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lacus ac tempus sagittis. Nulla ac mi vel justo auctor aliquam.'
    },
    {
        author: 'Norman Winona Mayer',
        content:
            'Phasellus dui magna, maximus eget felis ut, ultrices maximus magna. Curabitur malesuada finibus quam et vestibulum. Vivamus ac diam dolor. Aliquam sagittis vehicula ante ultricies sagittis. Pellentesque cursus orci ac tellus elementum viverra. Sed eget enim sit amet nibh tincidunt hendrerit. Etiam turpis mi, ultricies sit amet mauris sit amet, varius pulvinar odio. Ut non ex justo. Phasellus at tristique mi, consequat scelerisque felis. Praesent in quam sed dui facilisis aliquet eu vel elit. Cras sed orci lectus. Mauris tortor risus, eleifend a luctus vel, eleifend id eros. Donec erat felis, semper interdum augue at, faucibus efficitur erat.'
    },
    {
        author: 'Raakel Gerry Wilder',
        content:
            'Aenean efficitur placerat cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet nec risus a mattis. Suspendisse potenti. Proin dapibus eget augue ut porttitor. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ante odio, hendrerit in pulvinar quis, bibendum et velit. Vestibulum efficitur, nibh et pulvinar viverra, tortor massa mattis felis, eget cursus nulla augue at metus. Cras at vulputate dolor. In eu libero et ante sodales eleifend. Nulla vel hendrerit dolor. Cras hendrerit condimentum quam sed varius. Nam rhoncus tempus leo sollicitudin ultrices. Integer sit amet sapien eu enim vestibulum vehicula. Curabitur lectus sapien, dapibus non volutpat non, consequat at arcu.'
    }
]

const skills = [
    {
        name: 'Go',
        description: 'Programming Language',
        src: '/go.png'
    },
    {
        name: 'Docker',
        description: 'Container manager',
        src: '/docker.png'
    },
    {
        name: 'ReactJS',
        description: 'Interface library',
        src: '/react.png'
    },
    {
        name: 'NextJS',
        description: 'ReactJS framework',
        src: '/nextjs.png'
    },
    {
        name: 'Linux',
        description: 'Development-oriented distributions',
        src: '/tux.png'
    },
    {
        name: 'AWS',
        description: 'Cloud services',
        src: '/aws.png'
    }
]

const jobExperiences = []

export default function Home() {
    useEffect(() => {
        const [emoji, eventName] = getDateEvent()

        toast(`Happy ${eventName}! ${emoji}`, {
            type: 'default',
            delay: 500,
            theme: 'light',
            icon: false
        })
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Portfolio</title>
                <meta name="description" content="My personal portfolio with all my available projects" />
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
                <a href="https://github.com/luisnquin/nao/actions/workflows/go.yml" target="_blank" rel="noreferrer">
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
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{' '}
            <br /> <br /> <br /> <br /> <br />
            <ToastContainer limit={1} />
        </div>
    )
}

/**
 * const request = (data, headers) => {
  // @ts-ignore
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers,
    data,
  });
};
 * 
 */

/**
 *  {
      query: `
      query userInfo($login: String!) {
        user(login: $login) {
          # fetch only owner repos & not forks
          repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables,
    },
    {
      Authorization: `token ${token}`,
    },
 * 
 */

/*
  @description Information stolen from 'https://emojipedia.org' 🎃
*/

/**
 *
 * @returns an emoji related to the event and the event name.
 */
function getDateEvent(): [string, string] {
    const randEmoji = (emojis: string[]) => emojis[Math.floor(Math.random() * emojis.length)]

    const currentDt = new Date()
    const currentMonth: number = currentDt.getMonth() + 1
    const currentDay: number = currentDt.getDate()

    if (currentDay === 1 && currentMonth === 1) {
        return [randEmoji(['🌉', '👯', '🍷', '🍾', '🍸', '🍹', '🎆', '🎊']), 'New Year']
    }

    if (currentDay === 14 && currentMonth === 2) {
        return [randEmoji(['💞', '🍫', '🧸', '💐', '🌹', '💌', '🏩']), 'Valentine']
    }

    if (currentDay === 31 && currentMonth === 10) {
        return [randEmoji(['💀', '⚰️', '🕵️', '🧛', '🐈‍⬛', '🦉', '🩸', '🦇', '🥀', '🎃']), 'Halloween']
    }

    if ((currentDay === 24 || currentDay === 25) && currentMonth === 12) {
        return [randEmoji(['🎅', '🦌', '🎁', '🎄', '🔔', '🌟', '☃️']), 'Christmas']
    }

    switch (currentMonth) {
        case 1:
        case 2:
        case 12:
            return [randEmoji(['🏔️', '🧤', '⛄', '❄️', '🌬️', '🌲', '🏂']), 'Winter']
        case 3:
        case 4:
        case 5:
            return [randEmoji(['🐇', '🐣', '🌳', '🍃', '🌞', '🌷', '🌱']), 'Spring']
        case 6:
        case 7:
        case 8:
            return [randEmoji(['🌴', '🍹', '🐚', '👙', '☀️']), 'Summer']
        case 9:
        case 10:
        case 11:
            return [randEmoji(['🍂', '🍊', '🌰', '🥮', '🥧', '🌆', '🌇']), 'Fall']
    }

    return ['🍍', 'Pineapple']
}
