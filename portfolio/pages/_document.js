import { Html, Head, Main, NextScript } from 'next/document'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Document() {
  const pageData = {
    title: 'Luis Quiñones Requelme - Portfolio',
    desc: 'Like a link tree. Contains my job experience, interests, projects and more',
    url: 'https://luisquinones.me',
  }

  return (
    <Html>
      <Head>
        <meta property="og:title" content={pageData.title}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content={pageData.url}></meta>
        <meta name="description" content={pageData.desc} key="desc" />
        <meta property="og:description" content={pageData.desc} />
        <meta
          property="og:image"
          content="https://lumiere-a.akamaihd.net/v1/images/sw-visions-screechers-reach-concept-art-gallery-11_0c7105ea.jpeg?region=0%2C0%2C1920%2C818"
        ></meta>
      </Head>

      <body>
        <Main />
        <SpeedInsights />
        <NextScript />
      </body>
    </Html>
  )
}
