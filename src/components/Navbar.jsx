import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function close() { setOpen(false) }

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="brand">
            <div className="brand-stamp">CLOTHUB</div>
            <div className="brand-sub">
              EST. 2026{'\n'}SAN CARLOS · CR · <b>🇨🇷</b>
            </div>
          </Link>

          <nav className="nav-links">
            <a href="#mercado">MERCADO</a>
            <a href="#tiendas">TIENDAS</a>
            <a href="#planes">PLANES</a>
            <a href="#">VENDER</a>
          </nav>

          <div className="nav-cta">
            <Link to="/login" className="btn">ENTRAR</Link>
            <Link to="/register" className="btn btn-yellow">REGISTRARSE →</Link>
          </div>

          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            aria-label="menú"
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <a href="#mercado" onClick={close}>MERCADO</a>
        <a href="#tiendas" onClick={close}>TIENDAS</a>
        <a href="#planes"  onClick={close}>PLANES</a>
        <a href="#"        onClick={close}>VENDER</a>
        <div className="mobile-cta">
          <Link to="/login"    className="btn"           onClick={close}>ENTRAR</Link>
          <Link to="/register" className="btn btn-yellow" onClick={close}>REGISTRARSE →</Link>
        </div>
      </div>
    </>
  )
}
