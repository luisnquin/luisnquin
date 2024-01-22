import styles from '../styles/JobExperiences.module.css'
import { CompanyExperience } from './CompanyExperience.tsx'
import { SectionTitle } from './SectionTitle.tsx'
import { CompanyExperience as CompExperience } from '../models'

interface Props {
  items: CompExperience[]
}

export const Experience = ({ items }: Props) => {
  return (
    <section id="experience" className={styles.job_experiences_section}>
      <SectionTitle title="Experience" id="experience" />

      <div className={styles.job_experiences_card}>
        <ul className={styles.job_experiences_list}>
          {items.map((companyExperience, i) => (
            <CompanyExperience
              key={`${companyExperience.companyName}-${i}`}
              companyExperience={companyExperience}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
