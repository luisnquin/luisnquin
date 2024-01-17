import style from '../styles/MainSkills.module.css'
import Image from 'next/future/image'

export function MainSkills({ skills }) {
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
          const { name, description, src } = skill

          return (
            <div
              key={name}
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
                src={src}
                alt={name}
                width={75}
                height={75}
              />

              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}
              >
                <h4>{name}</h4>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#828282',
                    maxWidth: '180px',
                    fontSize: 14,
                  }}
                >
                  {description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
