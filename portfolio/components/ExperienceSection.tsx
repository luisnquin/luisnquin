import styles from '../styles/ExperienceSection.module.css'
import { CompanyExperience } from './CompanyExperience.tsx'
import { SectionTitle } from './SectionTitle.tsx'
import { CompanyExperience as CompExperience } from '../models/index.ts'

interface Props {
  items: CompExperience[]
}

export const ExperienceSection = ({ items }: Props) => {
  return (
    <section id="experience" className={styles.job_experiences_section}>
      <SectionTitle title="Experience" id="experience" />

      <div className={styles.job_experiences_card}>
        <ul className={styles.job_experiences_list}>
          {items.map((companyExperience, i) => (
            <CompanyExperience key={i} companyExperience={companyExperience} />
          ))}
        </ul>
      </div>
    </section>
  )
}
