import styles from '../styles/JobExperiences.module.css'
import { CompanyExperiences } from '../models'
import { JobExperience } from './JobExperience'

interface Props {
  items: CompanyExperiences[]
}

export const JobExperiences = ({ items }: Props) => {
  return (
    <section className={styles.job_experiences_section}>
      <div className={styles.job_experiences_card}>
        <h2>Experience</h2>

        <ul className={styles.job_experiences_list}>
          {items.map((experience, i) => (
            <JobExperience
              companyExperience={experience}
              key={`${experience.companyName}-${i}`}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
