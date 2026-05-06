import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5147'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', apellidos: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw]   = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [pwStrength, setPwStrength] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (name === 'password') {
      let s = 0
      if (value.length >= 8) s++
      if (/[A-Z]/.test(value)) s++
      if (/\d/.test(value)) s++
      if (/[^A-Za-z0-9]/.test(value)) s++
      setPwStrength(s)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          apellidos: form.apellidos,
          email: form.email,
          password: form.password,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? 'No se pudo crear la cuenta.')
      }
      navigate('/login')
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
          <span>★ NUEVO ACÁ · SUMATE A +8,200 VENDEDORES · ABRÍ TU TIENDA GRATIS · SAN CARLOS · CR · </span>
          <span>★ NUEVO ACÁ · SUMATE A +8,200 VENDEDORES · ABRÍ TU TIENDA GRATIS · SAN CARLOS · CR · </span>
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
            <div className="stamp">// REGISTRO · NUEVO MIEMBRO</div>
            <h1>
              ABRÍ <span className="yellow">TU</span><br />
              <span className="underline">CUENTA.</span><br />
              <span className="red">YA.</span>
            </h1>
            <p className="lede">
              Tres campos y estás adentro. Comprá lo que ya está subido o abrí tu thrift en menos de 2 minutos.
            </p>

            <div className="perks">
              <div className="perk">
                <div className="perk-num">1</div>
                <div><b>GRATIS · SIEMPRE</b>Sin tarjeta. Sin permanencia. Hasta 30 prendas activas sin pagar nada.</div>
              </div>
              <div className="perk">
                <div className="perk-num">2</div>
                <div><b>SINPE EN 24H</b>Cobrás tus ventas directo a tu cuenta, sin retenciones raras.</div>
              </div>
              <div className="perk">
                <div className="perk-num">3</div>
                <div><b>ENVÍOS INTEGRADOS</b>Generás la guía, te recogen, vos solo empacás.</div>
              </div>
            </div>

            <div className="auth-price-sticker">★ FREE</div>
          </div>

          <div className="side-meta">
            <div><b>8.2K</b>VENDEDORES</div>
            <div><b>230K</b>PRENDAS</div>
            <div><b>4.9★</b>RATING</div>
          </div>
        </aside>

        <section className="auth-main">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-stamp">REGISTRO</div>
            <div className="form-num">// FORM-002 / V.26</div>

            <h2 className="form-title">CREÁ TU<br /><span className="yellow-bg">CUENTA</span></h2>
            <p className="form-sub">// 3 CAMPOS Y ESTÁS ADENTRO</p>

            {error && <div className="form-error">{error}</div>}

            <div className="grid-2">
              <div className="field">
                <label htmlFor="nombre">NOMBRE <span className="req">*</span></label>
                <input id="nombre" name="nombre" type="text" placeholder="María"
                  required autoComplete="given-name" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="apellidos">APELLIDOS <span className="req">*</span></label>
                <input id="apellidos" name="apellidos" type="text" placeholder="Soto Vargas"
                  required autoComplete="family-name" value={form.apellidos} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="email">EMAIL <span className="req">*</span></label>
              <input id="email" name="email" type="email" placeholder="vos@email.cr"
                required autoComplete="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="field">
              <label htmlFor="pw">CONTRASEÑA <span className="req">*</span></label>
              <div className="field-pw">
                <input id="pw" name="password" type={showPw ? 'text' : 'password'}
                  placeholder="mínimo 8 caracteres" required autoComplete="new-password"
                  minLength={8} value={form.password} onChange={handleChange} />
                <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)}>
                  {showPw ? 'OCULTAR' : 'VER'}
                </button>
              </div>
              <div className={`pw-meter${pwStrength ? ` s${pwStrength}` : ''}`}>
                <span /><span /><span /><span />
              </div>
              <div className="pw-hint">USÁ <b>8+ CARACTERES</b>, MAYÚSCULAS Y NÚMEROS</div>
            </div>

            <div className="field">
              <label htmlFor="pw2">CONFIRMAR CONTRASEÑA <span className="req">*</span></label>
              <div className="field-pw">
                <input id="pw2" name="confirm" type={showPw2 ? 'text' : 'password'}
                  placeholder="repetí la contraseña" required autoComplete="new-password"
                  value={form.confirm} onChange={handleChange} />
                <button type="button" className="toggle-pw" onClick={() => setShowPw2(v => !v)}>
                  {showPw2 ? 'OCULTAR' : 'VER'}
                </button>
              </div>
            </div>

            <label className="terms">
              <input type="checkbox" required />
              <span>ACEPTO LOS <a href="#">TÉRMINOS</a> Y LA <a href="#">POLÍTICA DE PRIVACIDAD</a> DE CLOTHUB CR.</span>
            </label>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'CREANDO...' : 'CREAR CUENTA →'}
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
              ¿YA TENÉS CUENTA? <Link to="/login">INICIÁ SESIÓN →</Link>
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
