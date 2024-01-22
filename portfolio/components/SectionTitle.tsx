import styles from '../styles/SectionTitle.module.css'
import { nerdFontsSymbols } from '../styles/fonts.ts'

interface Props {
  title: string
  id: string
}

export const SectionTitle = ({ title, id }: Props) => {
  return (
    <h2 className={nerdFontsSymbols.variable}>
      <a href={`#${id}`} className={styles.internal_link}>
        {title}
      </a>
    </h2>
  )
}
