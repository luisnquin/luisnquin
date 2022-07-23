'use strict'

const yesterdayDt = new Date().setDate(new Date().getDate() - 1)
const lastTimeSaved = localStorage.getItem('lastSaveDt')
let commit

if (lastTimeSaved === null || new Date(lastTimeSaved) < yesterdayDt) {
	try {
		commit = fetchLastCommit()
		commit.then((commit) => {
			saveCommitInLocalStorage(commit)
		})
	} catch (err) {
		console.error('failed to fetch: ' + err)
	}
} else {
	commit = {
		lastAuthor: localStorage.getItem('lastAuthor'),
		lastDate: localStorage.getItem('lastDate')
	}
}

console.log(lastUpdateInfo(commit.lastAuthor, commit.lastDate))

function saveCommitInLocalStorage(commit) {
	localStorage.setItem('lastAuthor', commit.lastAuthor)
	localStorage.setItem('lastDate', commit.lastDate)
	localStorage.setItem('lastSaveDt', new Date().toISOString())
}

async function fetchLastCommit() {
	const response = await fetch('https://api.github.com/repos/luisnquin/luisnquin/commits')
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

function lastUpdateInfo(author, stringDt) {
	stringDt = new Date(stringDt).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	return `Repository of page last updated by '${author}' at ${stringDt}. You can visit it in https://github.com/luisnquin/luisnquin/.`
}
