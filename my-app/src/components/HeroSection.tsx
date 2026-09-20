import { useEffect, useState } from "react";
import imageCroissant from "../assets/croissant.jpg";
import imagePisangGoreng from "../assets/pisang-goreng.jpg";

const slides = [
  { image: imageCroissant, alt: "Croissant hangat", label: "Butter croissant" },
  {
    image: imagePisangGoreng,
    alt: "Pisang goreng hangat",
    label: "Pisang goreng",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const showSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-copy">
        <p className="hero-kicker">Puff & Fry · Jakarta</p>
        <h1>
          Puff &<br />
          <i>Fry.</i>
        </h1>
        <p className="hero-description">
          Dua hal sederhana yang dibuat dengan serius. Renyah, hangat, dan
          paling enak dinikmati hari ini.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#menu">
            Jelajahi menu <span>↗</span>
          </a>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-image-frame">
          <img
            className="hero-image-slide"
            src={slides[activeSlide].image}
            alt={slides[activeSlide].alt}
          />
          <div className="hero-slide-label">{slides[activeSlide].label}</div>
          <div className="hero-slider-controls">
            <button
              type="button"
              onClick={() => showSlide(-1)}
              aria-label="Gambar sebelumnya"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => showSlide(1)}
              aria-label="Gambar berikutnya"
            >
              →
            </button>
          </div>
          <div className="hero-slide-dots" aria-label="Pilih gambar">
            {slides.map((slide, index) => (
              <button
                type="button"
                className={index === activeSlide ? "is-active" : ""}
                onClick={() => setActiveSlide(index)}
                aria-label={`Tampilkan ${slide.label}`}
                key={slide.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
