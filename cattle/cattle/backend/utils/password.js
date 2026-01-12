function validatePassword(pwd) {
  if (typeof pwd !== 'string') return 'Invalid password'
  if (pwd.length < 8) return 'Password must be at least 8 characters'
  if (!/[a-z]/.test(pwd)) return 'Password must include a lowercase letter'
  if (!/[A-Z]/.test(pwd)) return 'Password must include an uppercase letter'
  if (!/[0-9]/.test(pwd)) return 'Password must include a number'
  if (!/[!@#\$%\^&\*\(\)_\+=\-\[\]\{\};:\'"\\|,.<>\/?`~]/.test(pwd)) return 'Password must include a special character'
  if (/\s/.test(pwd)) return 'Password must not contain spaces'
  return null
}

module.exports = { validatePassword }
