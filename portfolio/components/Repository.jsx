import { getLangColor } from '../services/utils/languageColor'
import style from '../styles/Repository.module.css'
import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'
import { useState } from 'react'
import Image from 'next/future/image'

TimeAgo.addLocale(en)

export function Repository({ title, description, url, language, updatedAt }) {
  const [isHover, setHover] = useState(false)

  return (
    <a
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={style.card}
      href={url}
      rel="noreferrer"
      target="_blank"
      style={
        isHover
          ? { boxShadow: `${getLangColor(language)} 0px 2px 8px 0px` }
          : null
      }
    >
      <div className={style['title_updatedAtContainer']}>
        <div className={style['title_imageContainer']}>
          <h5 className={style.title}>
            {title}{' '}
            <Image
              src="/git-branch.png"
              alt="git-branch"
              width="15"
              height="15"
            />
          </h5>
        </div>
        <p className={style.updatedAt}>
          {new TimeAgo('en-US').format(new Date(updatedAt))}
        </p>
      </div>

      <p className={style.description}>{description}</p>
      <Image
        style={
          isHover
            ? {
                opacity: '0.7',
                animation: 'mover 1s infinite alternate',
              }
            : { opacity: '0.7' }
        }
        src="/angle-arrow-down.webp"
        alt="angle-arrow-down"
        width="20"
        height="20"
        layout="fixed"
      />
    </a>
  )
}
