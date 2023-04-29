#!/usr/bin/env node
'use strict'

import TypeWriter from 'node-typewriter'
import imager from 'terminal-image'
import linker from 'terminal-link'
import crypto from 'crypto'
import cl from 'cli-color'
import path from 'path'

const data = {
	userName: 'luisnquin',
	fullName: 'Luis Quiñones',
	job: {
		url: 'https://wiserskills.com',
		location: 'France, Paris',
		title: 'Backend Developer',
		company: 'WiserSkills 💎',
	},
	socialMedia: [
		{
			url: 'https://github.com/luisnquin',
			label: cl.xterm(15)('Github'),
		},
		{
			url: 'https://gitlab.com/luisnquin',
			label: cl.xterm(208)('GitLab'),
		},
		{
			url: 'https://linkedin.com/in/luisnquin',
			label: cl.xterm(33)('LinkedIn'),
		},
		{
			url: 'https://luisquinones.me',
			label: cl.xterm(37)('About me'),
		},
	],
	favoriteTechnologies: [
		cl.xterm(87)('Go'),
		cl.xterm(105)('Nix'),
		cl.xterm(187)('Rust'),
		cl.xterm(227)('JavaScript'),
		'AWS',
	],
	hobbies: ['Videogames', 'Movies'],
}

const magicMagenta = cl.xterm(141)
const companyColor = cl.xterm(214)
const sparkOfLife = cl.xterm(189)
const infiniteBlue = cl.xterm(33)
const intensePink = cl.xterm(197)
const skyBlue = cl.xterm(86)

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

const prettyJoin = (items) =>
	items.slice(0, -1).join(', ') + ' and ' + items.slice(-1)

const getRandomGitHash = () => {
	return crypto
		.createHash('sha1')
		.update(crypto.pseudoRandomBytes(20))
		.digest('hex')
		.slice(0, 7)
}

//Well, it only works if there is no color defined (maybe because the new color is just a wrapper?) but it's useful for me.
const applyRandomColor = (item) =>
	cl.xterm(Math.floor(Math.random() * 256))(item)

const favoriteAndPretty = {
	technologies: prettyJoin(data.favoriteTechnologies.map(applyRandomColor)),
	hobbies: prettyJoin(data.hobbies.map(applyRandomColor)),
}

const infiniteWord = infiniteBlue('infinite')

const changesList = [
	{
		name: 'the-blender.txt',
		additions: Math.floor(Math.random() * 70),
		deletions: Math.floor(Math.random() * 40),
	},
	{
		name: 'bonsai.zip' + '     ',
		additions: Math.floor(Math.random() * 70),
		deletions: Math.floor(Math.random() * 40),
	},
	{
		name: 'file.exe' + '     ',
		additions: Math.floor(Math.random() * 70),
		deletions: Math.floor(Math.random() * 40),
	},
]

const biggestChange = changesList
	.sort((a, b) =>
		a.additions + a.deletions < b.additions + b.deletions ? 1 : -1
	)
	.at(0)

const gitPullProcess = async () => {
	const [hashFrom, hashTo] = [getRandomGitHash(), getRandomGitHash()]

	for (let index = 1; index <= changesList.length; index++) {
		await sleep(200)
		process.stdout.write(`\rremote: Enumerating objects: ${index}`)
	}

	console.log(', done')

	const simulateProgress = async (leftText, ms = 2) => {
		for (let i = 0; i <= 100; i++) {
			await sleep(ms)

			const percentage = Math.round(
				((i / 100) * 100) / changesList.length / 10
			)

			process.stdout.write(
				`\r${leftText}: ${i}% (${percentage}/${changesList.length})`
			)
		}

		console.log(', done')
	}

	await simulateProgress('remote: Counting objects')
	await simulateProgress('remote: Compressing objects')

	const packageSize = (Math.random() * (1200 - 500) + 0).toFixed(2)
	let velocity

	for (let i = 0; i <= 100; i++) {
		await sleep(10)

		const percentage = Math.round(
			((i / 100) * 100) / changesList.length / 10
		)

		if (velocity == null || i % 5 == 0) {
			velocity = (Math.random() * (200 - 0) + 0).toFixed(2)
		}

		process.stdout.write(
			`\rUnpacking objects: ${i}% (${percentage}/${changesList.length}), ${packageSize} KiB | ${velocity} KiBs`
		)
	}

	console.log(', done')

	console.log(`From github:luisnquin/unmasked ${cl.xterm(196)('(simulated)')}
 * branch            main       -> FETCH_HEAD
   ${hashFrom}..${hashTo}  main       -> origin/main`)

	await sleep(500)

	console.log(`Updating ${getRandomGitHash()}..${getRandomGitHash()}
Fast-forward`)

	await sleep(800)

	changesList
		.filter((change) => change.additions != 0 || change.deletions != 0)
		.sort(() => Math.random() - 0.5)
		.map((change) => {
			const distantSum = `${
				change.additions + change.deletions
			}`.padStart(3, '  ')

			console.log(
				`${change.name} | ${distantSum} ${
					cl.xterm(40)('+'.repeat(change.additions)) +
					cl.xterm(197)('-'.repeat(change.deletions))
				}`
			)
		})

	console.log(
		`${changesList.length} files changed, ${biggestChange.additions} insertions(+), ${biggestChange.deletions} deletions(-)`
	)

	await sleep(400)
}

const main = async () => {
	console.log(
		await imager.file(
			path.resolve(
				new URL(import.meta.url).pathname,
				'../../assets/funny-dog.jpg'
			),
			{
				width: 45,
				height: 30,
			}
		)
	)

	const prettyCompany = linker(companyColor(data.job.company), data.job.url)
	const { technologies, hobbies } = favoriteAndPretty

	await TypeWriter(
		`Hello ${skyBlue(process.env.USER || 'you')}! My name is ${
			data.fullName
		} ${intensePink('||')} ${data.userName} 🫐\n\n`,
		1200
	)

	await TypeWriter(`I'm a ${magicMagenta(
		data.job.title
	)} at ${prettyCompany} which is located in ${sparkOfLife(data.job.location)}

I like open source stuff and things that make me feel more comfortable, apparently an ${infiniteWord} journey

Between other things I really like are ${hobbies}, and technologies like ${technologies}\n\n`)

	console.log(
		`\nSocial media:\n - ${data.socialMedia
			.map((item) => linker(item.label, item.url))
			.join('\n - ')}`
	)

	console.log('\nHave a nice day :)\n')

	await gitPullProcess()

	if (process.env.SHELL !== null) {
		console.log(
			`\n${path.basename(
				process.env.SHELL
			)}: permission denied: ./file.exe`
		)
	}

	console.log('\ndon\'t misunderstand that ;(')
}

await main()
