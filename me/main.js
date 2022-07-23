'use strict'

window.onload = () => {
	fetch('https://api.github.com/zen', {
		method: 'GET'
	})
		.then((res) => res.text())
		.then((body) => console.log(body))
		.catch((err) => console.error('failed to fetch: ' + err.message))

	fetch('https://api.github.com/repos/luisnquin/luisnquin/commits', {
		method: 'GET'
	})
		.then((res) => res.json())
		.then((body) => {
			const dt = new Date(body[0].commit.committer.date).toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
			const author = body[0].author.login

			console.log(`Repository of page last updated by ${author} at ${dt}`)
		})
		.catch((err) => console.error('failed to fetch: ' + err.message))
}
