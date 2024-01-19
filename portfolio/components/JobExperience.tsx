import styles from '../styles/JobExperience.module.css'
import { CompanyExperiences } from '../models'

interface Props {
  companyExperience: CompanyExperiences
}

const getYearsLabel = (companyExp: CompanyExperiences): string => {
  let minStartDate: Date, maxEndDate: Date

  for (const experience of companyExp.experiences) {
    const sd = new Date(experience.startDate)

    if (!minStartDate || sd < minStartDate) {
      minStartDate = sd
    }

    if (experience.endDate) {
      const ed = new Date(experience.endDate)

      if (!maxEndDate || ed > maxEndDate) {
        maxEndDate = ed
      }
    }
  }

  if (!minStartDate && !maxEndDate) {
    throw new Error(
      `could not get a valid range for '${companyExp.companyName}' company :(`
    )
  }

  const msdYear = minStartDate.getFullYear() || 0
  const medYear = maxEndDate.getFullYear() || 0

  if (msdYear === medYear) {
    return `(${msdYear})`
  }

  return `(${msdYear} - ${medYear})`
}

export const JobExperience = ({ companyExperience: item }: Props) => {
  return (
    <li className={styles.company_experience_card}>
      <h4>
        {item.companyName}
        <span className={styles.company_experience_years}>
          {getYearsLabel(item)}
        </span>
      </h4>

      <ul className={styles.company_experiences}>
        {item.experiences.map((exp) => {
          const formatDate = (date?: string): string => {
            if (!date) return 'Present'

            return new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              timeZone: 'UTC',
            })
          }

          return (
            <li key={`${item.companyName}${exp.positionTitle}`}>
              <h5>
                {exp.positionTitle}
                <span className={styles.date_range}>
                  ({formatDate(exp.startDate)} - {formatDate(exp.endDate)})
                </span>
              </h5>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
