import styles from '../styles/JobExperiences.module.css'
import { CompanyExperiences } from '../models'
import { JobExperience } from './JobExperience.tsx'
import { SectionTitle } from './SectionTitle.tsx'

interface Props {
  items: CompanyExperiences[]
}

export const JobExperiences = ({ items }: Props) => {
  return (
    <section id="experience" className={styles.job_experiences_section}>
      <SectionTitle title="Experience" id="experience" />

      <div className={styles.job_experiences_card}>
        <ul className={styles.job_experiences_list}>
          {items.map((experience, i) => (
            <JobExperience
              key={`${experience.companyName}-${i}`}
              companyExperience={experience}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
