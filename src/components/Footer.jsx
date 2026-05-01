export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="brand">
              <div className="brand-stamp" style={{ fontSize: '28px' }}>CLOTHUB</div>
            </div>
            <p>
              El marketplace de ropa de segunda mano de Costa Rica.
              Hecho en San Carlos, para todo el país.
              Vendé, comprá, recicláte la pinta.
            </p>
          </div>

          <div className="foot-cols">
            <div className="foot-col">
              <h5>MERCADO</h5>
              <ul>
                <li><a href="#">Comprar</a></li>
                <li><a href="#">Tiendas</a></li>
                <li><a href="#">Trending</a></li>
                <li><a href="#">Drops</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>VENDER</h5>
              <ul>
                <li><a href="#">Abrir tienda</a></li>
                <li><a href="#">Planes</a></li>
                <li><a href="#">Vender mi closet</a></li>
                <li><a href="#">Para marcas</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>SOPORTE</h5>
              <ul>
                <li><a href="#">Centro de ayuda</a></li>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="foot-bot">
          <span>© 2026 CLOTHUB CR · TODOS LOS DERECHOS RESERVADOS</span>
          <span>HECHO EN SAN CARLOS · CR 🇨🇷</span>
        </div>
      </div>
    </footer>
  )
}
