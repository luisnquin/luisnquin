import { UserCommitsInfo } from '../../models/github'
import { GitHubService } from '../fetchers'
import { useEffect, useState } from 'react'

// Returns the number of commits performed this year.
export function useGetCommits(username: string) {
  const [count, setCount] = useState(0)
  const [isComplete, setComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    GitHubService.getCommitsInThisYear(username)
      .then((data: UserCommitsInfo) => {
        setCount(data.total_count)
        setComplete(!data.incomplete_results)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  return {
    count,
    isComplete,
    loading,
  }
}
