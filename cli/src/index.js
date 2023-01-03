#!/usr/bin/env node
'use strict'

import linker from 'terminal-link'
import imager from 'terminal-image'
import cl from 'cli-color'
import path from 'path'

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
			url: 'about:blank',
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

//Well, it only works if there is no color defined (maybe because the new color is just a wrapper?) but it's useful for me.
const applyRandomColor = (item) =>
	cl.xterm(Math.floor(Math.random() * 256))(item)

// Complex text
const favoriteAndPretty = {
	technologies: data.favoriteTechnologies.map(applyRandomColor).join(', '),
	hobbies: data.hobbies.map(applyRandomColor).join(', '),
}
const infiniteWord = infiniteBlue('infinite')

let tpl = `Hello ${skyBlue(process.env.USER || 'you')}! My name is ${
	data.fullName
} ${intensePink('||')} ${data.userName} 🫐
I'm a ${magicMagenta(data.job.title)} at ${linker(
	companyColor(data.job.company),
	data.job.url
)} which is located in ${sparkOfLife(data.job.location)}

I really like open source stuff and things that make me feel more comfortable, apparently an ${infiniteWord} journey

... wait what, the reason why ${infiniteWord} is blue? It's poetic but I googled it

Between other things I really like are ${
	favoriteAndPretty.hobbies
}, and technologies like ${favoriteAndPretty.technologies}

Social media:
 - ${data.socialMedia.map((item) => linker(item.label, item.url)).join('\n - ')}

Have a nice day :)
`

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

console.log(tpl)
