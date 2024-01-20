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
    <li className={styles.company_experiences_card}>
      <h3>
        {item.companyName}
        <span className={styles.company_experiences_year_range}>
          {getYearsLabel(item)}
        </span>
      </h3>

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
            <li
              key={`${item.companyName}${exp.positionTitle}`}
              className={styles.company_experiences_item}
            >
              <h4 style={{ fontSize: '15px' }}>
                {exp.positionTitle}
                <span>
                  ({formatDate(exp.startDate)} - {formatDate(exp.endDate)})
                </span>
              </h4>

              <span className={styles.company_experiences_item_location}>
                {exp.location.place} - {exp.location.type}
              </span>

              <div>
                <div>{exp.desc?.aboutProduct}</div>
                <div>{exp.desc?.roleOverview}</div>

                {exp.desc.achievements.length > 0 ? (
                  <div>
                    <h5>Achievements</h5>
                    <ul
                      className={styles.company_experiences_item_achievements}
                    >
                      {exp.desc.achievements.map((line, i) => {
                        return <li key={i}>{line}</li>
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>

              <ul className={styles.company_experiences_item_technologies}>
                {exp.technologies.map((tech) => {
                  return <li key={tech}>{tech}</li>
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
