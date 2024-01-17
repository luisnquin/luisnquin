import { useEffect } from 'react'

export function useGetCVInfo() {
  const url =
    'https://luisnquin-hole.s3.sa-east-1.amazonaws.com/luis_quinones_cv_2023.pdf'

  useEffect(() => {
    fetch(url, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error)
  }, [])
}
