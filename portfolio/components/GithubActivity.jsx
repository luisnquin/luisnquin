import style from '../styles/RepositoryTable.module.css'

import { useGetRepositories } from '../services/hooks/useGetRepositories'
import { Repository } from './Repository.jsx'
import { Code } from 'react-content-loader'

export function GithubActivity({ title }) {
  const { data, err, loading } = useGetRepositories(6)
  if (err) {
    console.error(err)
    return
  }

  const generateRepositories = () => {
    if (loading) {
      return Array.from({ length: 6 }, (_, i) => i).map((index) => {
        return <Code key={index} width={400} height={200} speed={500} />
      })
    }

    return data.map((elem) => {
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
    })
  }

  return (
    <section>
      <h3 style={{ textAlign: 'center', marginBottom: '17px' }}>{title}</h3>
      <div className={style.wrapper}>{generateRepositories()}</div>
    </section>
  )
}
