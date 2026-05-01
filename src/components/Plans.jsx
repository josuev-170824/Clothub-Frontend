const FREE_FEATURES = [
  { text: 'Hasta 30 prendas activas',  on: true  },
  { text: 'Pagos por SINPE directo',   on: true  },
  { text: 'Envíos integrados',         on: true  },
  { text: 'Perfil verificado',         on: true  },
  { text: 'Inventario ilimitado',      on: false },
  { text: 'Analytics avanzado',        on: false },
  { text: 'Boost en búsquedas',        on: false },
  { text: 'Tienda con dominio propio', on: false },
]

const PRO_FEATURES = [
  { text: <>Inventario <b>ILIMITADO</b></> },
  { text: 'Analytics completo (vistas, conversiones, cohortes)' },
  { text: 'Boost: 4× más visibilidad en búsquedas' },
  { text: 'Tienda en clothub.cr/tu-marca' },
  { text: 'Carga en lote (CSV + 50 fotos a la vez)' },
  { text: 'Soporte prioritario por WhatsApp' },
  { text: 'Sin comisiones por transacción' },
  { text: 'Insignia "TIENDA VERIFICADA"' },
]

export default function Plans() {
  return (
    <section id="planes" className="plans-sec">
      <div className="wrap">
        <div className="sec-bar">
          <div>
            <h2 className="sec-title">ABRÍ TU TIENDA</h2>
            <div className="sec-sub">// EMPEZÁ GRATIS · SUBÍ A PREMIUM CUANDO VENDÁS MÁS</div>
          </div>
        </div>

        <div className="plans-grid">
          {/* Plan Gratuito */}
          <div className="plan">
            <div className="plan-stamp yellow">$0 SIEMPRE</div>
            <div className="plan-name">GRATUITO</div>
            <div className="plan-tag">// PARA EMPEZAR A VENDER</div>
            <div className="plan-price">
              <span className="amt">₡0</span>
              <span className="per">/ para siempre</span>
            </div>
            <p className="plan-sub">
              Lo que necesitás para vender tu closet o arrancar tu thrift en Clothub.
            </p>
            <ul className="feat">
              {FREE_FEATURES.map((f, i) => (
                <li key={i} className={f.on ? '' : 'off'}>
                  <span className="ck">{f.on ? '✓' : '×'}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <div className="plan-cta">
              <button className="btn btn-dark">ABRIR TIENDA GRATIS →</button>
            </div>
          </div>

          {/* Plan Premium */}
          <div className="plan pro">
            <div className="plan-stamp">+ POPULAR</div>
            <div className="plan-name" style={{ color: 'var(--yellow)' }}>PREMIUM</div>
            <div className="plan-tag">// PARA TIENDAS QUE MUEVEN</div>
            <div className="plan-price">
              <span className="amt">$17</span>
              <span className="per">/ MES · USD</span>
            </div>
            <p className="plan-sub">
              Todo lo del Gratuito + las herramientas para escalar tu thrift como negocio.
            </p>
            <ul className="feat">
              {PRO_FEATURES.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <div className="plan-cta">
              <button className="btn">PROBAR 14 DÍAS GRATIS →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
