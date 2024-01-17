import style from '../styles/MainSkills.module.css'
import Image from 'next/future/image'

interface Skill {
  name: string
  description: string
  src: string
  width?: number
  height?: number
}

interface Props {
  skills: Skill[]
}

export function MainSkills({ skills }: Props) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        Main skills
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          gap: '35px',
        }}
      >
        {skills.map((skill) => {
          return (
            <div
              key={skill.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
              }}
            >
              <Image
                className={style.SkillLogo}
                src={skill.src}
                alt={skill.name}
                width={skill.width ? skill.width : 75}
                height={skill.height ? skill.height : 75}
              />

              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <h4>{skill.name}</h4>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#828282',
                    maxWidth: '180px',
                    fontSize: 14,
                  }}
                >
                  {skill.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
