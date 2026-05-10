import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.substring(1)).get('token')
    if (token) localStorage.setItem('token', token)
    navigate('/', { replace: true })
  }, [])

  return null
}
