/**
 * A job experience without the company name.
 *
 * Used by {@link CompanyExperiences} interface.
 */
export interface Experience {
  positionTitle: string
  location: {
    type: string
    place: string
  }
  technologies: string[]
  desc: {
    achievements: string[]
  }
  startDate: string
  endDate?: string
}

/**
 * Represents more than one job experience in a company.
 */
export interface CompanyExperience {
  companyName: string
  about?: string
  experiences: Experience[]
}
