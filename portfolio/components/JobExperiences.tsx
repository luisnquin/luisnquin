import React from 'react'
import { JobExperience as Experience } from '../models'
import { JobExperience } from './JobExperience'

interface Props {
  jobExperiences: Experience[]
}

export const JobExperiences = ({ jobExperiences }: Props) => {
  return (
    <section id="job-experiences">
      <div>
        <h2>Experience</h2>

        <ul>
          {jobExperiences.map((experience) => (
            <JobExperience
              experience={experience}
              key={experience.companyName + '-' + experience.startDate}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
