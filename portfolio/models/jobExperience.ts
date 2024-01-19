export interface JobExperience {
  companyName: string
  location: string
  positionTitle: string
  technologies: string[]
  desc: {
    aboutProduct?: string
    roleOverview?: string
    responsibilities: string[]
  }
  startDate: string
  endDate?: string
}
