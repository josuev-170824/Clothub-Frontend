const STORES = [
  { name: 'THRIFT THRASH', initials: 'TT', logoClass: 'red',    loc: 'San Pedro · SJ',  rating: '4.9', stars: '★★★★★', sales: '1,420', items: '218', verified: true  },
  { name: 'CALLE LOBBY',   initials: 'CL', logoClass: 'yellow', loc: 'Escazú · SJ',     rating: '4.8', stars: '★★★★★', sales: '980',   items: '156', verified: true  },
  { name: 'VINYL.CR',      initials: 'V',  logoClass: 'bone',   loc: 'Curridabat · SJ', rating: '5.0', stars: '★★★★★', sales: '612',   items: '89',  verified: true  },
  { name: 'SURPLUS CO',    initials: 'SC', logoClass: '',        loc: 'Heredia · HE',    rating: '4.7', stars: '★★★★★', sales: '540',   items: '134', verified: false },
  { name: 'DENIM DEPT',    initials: 'DD', logoClass: 'red',    loc: 'Sabana · SJ',     rating: '4.8', stars: '★★★★★', sales: '720',   items: '92',  verified: true  },
  { name: 'SOLE SOCIETY',  initials: 'SS', logoClass: 'yellow', loc: 'Tibás · SJ',      rating: '4.9', stars: '★★★★★', sales: '1,180', items: '203', verified: true  },
  { name: 'WORK WEAR CR',  initials: 'WW', logoClass: 'bone',   loc: 'Cartago · CA',    rating: '4.6', stars: '★★★★☆', sales: '310',   items: '67',  verified: false },
  { name: 'Y2K.SHOP',      initials: 'Y2', logoClass: 'red',    loc: 'Online · CR',     rating: '5.0', stars: '★★★★★', sales: '890',   items: '145', verified: true  },
]

export default function FeaturedStores() {
  return (
    <section id="tiendas" className="stores">
      <div className="wrap">
        <div className="sec-bar">
          <div>
            <h2 className="sec-title">TIENDAS DESTACADAS</h2>
            <div className="sec-sub">// LOS QUE LA ESTÁN ROMPIENDO ESTE MES</div>
          </div>
          <div className="filter-row">
            <button className="chip bone-chip">+1.2K TIENDAS</button>
          </div>
        </div>

        <div className="store-grid">
          {STORES.map((s, i) => (
            <article key={i} className="store-card">
              {s.verified && <span className="verif">✓ VERIFICADA</span>}
              <div className={`store-logo${s.logoClass ? ' ' + s.logoClass : ''}`}>
                {s.initials}
              </div>
              <div className="store-name">{s.name}</div>
              <div className="store-meta">
                {s.loc} <span className="store-stars">{s.stars}</span> {s.rating}
              </div>
              <div className="store-stats">
                <div><b>{s.sales}</b>VENTAS</div>
                <div><b>{s.items}</b>ACTIVAS</div>
                <div><b>{s.rating}</b>RATING</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
