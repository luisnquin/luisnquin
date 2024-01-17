import { UserCommitsInfo } from '../../models/userCommits.model'
import { Repository } from '../../models/repository.model'

class GitHubService {
  baseUrl: string = 'https://api.github.com'

  async getUserRepositories(
    owner: string,
    maxCount: number,
    signal?: AbortSignal
  ): Promise<Repository[]> {
    const url = `${this.baseUrl}/users/${owner}/repos?accept=application/vnd.github.v3+json&per_page=${maxCount}&sort=pushed`

    const response = await fetch(url, { signal, method: 'GET' })
    const data = await response.json()

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
