import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './auth.css'
import './verify-email.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5147'

export default function VerifyEmail() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const email = params.get('email') ?? ''

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [resendMsg, setResendMsg] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  function handleDigitChange(index, value) {
    if (!/^\d?$/.test(value)) return
    const next = [...digits]
    next[index] = value
    setDigits(next)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus()
  }

  function handlePaste(e) {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    const next = [...digits]
    for (let i = 0; i < text.length; i++) next[i] = text[i]
    setDigits(next)
    inputRefs.current[Math.min(text.length, 5)]?.focus()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const codigo = digits.join('')
    if (codigo.length < 6) { setError('Ingresá los 6 dígitos del código.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/verificar-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message ?? 'No se pudo verificar el código.')
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (cooldown > 0) return
    setResending(true)
    setResendMsg('')
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/reenviar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message ?? 'No se pudo reenviar el código.')
      setResendMsg('¡Código reenviado! Revisá tu bandeja de entrada.')
      setCooldown(60)
      setDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch (err) {
      setError(err.message)
    } finally {
      setResending(false)
    }
  }

  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>★ VERIFICÁ TU EMAIL · CASI LISTO · UN PASO MÁS · CLOTHUB CR · </span>
          <span>★ VERIFICÁ TU EMAIL · CASI LISTO · UN PASO MÁS · CLOTHUB CR · </span>
        </div>
      </div>

      <header className="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="brand">
            <div className="brand-stamp">CLOTHUB</div>
            <div className="brand-sub">EST. 2026<br />SAN CARLOS · CR ·</div>
          </Link>
          <Link to="/register" className="nav-back">← VOLVER</Link>
        </div>
      </header>

      <main className="auth-page">
        <aside className="auth-side">
          <div>
            <div className="stamp">// PASO 2 · VERIFICACIÓN</div>
            <h1>
              REVISÁ<br />
              TU <span className="yellow">CORREO.</span>
            </h1>
            <p className="lede">
              Te mandamos un código de 6 dígitos a <strong style={{ color: 'var(--yellow)' }}>{email || 'tu email'}</strong>.
              Ingresalo acá para activar tu cuenta.
            </p>

            <div className="verify-steps">
              <div className="verify-step">
                <div className="verify-step-icon done">✓</div>
                <div>
                  <b>CUENTA CREADA</b>
                  <span>Tus datos quedaron guardados</span>
                </div>
              </div>
              <div className="verify-step">
                <div className="verify-step-icon active">2</div>
                <div>
                  <b>VERIFICAR EMAIL</b>
                  <span>Ingresá el código que te enviamos</span>
                </div>
              </div>
              <div className="verify-step">
                <div className="verify-step-icon">3</div>
                <div>
                  <b>¡LISTO!</b>
                  <span>Empezá a usar Clothub</span>
                </div>
              </div>
            </div>
          </div>

          <div className="side-meta">
            <div><b>15</b>MIN EXPIRA</div>
            <div><b>6</b>DÍGITOS</div>
            <div><b>1</b>PASO MÁS</div>
          </div>
        </aside>

        <section className="auth-main">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-stamp">VERIFICACIÓN</div>

            <h2 className="form-title">TU<br /><span className="yellow-bg">CÓDIGO</span></h2>
            <p className="form-sub">// INGRESÁ LOS 6 DÍGITOS</p>

            {error && <div className="form-error">{error}</div>}
            {resendMsg && <div className="form-success">{resendMsg}</div>}

            <div className="otp-group" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el }}
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={e => handleDigitChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  autoComplete="one-time-code"
                  aria-label={`Dígito ${i + 1}`}
                />
              ))}
            </div>

            <p className="otp-hint">
              Revisá también la carpeta de spam si no lo encontrás.
            </p>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'VERIFICANDO...' : 'VERIFICAR →'}
            </button>

            <div className="resend-row">
              <span>¿No llegó el código?</span>
              <button
                type="button"
                className="resend-btn"
                onClick={handleResend}
                disabled={resending || cooldown > 0}
              >
                {resending
                  ? 'REENVIANDO...'
                  : cooldown > 0
                    ? `REENVIAR EN ${cooldown}s`
                    : 'REENVIAR CÓDIGO'}
              </button>
            </div>

            <div className="form-foot">
              ¿EMAIL EQUIVOCADO? <Link to="/register">VOLVÉ AL REGISTRO →</Link>
            </div>
          </form>
        </section>
      </main>

      <div className="foot-strip">
        <span>© 2026 CLOTHUB CR · TODOS LOS DERECHOS RESERVADOS</span>
        <span>HECHO EN SAN CARLOS · CR 🇨🇷</span>
      </div>
    </>
  )
}
