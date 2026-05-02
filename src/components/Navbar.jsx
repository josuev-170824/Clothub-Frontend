import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function close() { setOpen(false) }

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <div className="brand">
            <div className="brand-stamp">CLOTHUB</div>
            <div className="brand-sub">
              EST. 2026{'\n'}SAN CARLOS · CR · <b>🇨🇷</b>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#mercado">MERCADO</a>
            <a href="#tiendas">TIENDAS</a>
            <a href="#planes">PLANES</a>
            <a href="#">VENDER</a>
          </nav>

          <div className="nav-cta">
            <button className="btn">ENTRAR</button>
            <button className="btn btn-yellow">ABRIR MI TIENDA →</button>
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
          <button className="btn"          onClick={close}>ENTRAR</button>
          <button className="btn btn-yellow" onClick={close}>ABRIR MI TIENDA →</button>
        </div>
      </div>
    </>
  )
}
