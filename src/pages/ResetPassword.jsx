import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5147'

export default function ResetPassword() {
  const navigate              = useNavigate()
  const token                 = new URLSearchParams(window.location.hash.substring(1)).get('token') ?? ''
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/restablecer-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nuevaPassword: password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'No se pudo actualizar la contraseña.')
      }
      navigate('/login?reset=ok')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <main className="auth-page" style={{ justifyContent: 'center' }}>
        <div className="form-card">
          <div className="form-error">Link inválido. Solicitá uno nuevo desde <Link to="/forgot-password">esta página</Link>.</div>
        </div>
      </main>
    )
  }

  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>★ NUEVA CONTRASEÑA · CLOTHUB CR · THRIFT · STREETWEAR · VINTAGE · SAN CARLOS · CR · </span>
          <span>★ NUEVA CONTRASEÑA · CLOTHUB CR · THRIFT · STREETWEAR · VINTAGE · SAN CARLOS · CR · </span>
        </div>
      </div>

      <header className="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="brand">
            <div className="brand-stamp">CLOTHUB</div>
            <div className="brand-sub">EST. 2026<br />SAN CARLOS · CR ·</div>
          </Link>
          <Link to="/login" className="nav-back">← VOLVER</Link>
        </div>
      </header>

      <main className="auth-page">
        <aside className="auth-side">
          <div>
            <div className="stamp">// ACCESO · NUEVA CONTRASEÑA</div>
            <h1>
              NUEVA<br />
              <span className="underline">contraseña</span>,<br />
              <span className="yellow">nuevo</span> <span className="red">inicio.</span>
            </h1>
            <p className="lede">
              Elegí una contraseña segura que no hayas usado antes en Clothub.
            </p>
            <div className="auth-torn-note">
              MÍNIMO 8 CARACTERES.<br />
              <b>ESTE LINK ES DE UN SOLO USO →</b>
            </div>
          </div>
          <div className="side-meta">
            <div><b>8.2K</b>VENDEDORES</div>
            <div><b>230K</b>PRENDAS</div>
            <div><b>4.9★</b>RATING</div>
          </div>
        </aside>

        <section className="auth-main">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-stamp">RESTABLECER</div>
            <h2 className="form-title">NUEVA<br />CONTRASEÑA</h2>
            <p className="form-sub">// ELEGÍ UNA CONTRASEÑA SEGURA</p>

            {error && <div className="form-error">{error}</div>}

            <div className="field">
              <label htmlFor="pw">NUEVA CONTRASEÑA <span className="req">*</span></label>
              <div className="field-pw">
                <input
                  id="pw" type={showPw ? 'text' : 'password'}
                  placeholder="••••••••" required autoComplete="new-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>
                  {showPw ? 'OCULTAR' : 'VER'}
                </button>
              </div>
              <div className="pw-hint">MÍNIMO <b>8 CARACTERES</b></div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'GUARDANDO...' : 'GUARDAR CONTRASEÑA →'}
            </button>

            <div className="form-foot">
              <Link to="/login">← VOLVER AL LOGIN</Link>
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
