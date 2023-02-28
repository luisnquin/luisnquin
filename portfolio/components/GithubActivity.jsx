import { useGetRepositories } from '../services/hooks/useGetRepositories'
import style from '../styles/RepositoryTable.module.css'
import { Repository } from './Repository.jsx'
import { Code } from 'react-content-loader'

export function GithubActivity({ title }) {
    const { data, err, loading } = useGetRepositories()
    if (err) {
        console.error(err)

        return
    }

    return (
        <section>
            <h3 style={{ textAlign: 'center', marginBottom: '17px' }}>{title}</h3>
            <div className={style.wrapper}>
                {loading
                    ? Array.from({ length: 6 }, (_, i) => i).map((index) => {
                          return <Code key={index} width={400} height={200} speed={500} />
                      })
                    : data.map((elem) => {
                          return (
                              <Repository
                                  key={elem.id}
                                  title={elem.name}
                                  description={elem.description}
                                  updatedAt={elem.updatedAt}
                                  language={elem.language}
                                  url={elem.url}
                              />
                          )
                      })}
            </div>
        </section>
    )
}
