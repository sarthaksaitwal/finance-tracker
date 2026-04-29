const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export function getToken() {
  return localStorage.getItem('ft_token')
}

export function setToken(token) {
  if (token) localStorage.setItem('ft_token', token)
}

export function clearToken() {
  localStorage.removeItem('ft_token')
}

async function parseJsonOrText(res) {
  try { return await res.json() } catch { return await res.text() }
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = await parseJsonOrText(res)
  if (!res.ok) throw new Error(json?.message || 'Login failed')
  if (json.token) setToken(json.token)
  return json
}

export async function register(username, email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username ,email, password }),
  })
  const json = await parseJsonOrText(res)
  if (!res.ok) throw new Error(json?.message || 'Registration failed')
  return json
}

export async function fetchWithAuth(url, options = {}) {
  const token = getToken()
  const headers = { ...(options.headers || {}) }
  // only set JSON content-type when body is not FormData
  if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(url, { ...options, headers, credentials: 'include' })
  return res
}

export function getUserFromToken(tokenInput) {
  const token = tokenInput || getToken()
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

export default { getToken, setToken, clearToken, login, register, fetchWithAuth, getUserFromToken }
