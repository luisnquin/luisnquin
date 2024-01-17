import { UserCommitsInfo } from '../../models/userCommits.model'
import { useEffect, useState } from 'react'

// Returns the number of commits performed this year.
export function useGetCommits() {
  const currentYear: number = new Date().getFullYear()
  const url = `https://api.github.com/search/commits?q=author:luisnquin+committer-date:${currentYear}..${currentYear}`

  const [count, setCount] = useState(0)
  const [isComplete, setComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((data: UserCommitsInfo) => {
        setCount(data.total_count)
        setComplete(!data.incomplete_results)
        setLoading(false)
      })
      .catch(console.error)
  }, [url])

  return {
    count,
    isComplete,
    loading,
  }
}
