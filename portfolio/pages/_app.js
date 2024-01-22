import { firaCode } from '../styles/fonts.ts'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className={firaCode.className}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
