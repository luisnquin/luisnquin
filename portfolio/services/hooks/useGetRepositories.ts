import {
  getRepositoriesFromStore,
  setRepositoriesInStore,
} from '../store/repositories'
import { Repository } from '../../models/repository.model'
import { useState, useEffect } from 'react'

export function useGetRepositories(maxCount: number = 6): {
  data: Repository[]
  error: null
  loading: boolean
} {
  const url = `https://api.github.com/users/luisnquin/repos?accept=application/vnd.github.v3+json&per_page=${maxCount}&sort=pushed`

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const signal = AbortSignal.timeout(3000)

    getRepositoriesFromStore(false)
      .then((data: Repository[]) => {
        setData(data)
        setLoading(false)
      })
      .catch((_) => {
        fetch(url, {
          signal: signal,
        })
          .then((res) => res.json())
          .then((data: any[]) => {
            const repositories: Repository[] = data.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                description: item.description,
                updatedAt: item.pushed_at,
                language: item.language,
                url: item.svn_url,
              }
            })

            setRepositoriesInStore(repositories)
            setData(repositories)
            setLoading(false)
          })
          .catch(() => {
            getRepositoriesFromStore(true)
              .then((data: Repository[]) => {
                setData(data)
                setLoading(false)
              })
              .catch(setError)
          })
      })
  }, [url])

  return { data, error, loading }
}
