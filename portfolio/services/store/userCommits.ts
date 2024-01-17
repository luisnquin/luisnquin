import { UserCommitsInfo } from '../../models/userCommits.model'
import { LocalStorageService } from './service'

export function getCommitsInfoFromStore(): Promise<UserCommitsInfo> {
  return LocalStorageService.getItem<UserCommitsInfo>('user_commits')
}

export function setCommitsInfoInStore(commitsInfo: UserCommitsInfo) {
  return LocalStorageService.setItemWithTTL<UserCommitsInfo>(
    'commits_info',
    commitsInfo,
    3600
  )
}
