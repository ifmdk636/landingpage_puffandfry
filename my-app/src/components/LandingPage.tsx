import Header from './Header';
import HeroSection from './HeroSection';

const products = [
  {
    name: 'Butter Croissant',
    note: 'Butter, flaky, dibuat pagi hari',
    price: '18K',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  },
  {
    name: 'Pisang Goreng',
    note: 'Renyah, manis, dan hangat',
    price: '15K',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Banana_fritters.jpg',
  },
];

const LandingPage = () => (
  <div className="page-shell">
    <Header />
    <main>
      <HeroSection />

      <section id="about" className="about-strip">
        <p className="eyebrow"><span /> Cara kami bikin</p>
        <h2>Simple, tapi<br /><i>niat.</i></h2>
        <p className="about-text">Bahan yang pas, proses yang nggak buru-buru, lalu disajikan hangat. Sesederhana itu cara kami bikin camilan yang ingin kamu ulang lagi.</p>
        <div className="feature-list">
          <div><span>01</span><strong>Fresh dari pagi</strong></div>
          <div><span>02</span><strong>Renyahnya pas</strong></div>
          <div><span>03</span><strong>Best enjoyed warm</strong></div>
        </div>
      </section>

      <section id="menu" className="menu-section">
        <div className="section-heading">
          <p className="menu-kicker">Menu hari ini</p>
          <a className="text-link" href="#order">Pesan via WhatsApp <span>↗</span></a>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image" style={{ backgroundImage: `url("${product.image}")` }}>
                <a className="product-order" href="#order">Pesan <span>↗</span></a>
              </div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.note}</p></div><strong>{product.price}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section id="order" className="order-banner">
        <div><h2>Pesan favoritmu,<br /><i>kapan saja.</i></h2></div>
        <a className="button button-light" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">Order via WhatsApp <span>↗</span></a>
      </section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">P<span>&</span>F</span><span className="brand-name">Puff <em>&</em> Fry</span></a><p>Made warm, shared happy.</p><small>© 2024 Puff & Fry</small></footer>
  </div>
);

export default LandingPage;
