#!/usr/bin/env node
'use strict'

import linker from 'terminal-link'
import imager from 'terminal-image'
import cl from 'cli-color'
import path from 'path'
import crypto from 'crypto'

const data = {
	userName: 'luisnquin',
	fullName: 'Luis Quiñones Requelme',
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
			label: cl.xterm(110)('Portfolio'),
			url: 'https://example.com',
		},
		{
			url: 'https://luisquinones.me',
			label: cl.xterm(37)('This but in browser'),
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

// Some color definitions
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
		name: '.microwaverc' + '   ',
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
	const hashFrom = getRandomGitHash()
	const hashTo = getRandomGitHash()

	console.log(`\nFrom github:luisnquin/luisnquin ${cl.xterm(196)(
		'(simulated)'
	)}
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
	const hobbies = favoriteAndPretty.hobbies
	const technologies = favoriteAndPretty.technologies

	console.log(`Hello ${skyBlue(process.env.USER || 'you')}! My name is ${
		data.fullName
	} ${intensePink('||')} ${data.userName} 🫐
I'm a ${magicMagenta(
		data.job.title
	)} at ${prettyCompany} which is located in ${sparkOfLife(data.job.location)}

I really like open source stuff and things that make me feel more comfortable, apparently an ${infiniteWord} journey

... wait what, the reason why ${infiniteWord} is blue? It's poetic but I googled it

Between other things I really like are ${hobbies}, and technologies like ${technologies}`)

	await gitPullProcess()

	console.log(`\nSocial media:
 - ${data.socialMedia.map((item) => linker(item.label, item.url)).join('\n - ')}

Have a nice day :)`)
}

await main()
