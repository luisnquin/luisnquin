import { Repository, UserCommitsInfo } from '../../models/github'

interface GetUserRepositoryResponseItem {
  id: string
  name: string
  description: string
  pushed_at: string
  language: string
  svn_url: string
}

class GitHubService {
  baseUrl: string = 'https://api.github.com'

  async getUserRepositories(
    owner: string,
    maxCount: number,
    signal?: AbortSignal
  ): Promise<Repository[]> {
    const url = `${this.baseUrl}/users/${owner}/repos?accept=application/vnd.github.v3+json&per_page=${maxCount}&sort=pushed`

    const response = await fetch(url, { signal, method: 'GET' })
    const data: GetUserRepositoryResponseItem[] = await response.json()

    const repositories: Repository[] = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        updatedAt: item.pushed_at,
        language: item.language,
        url: item.svn_url,
      }
    })

    return repositories
  }

  async getCommitsInThisYear(
    owner: string,
    signal?: AbortSignal
  ): Promise<UserCommitsInfo> {
    const currentYear: number = new Date().getFullYear()
    const url = `${this.baseUrl}/search/commits?q=author:${owner}+committer-date:${currentYear}..${currentYear}`

    const response = await fetch(url, { signal, method: 'GET' })
    const data: UserCommitsInfo = await response.json()

    return data
  }
}

export default new GitHubService()
