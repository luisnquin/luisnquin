import { firaCode, nerdFontsSymbols } from '../styles/fonts.ts'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <main className={firaCode.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
