export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'

export function setAuth({ token, user }) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  // Notify other parts of the app
  window.dispatchEvent(new Event('authChanged'))
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  window.dispatchEvent(new Event('authChanged'))
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  try {
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
