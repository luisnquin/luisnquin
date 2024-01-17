import { Repository } from '../../models/github/repository.model'
import { LocalStorageService } from './service'

/**
 *
 * @param force Forces a result, regardless of save date
 * @returns
 */
export function getRepositoriesFromStore(
  force: boolean
): Promise<Repository[]> {
  // TODO: force
  return LocalStorageService.getItem<Repository[]>('repositories')
}

export function setRepositoriesInStore(repositories: Repository[]) {
  return LocalStorageService.setItemWithTTL<Repository[]>(
    'repositories',
    repositories,
    3600
  )
}
