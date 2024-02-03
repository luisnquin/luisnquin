import { Fira_Code } from 'next/font/google'
import localFont from 'next/font/local'

// https://nextjs.org/docs/pages/api-reference/components/font

export const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: '400',
  fallback: [
    // System fonts
    'Fira-Code',
    'Arial',
    'system-ui',
  ],
  variable: '--fira-code',
})

export const nerdFontsSymbols = localFont({
  src: '../public/NerdFontsSymbols-Nerd-Font.woff2',
  variable: '--nerd-fonts-symbols',
})
