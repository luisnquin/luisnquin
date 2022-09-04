'use strict'

import './styles.css'

window.onload = () => {
	loadPageInfo().then(console.log).catch(console.error)
}

async function loadPageInfo() {
	const [yesterdayDt, lastSave] = [
		new Date().setDate(new Date().getDate() - 1),
		localStorage.getItem('lastSave'),
	]

	if (lastSave === null || new Date(lastSave) < yesterdayDt) {
		try {
			const commit = await getLastCommit()
			saveCommitInLocalStorage(commit)

			return prettyLastCommit(commit)
		} catch (err) {
			throw new Error('failed to fetch: ' + err)
		}
	}

	const [lastAuthor, lastDate] = [
		localStorage.getItem('lastAuthor'),
		localStorage.getItem('lastDate'),
	]

	return prettyLastCommit({
		lastAuthor: lastAuthor !== null ? lastAuthor : 'luisnquin',
		lastDate: lastDate !== null ? lastDate : '0000-00-00T00:00:00Z',
	})
}

async function getLastCommit() {
	const response = await fetch(
		'https://api.github.com/repos/luisnquin/luisnquin/commits?per_page=1'
	)
	if (!response.ok) {
		throw new Error('response is not ok')
	} else if (response.status != 200) {
		throw new Error(`unexpected status ${response.status}`)
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

function prettyLastCommit({ lastAuthor, lastDate }) {
	lastDate = new Date(lastDate).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return `Repository of page last updated by '${lastAuthor}' at ${lastDate}. You can visit it in https://github.com/luisnquin/luisnquin/.`
}
