'use strict'

import './../css/styles.css'

window.onload = () => {
  loadRelatedRepositoryInfo().then(console.log).catch(console.error)
}

async function loadRelatedRepositoryInfo() {
  const yesterdayDt = new Date().setDate(new Date().getDate() - 1)
  const lastSave = localStorage.getItem('lastSave')

  if (lastSave === null || new Date(lastSave) < yesterdayDt) {
    try {
      const commit = await getLastCommit()
      saveCommitInLocalStorage(commit)

      return prettyLastCommit(commit)
    } catch (err) {
      throw new Error('failed to fetch: ' + err)
    }
  }

  return prettyLastCommit({
    lastAuthor: localStorage.getItem('lastAuthor'),
    lastDate: localStorage.getItem('lastDate'),
  })
}

async function getLastCommit() {
  const response = await fetch(
    'https://api.github.com/repos/luisnquin/luisnquin/commits?per_page=1'
  )
  if (!response.ok) {
    throw new Error(`⚠️ request finished with status code ${response.status}`)
  } else if (response.status != 200) {
    throw new Error(`⚠️ unexpected status code ${response.status}`)
  }

  const [repo] = await response.json()

  if (repo === null) {
    throw new Error('unexpected response body')
  }

  return {
    lastAuthor: repo.author.login,
    lastDate: repo.commit.committer.date,
  }
}

function saveCommitInLocalStorage({ lastAuthor, lastDate }) {
  localStorage.setItem('lastAuthor', lastAuthor)
  localStorage.setItem('lastDate', lastDate)
  localStorage.setItem('lastSave', new Date().toISOString())
}

function prettyLastCommit({ lastAuthor = 'luisnquin', lastDate = null }) {
  lastDate = new Date(lastDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  })

  return `🦀 Repository of page last updated by '${lastAuthor}' at ${lastDate}. You can visit it in https://github.com/luisnquin/luisnquin.`
}
