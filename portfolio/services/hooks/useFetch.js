import { useState, useEffect } from 'react'

export function useFetch(url) {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then(setData)
			.catch(setError)
			.finally(setLoading(false))
	}, [url])

	return { data, error, loading }
}
