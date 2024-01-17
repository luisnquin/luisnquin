import {
  getRepositoriesFromStore,
  setRepositoriesInStore,
} from '../store/repositories'
import { GitHubService } from '../fetchers'
import { Repository } from '../../models/github/repository.model'
import { useState, useEffect } from 'react'

export function useGetRepositories(
  owner: string,
  maxCount: number = 6,
  refresh: boolean = false
): {
  data: Repository[]
  error: null
  loading: boolean
} {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const signal = AbortSignal.timeout(3000)

    const fetchRepositories = () => {
      GitHubService.getUserRepositories(owner, maxCount, signal)
        .then((repositories) => {
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
    }

    if (refresh) {
      fetchRepositories()
      return
    }

    getRepositoriesFromStore(false)
      .then((data: Repository[]) => {
        setData(data)
        setLoading(false)
      })
      .catch((_) => fetchRepositories())
  }, [])

  return { data, error, loading }
}
