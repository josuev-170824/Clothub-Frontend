import { useState } from 'react'
import { Link } from 'react-router-dom'
import './auth.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5147'

export default function ForgotPassword() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${API_URL}/auth/solicitar-recuperacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } finally {
      setLoading(false)
      setSent(true)
    }
  }

  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>★ RECUPERÁ TU ACCESO · CLOTHUB CR · THRIFT · STREETWEAR · VINTAGE · SAN CARLOS · CR · </span>
          <span>★ RECUPERÁ TU ACCESO · CLOTHUB CR · THRIFT · STREETWEAR · VINTAGE · SAN CARLOS · CR · </span>
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
            <div className="stamp">// ACCESO · RECUPERACIÓN</div>
            <h1>
              ¿OLVIDASTE<br />
              <span className="underline">tu pass</span>?<br />
              <span className="yellow">sin</span> <span className="red">drama.</span>
            </h1>
            <p className="lede">
              Ingresá tu email y si tenés una cuenta activa, te mandamos un link para crear una nueva contraseña.
            </p>
            <div className="auth-torn-note">
              EL LINK EXPIRA EN 15 MINUTOS.<br />
              <b>REVISÁ TU BANDEJA →</b>
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
            <div className="form-stamp">RECUPERAR</div>
            <h2 className="form-title">NUEVA<br />CONTRASEÑA</h2>
            <p className="form-sub">// INGRESÁ TU EMAIL</p>

            {sent ? (
              <div className="form-success">
                Si el email está registrado, vas a recibir un link en tu correo. Revisá también el spam.
              </div>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="email">EMAIL <span className="req">*</span></label>
                  <input
                    id="email" type="email" placeholder="vos@email.cr"
                    required autoComplete="email"
                    value={email} onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'ENVIANDO...' : 'ENVIAR LINK →'}
                </button>
              </>
            )}

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
