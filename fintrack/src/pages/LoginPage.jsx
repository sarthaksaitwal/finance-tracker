import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import authService from '../services/authService'

// ─── Inline Icon (reuses existing Icon style) ─────────────────────────────────
function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.8 }) {
  const icons = {
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    check: <polyline points="20 6 9 17 4 12" />,
    google: null,
    github: null,
  }

  if (name === 'google') return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )

  if (name === 'github') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({ label, type = 'text', placeholder, value, onChange, icon, rightElement, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: 12.5, fontWeight: 500, color: '#94a3b8' }}>{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name={icon} size={15} color="#475569" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: error ? '1px solid rgba(255,77,106,0.5)' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: icon ? '11px 44px 11px 42px' : '11px 44px 11px 14px',
            color: '#e2e8f0',
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 0.15s',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
          onBlur={e => e.target.style.borderColor = error ? 'rgba(255,77,106,0.5)' : 'rgba(255,255,255,0.08)'}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p style={{ fontSize: 11.5, color: '#ff4d6a', marginTop: 2 }}>{error}</p>
      )}
    </div>
  )
}

// ─── Social Button ────────────────────────────────────────────────────────────
function SocialButton({ icon, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.15)' }}
      whileTap={{ scale: 0.97 }}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        fontFamily: 'inherit',
      }}
    >
      <Icon name={icon} size={16} color="currentColor" />
      {label}
    </motion.button>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ onNavigate, onAuthSuccess }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)

  const validate = () => {
    const e = {}
    if (!email)    e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setErrors(p => ({ ...p, general: '' }))
    try {
      const res = await authService.login(email, password)
      const token = res?.token
      setSuccess(true)
      if (token) {
        if (typeof onAuthSuccess === 'function') {
          onAuthSuccess(token)
        } else if (typeof onNavigate === 'function') {
          onNavigate('dashboard')
        }
      }
    } catch (err) {
      setErrors(p => ({ ...p, general: err.message || 'Login failed' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: 420 }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>💹</div>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.4px' }}>
          FinTrack
        </span>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6 }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 13.5, color: '#64748b' }}>
          Sign in to your account to continue
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}>

        {/* Social Logins */}
        <div style={{ display: 'flex', gap: 10 }}>
          <SocialButton icon="google" label="Google" />
          <SocialButton icon="github" label="GitHub" />
        </div>

        {/* any general error */}
        {errors.general && (
          <p style={{ color: '#ff4d6a', fontSize: 13, marginTop: 6 }}>{errors.general}</p>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>OR CONTINUE WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Username */}
        {/* <InputField
          label="Username"
          placeholder="Alex Johnson"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
          icon="user"
          error={errors.name}
        /> */}

        {/* Email */}
        <InputField
          label="Email address"
          type="email"
          placeholder="alex@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
          icon="mail"
          error={errors.email}
        />

        {/* Password */}
        <InputField
          label="Password"
          type={showPass ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
          icon="lock"
          error={errors.password}
          rightElement={
            <button
              onClick={() => setShowPass(p => !p)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}
              aria-label="Toggle password visibility"
            >
              <Icon name={showPass ? 'eyeOff' : 'eye'} size={15} color="#475569" />
            </button>
          }
        />

        {/* Remember + Forgot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => setRemember(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <div style={{
              width: 17, height: 17, borderRadius: 5,
              background: remember ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'rgba(255,255,255,0.05)',
              border: remember ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>
              {remember && <Icon name="check" size={11} color="#fff" strokeWidth={2.5} />}
            </div>
            <span style={{ fontSize: 12.5, color: '#64748b' }}>Remember me</span>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12.5, color: '#818cf8', fontFamily: 'inherit' }}>
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading || success}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 12,
            border: 'none',
            background: success
              ? 'linear-gradient(135deg,#00d68f,#00b377)'
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#fff',
            fontSize: 14.5,
            fontWeight: 600,
            cursor: loading || success ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.3s',
            boxShadow: success
              ? '0 4px 20px rgba(0,214,143,0.3)'
              : '0 4px 20px rgba(99,102,241,0.35)',
            fontFamily: 'inherit',
          }}
        >
          {loading ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <motion.path
                d="M12 2a10 10 0 1 0 10 10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                style={{ originX: '50%', originY: '50%' }}
              />
            </svg>
          ) : success ? (
            <><Icon name="check" size={16} color="#fff" strokeWidth={2.5} /> Signed in!</>
          ) : (
            <>Sign in <Icon name="arrowRight" size={15} color="#fff" /></>
          )}
        </motion.button>
      </div>

      {/* Footer */}
      <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: '#475569' }}>
        Don't have an account?{' '}
        <button
          onClick={() => onNavigate('register')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#818cf8', fontWeight: 600, fontSize: 13, fontFamily: 'inherit' }}
        >
          Create one →
        </button>
      </p>
    </motion.div>
  )
}

