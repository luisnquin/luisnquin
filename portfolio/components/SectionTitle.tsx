import styles from '../styles/SectionTitle.module.css'

interface Props {
  title: string
  id: string
}

export const SectionTitle = ({ title, id }: Props) => {
  return (
    <h2>
      <a href={`#${id}`} className={styles.internal_link}>
        {title}
      </a>
    </h2>
  )
}
