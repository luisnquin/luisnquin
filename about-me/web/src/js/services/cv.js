export class CVService {
	static url =
		'https://luisnquin-hole.s3.amazonaws.com/resume/luis-quinones.pdf'

	static async headHeaders() {
		const response = await fetch(this.url, { method: 'HEAD' })
		if (!response.ok) {
			return null
		}

		return {
			contentType: response.headers.get('Content-Type') || 'text/plain',
			contentLength:
				parseInt(response.headers.get('Content-Length')) || 0,
		}
	}

	static async downloadAsBlob() {
		const response = fetch(this.url, { method: 'GET' })
		if (!response.ok) {
			return null
		}

		return await response.blob()
	}
}
