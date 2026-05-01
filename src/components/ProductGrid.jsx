import { useState } from 'react'

const PRODUCTS = [
  { name: 'HOODIE OVERSIZE GRAFITTI',  price: '₡8,500',  store: 'thrift_thrash', size: 'L',   rating: '4.9', stamp: 'NUEVO',   stampClass: '',       col: '#a85d3a' },
  { name: 'DICKIES 874 NEGROS',        price: '₡12,000', store: 'calle_lobby',   size: '32',  rating: '5.0', stamp: 'VINTAGE', stampClass: 'yellow', col: '#3a3a3a' },
  { name: 'BAND TEE METALLICA 95',     price: '₡22,000', store: 'vinyl.cr',      size: 'M',   rating: '4.8', stamp: 'RARE',    stampClass: '',       col: '#1a1a1a' },
  { name: 'CHAQUETA BOMBER MILITAR',   price: '₡18,500', store: 'surplus_co',    size: 'M',   rating: '4.7', stamp: '-30%',    stampClass: 'yellow', col: '#5d6b3a' },
  { name: 'DOC MARTENS 1460',          price: '₡35,000', store: 'sole_society',  size: '42',  rating: '4.9', stamp: 'DROP',    stampClass: '',       col: '#2a1a1a' },
  { name: 'JEANS LEVIS 501 90s',       price: '₡14,000', store: 'denim_dept',    size: '30',  rating: '4.8', stamp: '',        stampClass: '',       col: '#5a73a8' },
  { name: 'CAMISA HAWAIANA RAYÓN',     price: '₡9,500',  store: 'thrift_thrash', size: 'L',   rating: '4.6', stamp: 'VERANO',  stampClass: 'yellow', col: '#c47a4a' },
  { name: 'GORRA TRUCKER LOGOS',       price: '₡5,500',  store: 'calle_lobby',   size: 'OS',  rating: '5.0', stamp: '',        stampClass: 'bone',   col: '#7a3a3a' },
  { name: 'CARHARTT WIP DETROIT',      price: '₡28,000', store: 'work_wear_cr',  size: 'M',   rating: '5.0', stamp: 'GRAIL',   stampClass: '',       col: '#8a6a3a' },
  { name: 'FALDA TARTÁN 90s',          price: '₡7,500',  store: 'riot_grrrl',    size: 'S',   rating: '4.7', stamp: '',        stampClass: '',       col: '#6a3a3a' },
  { name: 'CARGO PANTS Y2K',           price: '₡11,000', store: 'y2k.shop',      size: '28',  rating: '4.9', stamp: 'HOT',     stampClass: '',       col: '#3a4a3a' },
  { name: 'DR. MARTENS JADON',         price: '₡42,000', store: 'sole_society',  size: '39',  rating: '4.8', stamp: 'NUEVO',   stampClass: '',       col: '#1a1a1a' },
]

const FILTERS = ['TODO', 'HOMBRE', 'MUJER', 'UNISEX', 'CALZADO', 'ACCESORIOS']

export default function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState('TODO')
  const [favorites, setFavorites] = useState(new Set())

  function toggleFav(i) {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <section id="mercado" className="market paper grain">
      <div className="wrap">
        <div className="sec-bar">
          <div>
            <h2 className="sec-title">RECIÉN LISTADO</h2>
            <div className="sec-sub">// LO QUE SE ACABA DE SUBIR · ACTUALIZADO HACE 2 MIN</div>
          </div>
          <div className="filter-row">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`chip${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          {PRODUCTS.map((p, i) => (
            <article key={i} className="card">
              <div className="card-img">
                {p.stamp && (
                  <span className={`card-stamp${p.stampClass ? ' ' + p.stampClass : ''}`}>
                    {p.stamp}
                  </span>
                )}
                <button
                  className={`card-fav${favorites.has(i) ? ' active' : ''}`}
                  aria-label="favorito"
                  onClick={() => toggleFav(i)}
                >
                  {favorites.has(i) ? '♥' : '♡'}
                </button>
                <div className="ph-img" style={{ '--col': p.col }}>
                  [ producto ]
                </div>
                <span className="card-tag-size">TALLA {p.size}</span>
                <span className="price-card">{p.price}</span>
              </div>
              <div className="card-body">
                <div className="card-name">{p.name}</div>
                <div className="card-store">
                  <span className="store">
                    <span className="dot" />
                    @{p.store}
                  </span>
                  <span className="card-rating">★ {p.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="market-foot">
          <button
            className="btn"
            style={{ borderColor: 'var(--ink)', color: 'var(--ink)', fontSize: '22px', padding: '16px 28px' }}
          >
            VER LAS 12,400 PRENDAS →
          </button>
        </div>
      </div>
    </section>
  )
}
