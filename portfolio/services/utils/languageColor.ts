export function getLangColor(name: string): string {
	let lang: string

	if (typeof name === 'string') {
		lang = name.toLowerCase()
	} else if (name !== null) {
		throw new Error(
			`unexpected type, want string, have ${typeof name}, details: ${name}`
		)
	}

	return (
		{
			bash: '#89E051',
			css: '#563D7C',
			dart: '#00B4AB',
			go: '#62b2d1',
			html: '#E34C26',
			javascript: '#efd81d',
			makefile: '#427819',
			shell: '#89E051',
			nix: '#7e7eff',
			python: '#3572A5',
			rust: '#DEA584',
			scss: '#C6538C',
			typescript: '#3178C6',
			vue: '#41B883',
		}[lang] || '#5f527a'
	)
}
