import { useEffect, useRef, useState } from 'react';
import imageCroissant from '../assets/croissant.jpg';
import imageKitchenCooking from '../assets/kitchen-cooking.jpg';
import imagePisangGoreng from '../assets/pisang-goreng.jpg';
import {
  PISANG_VARIANTS,
  type OrderItemKey,
  type PisangVariantId,
  type TrayQuantities,
} from './orderTypes';

interface HeroSectionProps {
  quantities: TrayQuantities;
  onAdjustQuantity: (item: OrderItemKey, delta: number) => void;
}

const HeroSection = ({ quantities, onAdjustQuantity }: HeroSectionProps) => {
  const [selectedPisangId, setSelectedPisangId] =
    useState<PisangVariantId>('pisang_kecil');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('mousedown', handlePointerDown);
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, [isDropdownOpen]);

  const activePisang =
    PISANG_VARIANTS.find((v) => v.id === selectedPisangId) ?? PISANG_VARIANTS[0];
  const activePisangQty = quantities[selectedPisangId] || 0;

  return (
    <section id="home" className="hero-rack">
      <div className="hero-manifesto-pane">
        <img
          src={imageKitchenCooking}
          alt=""
          aria-hidden="true"
          className="manifesto-bg-photo"
        />
        <div className="manifesto-top">
          <h1>
            Puff <em>&amp;</em> Fry.
          </h1>
          <p className="hero-lead">
            Dua hal sederhana yang dibuat dengan serius di Jakarta. Satu
            berlapis mentega dari oven pagi, satu lagi paket Pisang Goreng
            Frozen siap goreng yang renyah dan manis hangat.
          </p>
        </div>
      </div>

      <article className="parchment-slot" aria-label="Slot Butter Croissant">
        <div className="slot-photo-frame slot-photo-croissant">
          <img
            src={imageCroissant}
            alt="Butter Croissant hangat berlapis"
            className="slot-photo"
          />
          <span className="stamp-price slot-corner-price tabular-nums">
            18K
          </span>
          <span className="photo-temp-tag tabular-nums">
            27 LAPIS · FRENCH BUTTER
          </span>
        </div>

        <div className="slot-body">
          <h2>Butter Croissant</h2>
          <p className="slot-desc">
            Berlapis renyah di luar, berongga lembut dan harum mentega di
            dalam. Dipanggang segar setiap pagi.
          </p>

          <div className="slot-option-box slot-option-static">
            <span className="option-box-label">PILIHAN PORSI</span>
            <div className="option-static-row">
              <strong>Satuan · Fresh Oven Pagi</strong>
              <em className="tabular-nums">Rp18.000 / pcs</em>
            </div>
          </div>

          <div className="slot-controls">
            <button
              type="button"
              className={`tactile-add-btn ${
                quantities.croissant > 0 ? 'is-inverted' : ''
              }`}
              onClick={() => onAdjustQuantity('croissant', 1)}
            >
              <span>
                {quantities.croissant > 0
                  ? `Di Loyang: ${quantities.croissant} pcs`
                  : '+ Masukkan ke Loyang'}
              </span>
              <span className="tabular-nums">+18K</span>
            </button>

            {quantities.croissant > 0 && (
              <div className="qty-stepper" aria-label="Atur jumlah Croissant">
                <button
                  type="button"
                  onClick={() => onAdjustQuantity('croissant', -1)}
                  aria-label="Kurangi Butter Croissant"
                >
                  −
                </button>
                <span className="tabular-nums">{quantities.croissant}</span>
                <button
                  type="button"
                  onClick={() => onAdjustQuantity('croissant', 1)}
                  aria-label="Tambah Butter Croissant"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      <article className="parchment-slot" aria-label="Slot Pisang Goreng Frozen">
        <div className="slot-photo-frame slot-photo-pisang">
          <img
            src={imagePisangGoreng}
            alt="Pisang Goreng Frozen"
            className="slot-photo"
          />
          <span className="stamp-price stamp-alt slot-corner-price tabular-nums">
            {activePisang.priceK}K
          </span>
          <span className="photo-temp-tag tabular-nums">
            7 PILIHAN PAKET · 40K – 75K
          </span>
        </div>

        <div className="slot-body">
          <h2>Pisang Goreng Frozen</h2>
          <p className="slot-desc">
            Pisang matang pilihan berbalut adonan renyah yang dibekukan
            higienis, praktis digoreng hangat kapan saja.
          </p>

          <div
            className="slot-option-box hero-variant-picker"
            ref={dropdownWrapperRef}
          >
            <span className="option-box-label">PILIH UKURAN PAKET</span>
            <button
              type="button"
              className={`custom-dropdown-trigger ${
                isDropdownOpen ? 'is-open' : ''
              }`}
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen((open) => !open)}
            >
              <span className="trigger-label">
                <strong>{activePisang.name}</strong>
                <em className="tabular-nums">{activePisang.priceDisplay}</em>
              </span>
              <svg
                className="icon-svg dropdown-chevron"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                className="custom-dropdown-menu"
                role="listbox"
                aria-label="Daftar Paket Pisang Goreng Frozen"
              >
                {PISANG_VARIANTS.map((variant) => {
                  const qty = quantities[variant.id] || 0;
                  const isCurrent = variant.id === selectedPisangId;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      role="option"
                      aria-selected={isCurrent}
                      className={`custom-dropdown-item ${
                        isCurrent ? 'is-selected' : ''
                      }`}
                      onClick={() => {
                        setSelectedPisangId(variant.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="item-title">
                        {variant.name}
                        {qty > 0 && (
                          <small className="item-qty-badge tabular-nums">
                            {qty} di loyang
                          </small>
                        )}
                      </span>
                      <strong className="tabular-nums">
                        {variant.priceDisplay}
                      </strong>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="slot-controls">
            <button
              type="button"
              className={`tactile-add-btn ${
                activePisangQty > 0 ? 'is-inverted' : ''
              }`}
              onClick={() => onAdjustQuantity(selectedPisangId, 1)}
            >
              <span>
                {activePisangQty > 0
                  ? `${activePisang.shortLabel}: ${activePisangQty} pkt`
                  : `+ Tambah ${activePisang.shortLabel}`}
              </span>
              <span className="tabular-nums">+{activePisang.priceK}K</span>
            </button>

            {activePisangQty > 0 && (
              <div
                className="qty-stepper"
                aria-label={`Atur jumlah ${activePisang.name}`}
              >
                <button
                  type="button"
                  onClick={() => onAdjustQuantity(selectedPisangId, -1)}
                  aria-label={`Kurangi ${activePisang.name}`}
                >
                  −
                </button>
                <span className="tabular-nums">{activePisangQty}</span>
                <button
                  type="button"
                  onClick={() => onAdjustQuantity(selectedPisangId, 1)}
                  aria-label={`Tambah ${activePisang.name}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
