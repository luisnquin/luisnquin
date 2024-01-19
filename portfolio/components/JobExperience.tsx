import { JobExperience as Experience } from '../models'

interface Props {
  experience: Experience
}

export const JobExperience = ({ experience }: Props) => {
  return (
    <li>
      <h4>
        {experience.companyName} - <span> {experience.positionTitle}</span>
      </h4>
    </li>
  )
}
