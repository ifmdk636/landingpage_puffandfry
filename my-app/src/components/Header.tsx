import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { label: 'Beranda', href: '#home' },
    { label: 'Cerita Kami', href: '#about' },
    { label: 'Menu', href: '#menu' },
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Puff & Fry beranda">
        <span className="brand-mark">P<span>&</span>F</span>
        <span className="brand-name">Puff <em>&</em> Fry</span>
      </a>

      <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Navigasi utama">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="nav-order" href="#order" onClick={() => setIsMenuOpen(false)}>
          Pesan sekarang <span>↗</span>
        </a>
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
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
