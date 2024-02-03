import styles from '../styles/CompanyExperience.module.css'

import { CompanyExperience as CompExperience } from '../models'

interface Props {
  companyExperience: CompExperience
}

const getYearsLabel = (companyExp: CompExperience): string => {
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

  const msdYear = minStartDate?.getUTCFullYear() || 0
  const medYear = maxEndDate?.getUTCFullYear() || 0

  if (medYear == 0 || msdYear === medYear) {
    return `(${msdYear})`
  }

  return `(${msdYear} - ${medYear})`
}

export const CompanyExperience = ({ companyExperience: item }: Props) => {
  return (
    <li className={styles.company_experiences_card}>
      <h3>
        {item.companyName}
        <span className={styles.company_experiences_year_range}>
          {getYearsLabel(item)}
        </span>
      </h3>

      {item.about
        ? item.about
            /* eslint indent: "off" */
            .split('\n')
            .map((line, i) => (
              <p key={i} className={styles.company_experiences_about}>
                {line}
              </p>
            ))
        : null}

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
                {exp.desc?.achievements.length > 0 ? (
                  <div>
                    <h5>Achievements</h5>
                    <ul
                      className={styles.company_experiences_item_achievements}
                    >
                      {exp.desc.achievements.map((line, i) => {
                        return (
                          <li key={i}>
                            <span>{line}</span>
                          </li>
                        )
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
