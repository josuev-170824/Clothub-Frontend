import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5147'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'Credenciales inválidas.')
      }
      const { token } = await res.json()
      localStorage.setItem('token', token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>★ BIENVENIDO DE VUELTA · +12,400 PRENDAS NUEVAS ESTA SEMANA · SAN CARLOS · CR · THRIFT · STREETWEAR · VINTAGE · </span>
          <span>★ BIENVENIDO DE VUELTA · +12,400 PRENDAS NUEVAS ESTA SEMANA · SAN CARLOS · CR · THRIFT · STREETWEAR · VINTAGE · </span>
        </div>
      </div>

      <header className="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="brand">
            <div className="brand-stamp">CLOTHUB</div>
            <div className="brand-sub">EST. 2026<br />SAN CARLOS · CR ·</div>
          </Link>
          <Link to="/" className="nav-back">← VOLVER</Link>
        </div>
      </header>

      <main className="auth-page">
        <aside className="auth-side">
          <div>
            <div className="stamp">// ACCESO · MEMBER ONLY</div>
            <h1>
              VOLVISTE.<br />
              <span className="underline">la calle</span><br />
              <span className="yellow">te</span> <span className="red">extrañó.</span>
            </h1>
            <p className="lede">
              Iniciá sesión para ver tus favoritos, retomar carritos y avisar a tus seguidores
              que volviste a subir cosas a tu thrift.
            </p>

            <div className="auth-torn-note">
              TIP: ENCENDÉ NOTIFICACIONES Y
              AGARRÁ LOS DROPS<br />
              <b>ANTES QUE EL RESTO ←</b>
            </div>

            <div className="auth-price-sticker login">★ MEMBERS</div>
          </div>

          <div className="side-meta">
            <div><b>8.2K</b>VENDEDORES</div>
            <div><b>230K</b>PRENDAS</div>
            <div><b>4.9★</b>RATING</div>
          </div>
        </aside>

        <section className="auth-main">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-stamp">ENTRAR</div>

            <h2 className="form-title">INICIÁ<br />SESIÓN</h2>
            <p className="form-sub">// USÁ TU EMAIL DE SIEMPRE</p>

            {error && <div className="form-error">{error}</div>}

            <div className="field">
              <label htmlFor="email">EMAIL <span className="req">*</span></label>
              <input
                id="email" type="email" placeholder="vos@email.cr"
                required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="pw">CONTRASEÑA <span className="req">*</span></label>
              <div className="field-pw">
                <input
                  id="pw" type={showPw ? 'text' : 'password'}
                  placeholder="••••••••" required autoComplete="current-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>
                  {showPw ? 'OCULTAR' : 'VER'}
                </button>
              </div>
            </div>

            <div className="field-row">
              <label><input type="checkbox" /> RECORDARME</label>
              <a href="#">¿OLVIDASTE TU PASS?</a>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'ENTRANDO...' : 'ENTRAR →'}
            </button>

            <div className="divider">— O —</div>

            <button
              type="button" className="google-btn"
              onClick={() => { window.location.href = `${API_URL}/auth/google` }}
            >
              <span className="google-icon">G</span>
              CONTINUAR CON GOOGLE
            </button>

            <div className="form-foot">
              ¿NO TENÉS CUENTA? <Link to="/register">REGISTRATE →</Link>
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
