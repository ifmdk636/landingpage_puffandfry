import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: 'Rak Loyang', href: '#home' },
    { label: 'Anatomi Dapur', href: '#about' },
    { label: 'Form Pesanan', href: '#order' },
  ];

  return (
    <header className="site-header">
      <div className="header-left">
        <a className="brand" href="#home" aria-label="Puff & Fry beranda">
          <span className="brand-stamp">P&amp;F</span>
          <span className="brand-title">
            Puff <em>&amp;</em> Fry
          </span>
        </a>
      </div>

      <nav
        className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Navigasi utama"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
};

export default Header;
