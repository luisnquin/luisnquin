'use strict'

window.onload = () => {
	loadPageInfo()
		.then((info) => console.log(info))
		.catch((err) => console.error(err))
}

async function loadPageInfo() {
	const yesterdayDt = new Date().setDate(new Date().getDate() - 1)
	const lastTimeSaved = localStorage.getItem('lastSaveDt')

	if (lastTimeSaved === null || new Date(lastTimeSaved) < yesterdayDt) {
		try {
			const commit = await fetchLastCommit()
			saveCommitInLocalStorage(commit)

			return prettyLastCommit(commit)
		} catch (err) {
			throw new Error('failed to fetch: ' + err)
		}
	} else {
		const commit = {
			lastAuthor: localStorage.getItem('lastAuthor'),
			lastDate: localStorage.getItem('lastDate')
		}

		return prettyLastCommit(commit)
	}
}

async function fetchLastCommit() {
	const response = await fetch('https://api.github.com/repos/luisnquin/luisnquin/commits?per_page=1')
	if (!response.ok) {
		throw new Error('response is not ok')
	} else if (response.status != 200) {
		throw new Error(`unexpected status ${response.status}`)
	}

	const body = await response.json()

	return {
		lastAuthor: body[0].author.login,
		lastDate: body[0].commit.committer.date
	}
}

function saveCommitInLocalStorage({ lastAuthor, lastDate }) {
	localStorage.setItem('lastAuthor', lastAuthor)
	localStorage.setItem('lastDate', lastDate)
	localStorage.setItem('lastSaveDt', new Date().toISOString())
}

function prettyLastCommit({ lastAuthor, lastDate }) {
	lastDate = new Date(lastDate).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	return `Repository of page last updated by '${lastAuthor}' at ${lastDate}. You can visit it in https://github.com/luisnquin/luisnquin/.`
}