// ─── Register Page ────────────────────────────────────────────────────────────
function RegisterPage({ onNavigate, onAuthSuccess }) {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [agreed, setAgreed]       = useState(false)
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)
  const [success, setSuccess]     = useState(false)

  // Password strength
  const strength = (() => {
    if (!password) return 0
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#ff4d6a', '#f97316', '#eab308', '#00d68f'][strength]

  const validate = () => {
    const e = {}
    if (!name)     e.name     = 'Full name is required'
    if (!email)    e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 8) e.password = 'At least 8 characters'
    if (!confirm)  e.confirm  = 'Please confirm your password'
    else if (password !== confirm) e.confirm = 'Passwords do not match'
    if (!agreed)   e.agreed   = 'You must accept the terms'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    setErrors(p => ({ ...p, general: '' }))
    try {
      await authService.register(name, email, password)
      // Auto-login after register
      const loginRes = await authService.login(email, password)
      const token = loginRes?.token
      setSuccess(true)
      if (token) {
        if (typeof onAuthSuccess === 'function') onAuthSuccess(token)
        else if (typeof onNavigate === 'function') onNavigate('login')
      }
    } catch (err) {
      setErrors(p => ({ ...p, general: err.message || 'Registration failed' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', maxWidth: 420 }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
          boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
        }}>💹</div>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.4px' }}>
          FinTrack
        </span>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px', marginBottom: 6 }}>
          Create your account
        </h1>
        <p style={{ fontSize: 13.5, color: '#64748b' }}>
          Start tracking your finances today — it's free
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>

        {/* Social */}
        <div style={{ display: 'flex', gap: 10 }}>
          <SocialButton icon="google" label="Google" />
          <SocialButton icon="github" label="GitHub" />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 11.5, color: '#475569', fontWeight: 500 }}>OR FILL IN YOUR DETAILS</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Username */}
        <InputField
          label="Username"
          placeholder="Alex Johnson"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
          icon="user"
          error={errors.name}
        />

        {/* Email */}
        <InputField
          label="Email address"
          type="email"
          placeholder="alex@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
          icon="mail"
          error={errors.email}
        />

        {/* Password */}
        <div>
          <InputField
            label="Password"
            type={showPass ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })) }}
            icon="lock"
            error={errors.password}
            rightElement={
              <button
                onClick={() => setShowPass(p => !p)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}
              >
                <Icon name={showPass ? 'eyeOff' : 'eye'} size={15} color="#475569" />
              </button>
            }
          />
          {/* Strength bar */}
          {password && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1,2,3,4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{
                      flex: 1, height: 3, borderRadius: 4,
                      background: i <= strength ? strengthColor : 'rgba(255,255,255,0.06)',
                      transformOrigin: 'left',
                      transition: 'background 0.3s',
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: 11, color: strengthColor, marginTop: 4, fontWeight: 500 }}>
                {strengthLabel} password
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <InputField
          label="Confirm password"
          type={showConf ? 'text' : 'password'}
          placeholder="Repeat your password"
          value={confirm}
          onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: '' })) }}
          icon="lock"
          error={errors.confirm}
          rightElement={
            <button
              onClick={() => setShowConf(p => !p)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex' }}
            >
              <Icon name={showConf ? 'eyeOff' : 'eye'} size={15} color="#475569" />
            </button>
          }
        />

        {/* Terms */}
        <div>
          <button
            onClick={() => { setAgreed(p => !p); setErrors(p => ({ ...p, agreed: '' })) }}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 9,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left',
            }}
          >
            <div style={{
              width: 17, height: 17, borderRadius: 5, flexShrink: 0, marginTop: 1,
              background: agreed ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'rgba(255,255,255,0.05)',
              border: agreed ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>
              {agreed && <Icon name="check" size={11} color="#fff" strokeWidth={2.5} />}
            </div>
            <span style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.5 }}>
              I agree to the{' '}
              <span style={{ color: '#818cf8' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: '#818cf8' }}>Privacy Policy</span>
            </span>
          </button>
          {errors.agreed && (
            <p style={{ fontSize: 11.5, color: '#ff4d6a', marginTop: 4, paddingLeft: 26 }}>{errors.agreed}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading || success}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 12,
            border: 'none',
            background: success
              ? 'linear-gradient(135deg,#00d68f,#00b377)'
              : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#fff',
            fontSize: 14.5,
            fontWeight: 600,
            cursor: loading || success ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.3s',
            boxShadow: success
              ? '0 4px 20px rgba(0,214,143,0.3)'
              : '0 4px 20px rgba(99,102,241,0.35)',
            fontFamily: 'inherit',
            marginTop: 4,
          }}
        >
          {loading ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <motion.path
                d="M12 2a10 10 0 1 0 10 10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                style={{ originX: '50%', originY: '50%' }}
              />
            </svg>
          ) : success ? (
            <><Icon name="check" size={16} color="#fff" strokeWidth={2.5} /> Account created!</>
          ) : (
            <>Create account <Icon name="arrowRight" size={15} color="#fff" /></>
          )}
        </motion.button>
      </div>

      {/* Footer */}
      <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: '#475569' }}>
        Already have an account?{' '}
        <button
          onClick={() => onNavigate('login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#818cf8', fontWeight: 600, fontSize: 13, fontFamily: 'inherit' }}
        >
          Sign in →
        </button>
      </p>
    </motion.div>
  )
}

// ─── Auth Wrapper (combines both pages) ──────────────────────────────────────
export default function AuthPages({ onAuthSuccess }) {
  const [page, setPage] = useState('login')

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f17',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration blobs */}
      <div style={{
        position: 'absolute', top: -120, left: -120,
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, right: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,214,143,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Page content */}
      <AnimatePresence mode="wait">
        {page === 'login'
          ? <LoginPage    key="login"    onNavigate={setPage} onAuthSuccess={onAuthSuccess} />
          : <RegisterPage key="register" onNavigate={setPage} onAuthSuccess={onAuthSuccess} />
        }
      </AnimatePresence>
    </div>
  )
}