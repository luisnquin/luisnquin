/**
 * A job experience without the company name.
 *
 * Used by {@link CompanyExperiences} interface.
 */
export interface Experience {
  positionTitle: string
  location: string
  technologies: string[]
  desc: {
    aboutProduct?: string
    roleOverview?: string
    responsibilities: string[]
  }
  startDate: string
  endDate?: string
}

/**
 * Represents more than one job experience in a company.
 */
export interface CompanyExperiences {
  companyName: string
  experiences: Experience[]
}
