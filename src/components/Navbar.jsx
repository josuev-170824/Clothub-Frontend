export default function Navbar() {
  return (
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
      </div>
    </header>
  )
}
