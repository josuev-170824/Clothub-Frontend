import { useState } from 'react'

const TRENDING = ['CARHARTT', 'DICKIES 874', 'BAND TEES', 'DOC MARTENS', 'CARGO PANTS', 'VINTAGE 90s']

const MARQUEE_TEXT = (
  <span>
    ★ ENVÍOS A TODO COSTA RICA
    <i> · </i>
    +12,400 PRENDAS NUEVAS ESTA SEMANA
    <i> · </i>
    THRIFT · STREETWEAR · VINTAGE · DESIGNER
    <i> · </i>
    ABRÍ TU TIENDA GRATIS
  </span>
)

export default function Hero() {
  const [query, setQuery] = useState('')

  return (
    <>
      {/* Marquee ticker */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {MARQUEE_TEXT}
          {MARQUEE_TEXT}
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="wrap hero-grid">
          <div>
            <div className="stamp">// MARKETPLACE Nº 01 · COSTA RICA</div>
            <h1 className="hero-title">
              LA ROPA QUE<br />
              <span className="yellow">BUSCÁS,</span> AL<br />
              <span className="underline">PRECIO QUE</span> <span className="red">QUERÉS.</span>
            </h1>

            <div className="search">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                placeholder="buscá hoodies, jeans, camisas, kicks..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button className="search-btn">BUSCAR →</button>
            </div>

            <div className="search-tags">
              <span className="lbl">TRENDING:</span>
              {TRENDING.map((t, i) => (
                <button
                  key={t}
                  className={`tag${i === 0 ? ' hot' : ''}`}
                  onClick={() => setQuery(t.toLowerCase())}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="hero-meta">
              <div><b>8.2K</b> VENDEDORES</div>
              <div><b>230K</b> PRENDAS</div>
              <div><b>4.9★</b> RATING</div>
            </div>
          </div>

          <div className="hero-side">
            <div className="torn-note">
              TODO LO QUE NECESITÁS,<br />
              usado, barato y con estilo.
              <b>VENDÉ TU CLOSET ←</b>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
