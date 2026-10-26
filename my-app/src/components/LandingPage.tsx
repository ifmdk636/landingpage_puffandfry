import { useRef, useState, type FormEvent } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import {
  PISANG_VARIANTS,
  type OrderItemKey,
  type TrayQuantities,
} from './orderTypes';
import PaymentGatewayModal, {
  type CustomerDetails,
} from './PaymentGatewayModal';

const WHATSAPP_NUMBER = '6281234567890';

const initialQuantities: TrayQuantities = {
  croissant: 1,
  pisang_mini: 0,
  pisang_kecil: 1,
  pisang_sedang: 0,
  pisang_besar: 0,
  pisang_jumbo: 0,
  pisang_baby_super: 0,
  pisang_baby_premium: 0,
};

const generateOrderId = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `#INV-${randomDigits}`;
};

type FieldErrorMap = {
  fullName?: string;
  whatsappNumber?: string;
  address?: string;
  note?: string;
};

const validateField = (
  field: keyof CustomerDetails,
  value: string,
): string | undefined => {
  const trimmed = value.trim();

  if (field === 'fullName') {
    if (!trimmed) {
      return 'Nama lengkap wajib diisi.';
    }
    if (trimmed.length < 3) {
      return 'Nama lengkap minimal 3 karakter.';
    }
    if (!/^[a-zA-ZÀ-ÿ\s'.-]+$/.test(trimmed)) {
      return 'Nama lengkap hanya boleh berisi huruf dan spasi (tanpa angka/simbol).';
    }
    return undefined;
  }

  if (field === 'whatsappNumber') {
    if (!trimmed) {
      return 'Nomor WhatsApp wajib diisi.';
    }
    if (!/^[+\d\s-]+$/.test(trimmed)) {
      return 'Nomor WhatsApp hanya boleh berisi angka (0-9).';
    }
    const cleanDigits = trimmed.replace(/[\s-]/g, '');
    if (!/^(?:\+62|62|0)8[1-9][0-9]{7,11}$/.test(cleanDigits)) {
      return 'Format nomor WhatsApp tidak valid. Gunakan 10–14 digit angka (contoh: 081234567890).';
    }
    return undefined;
  }

  if (field === 'address') {
    if (!trimmed) {
      return 'Alamat lengkap pengiriman wajib diisi.';
    }
    if (trimmed.length < 12 || trimmed.split(/\s+/).length < 2) {
      return 'Alamat terlalu singkat. Cantumkan nama jalan, nomor rumah/gedung, atau patokan (min. 12 karakter).';
    }
    return undefined;
  }

  if (field === 'note') {
    if (trimmed.length > 0 && trimmed.length < 3) {
      return 'Catatan pesanan minimal 3 karakter jika diisi (atau kosongkan jika tidak ada).';
    }
    if (trimmed.length > 200) {
      return 'Catatan pesanan maksimal 200 karakter.';
    }
    return undefined;
  }

  return undefined;
};

const LandingPage = () => {
  const [quantities, setQuantities] =
    useState<TrayQuantities>(initialQuantities);
  const [isReceiptPickerOpen, setIsReceiptPickerOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    whatsappNumber: '',
    address: '',
    note: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrorMap>({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof CustomerDetails, boolean>>
  >({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState('#INV-9923');

  const nameInputRef = useRef<HTMLInputElement>(null);
  const waInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);
  const noteInputRef = useRef<HTMLInputElement>(null);

  const handleAdjustQuantity = (item: OrderItemKey, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, (prev[item] || 0) + delta),
    }));
  };

  const totalPisangItems = PISANG_VARIANTS.reduce(
    (sum, v) => sum + (quantities[v.id] || 0),
    0,
  );
  const totalPisangPriceK = PISANG_VARIANTS.reduce(
    (sum, v) => sum + (quantities[v.id] || 0) * v.priceK,
    0,
  );

  const totalItems = quantities.croissant + totalPisangItems;
  const totalPriceK = quantities.croissant * 18 + totalPisangPriceK;

  const activePisangVariants = PISANG_VARIANTS.filter(
    (v) => (quantities[v.id] || 0) > 0,
  );

  const handleCustomerFieldChange = (
    field: keyof CustomerDetails,
    value: string,
  ) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (touchedFields[field] || fieldErrors[field]) {
      const errorMsg = validateField(field, value);
      setFieldErrors((prev) => ({
        ...prev,
        [field]: errorMsg,
      }));
    }
  };

  const handleCustomerFieldBlur = (field: keyof CustomerDetails) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, customer[field]);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: errorMsg,
    }));
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (totalItems === 0) {
      return;
    }

    const nextErrors: FieldErrorMap = {
      fullName: validateField('fullName', customer.fullName),
      whatsappNumber: validateField('whatsappNumber', customer.whatsappNumber),
      address: validateField('address', customer.address),
      note: validateField('note', customer.note),
    };

    setFieldErrors(nextErrors);
    setTouchedFields({
      fullName: true,
      whatsappNumber: true,
      address: true,
      note: true,
    });

    if (nextErrors.fullName) {
      nameInputRef.current?.focus();
      return;
    }

    if (nextErrors.whatsappNumber) {
      waInputRef.current?.focus();
      return;
    }

    if (nextErrors.address) {
      addressInputRef.current?.focus();
      return;
    }

    if (nextErrors.note) {
      noteInputRef.current?.focus();
      return;
    }

    setActiveOrderId(generateOrderId());
    setIsPaymentModalOpen(true);
  };

  const handleResetOrder = () => {
    setQuantities(initialQuantities);
    setCustomer({
      fullName: '',
      whatsappNumber: '',
      address: '',
      note: '',
    });
    setFieldErrors({});
    setTouchedFields({});
  };

  return (
    <div className="enamel-world">
      <div className="enamel-tray-frame">
        <Header />

        <main>
          <HeroSection
            quantities={quantities}
            onAdjustQuantity={handleAdjustQuantity}
          />

          <section id="about" className="craft-anatomy-section">
            <div className="craft-intro">
              <h2>
                Simple, tapi <em>niat.</em>
              </h2>
              <p className="craft-lead">
                Bahan yang pas, proses yang nggak buru-buru, lalu disajikan
                hangat. Kami menolak menu yang melebar ke mana-mana agar dua
                ikon ini selalu keluar dari panggangan dan penggorengan dalam
                kondisi terbaiknya.
              </p>
            </div>

            <div className="baking-sheet-ledger">
              <div className="sheet-row">
                <div className="sheet-time tabular-nums">05:30 WIB</div>
                <div className="sheet-detail">
                  <h3>Lipatan Dingin &amp; Adonan Segar</h3>
                  <p>
                    Laminasi mentega dijaga pada suhu ruang dingin agar setiap
                    lembar adonan mengembang garing sempurna saat menyentuh
                    panas oven.
                  </p>
                </div>
                <div className="sheet-spec tabular-nums">FERMENTASI 18 JAM</div>
              </div>

              <div className="sheet-row">
                <div className="sheet-time tabular-nums">06:45 WIB</div>
                <div className="sheet-detail">
                  <h3>Renyahnya Pas, Siap Goreng Kapan Saja</h3>
                  <p>
                    Pisang matang pilihan dibalut adonan racikan tipis dan
                    dibekukan secara higienis dalam berbagai ukuran paket agar
                    praktis digoreng hangat kapan pun kamu mau.
                  </p>
                </div>
                <div className="sheet-spec tabular-nums">HIGIENIS &amp; PRAKTIS</div>
              </div>

              <div className="sheet-row">
                <div className="sheet-time tabular-nums">07:00 WIB</div>
                <div className="sheet-detail">
                  <h3>Best Enjoyed Warm Hari Ini</h3>
                  <p>
                    Croissant hangat dikemas di atas kertas roti berpori, dan
                    paket Pisang Goreng Frozen dikemas rapat siap kirim ke
                    seluruh area Jakarta.
                  </p>
                </div>
                <div className="sheet-spec tabular-nums">SIAP KIRIM JAKARTA</div>
              </div>
            </div>
          </section>

          {/* Form Pesanan & Pengiriman di Paling Bawah */}
          <section id="order" className="order-dispatch-section">
            <form
              className="dispatch-ticket"
              onSubmit={handleCheckoutSubmit}
              noValidate
            >
              <div className="dispatch-left">
                <h2>
                  Form Pesanan &amp; <em>Pengiriman.</em>
                </h2>
                <p>
                  Pastikan pilihan produk dan paket Pisang Goreng Frozen di nota
                  kanan sudah sesuai, lalu lengkapi data pengiriman di bawah ini
                  untuk lanjut ke pembayaran.
                </p>

                <div className="order-form-grid">
                  <div className="form-field-group">
                    <label htmlFor="buyer-name">Nama Lengkap *</label>
                    <input
                      ref={nameInputRef}
                      id="buyer-name"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={
                        fieldErrors.fullName ? 'error-buyer-name' : undefined
                      }
                      className={fieldErrors.fullName ? 'is-invalid' : ''}
                      placeholder="Contoh: Budi Santoso"
                      value={customer.fullName}
                      onChange={(e) =>
                        handleCustomerFieldChange('fullName', e.target.value)
                      }
                      onBlur={() => handleCustomerFieldBlur('fullName')}
                    />
                    {fieldErrors.fullName && (
                      <span
                        id="error-buyer-name"
                        className="field-error-text"
                        role="alert"
                      >
                        {fieldErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="buyer-wa">
                      Nomor WhatsApp (Kontak Utama) *
                    </label>
                    <input
                      ref={waInputRef}
                      id="buyer-wa"
                      type="tel"
                      inputMode="tel"
                      required
                      aria-invalid={Boolean(fieldErrors.whatsappNumber)}
                      aria-describedby={
                        fieldErrors.whatsappNumber
                          ? 'error-buyer-wa'
                          : undefined
                      }
                      className={fieldErrors.whatsappNumber ? 'is-invalid' : ''}
                      placeholder="Contoh: 081234567890"
                      value={customer.whatsappNumber}
                      onChange={(e) =>
                        handleCustomerFieldChange(
                          'whatsappNumber',
                          e.target.value,
                        )
                      }
                      onBlur={() => handleCustomerFieldBlur('whatsappNumber')}
                    />
                    {fieldErrors.whatsappNumber && (
                      <span
                        id="error-buyer-wa"
                        className="field-error-text"
                        role="alert"
                      >
                        {fieldErrors.whatsappNumber}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group form-field-full">
                    <label htmlFor="buyer-address">Alamat Lengkap *</label>
                    <textarea
                      ref={addressInputRef}
                      id="buyer-address"
                      rows={3}
                      required
                      aria-invalid={Boolean(fieldErrors.address)}
                      aria-describedby={
                        fieldErrors.address ? 'error-buyer-address' : undefined
                      }
                      className={fieldErrors.address ? 'is-invalid' : ''}
                      placeholder="Nama jalan, nomor rumah/gedung, patokan, kecamatan, Jakarta..."
                      value={customer.address}
                      onChange={(e) =>
                        handleCustomerFieldChange('address', e.target.value)
                      }
                      onBlur={() => handleCustomerFieldBlur('address')}
                    />
                    {fieldErrors.address && (
                      <span
                        id="error-buyer-address"
                        className="field-error-text"
                        role="alert"
                      >
                        {fieldErrors.address}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group form-field-full">
                    <label htmlFor="order-note">
                      Catatan Pesanan / Jam Kirim (Opsional)
                    </label>
                    <input
                      ref={noteInputRef}
                      id="order-note"
                      type="text"
                      aria-invalid={Boolean(fieldErrors.note)}
                      aria-describedby={
                        fieldErrors.note ? 'error-order-note' : undefined
                      }
                      className={fieldErrors.note ? 'is-invalid' : ''}
                      placeholder="Contoh: Kirim jam 10 pagi, titip di resepsionis lobi..."
                      value={customer.note}
                      onChange={(e) =>
                        handleCustomerFieldChange('note', e.target.value)
                      }
                      onBlur={() => handleCustomerFieldBlur('note')}
                    />
                    {fieldErrors.note && (
                      <span
                        id="error-order-note"
                        className="field-error-text"
                        role="alert"
                      >
                        {fieldErrors.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="dispatch-receipt">
                <div className="receipt-header">
                  <span>NOTA LOYANG · PUFF &amp; FRY</span>
                  <span className="tabular-nums">BATCH HARI INI</span>
                </div>

                <div className="receipt-items">
                  <div className="receipt-line">
                    <div>
                      <strong>Butter Croissant</strong>
                      <span className="tabular-nums">Rp18.000 / pcs</span>
                    </div>
                    <div className="receipt-stepper">
                      <button
                        type="button"
                        onClick={() => handleAdjustQuantity('croissant', -1)}
                        aria-label="Kurangi Croissant di nota"
                      >
                        −
                      </button>
                      <span className="tabular-nums">{quantities.croissant}</span>
                      <button
                        type="button"
                        onClick={() => handleAdjustQuantity('croissant', 1)}
                        aria-label="Tambah Croissant di nota"
                      >
                        +
                      </button>
                    </div>
                    <strong className="receipt-subtotal tabular-nums">
                      Rp {quantities.croissant * 18}.000
                    </strong>
                  </div>

                  {activePisangVariants.map((variant) => {
                    const qty = quantities[variant.id];
                    return (
                      <div className="receipt-line" key={variant.id}>
                        <div>
                          <strong>Pisang Frozen · {variant.name}</strong>
                          <span className="tabular-nums">
                            {variant.priceDisplay} / paket
                          </span>
                        </div>
                        <div className="receipt-stepper">
                          <button
                            type="button"
                            onClick={() => handleAdjustQuantity(variant.id, -1)}
                            aria-label={`Kurangi ${variant.name} di nota`}
                          >
                            −
                          </button>
                          <span className="tabular-nums">{qty}</span>
                          <button
                            type="button"
                            onClick={() => handleAdjustQuantity(variant.id, 1)}
                            aria-label={`Tambah ${variant.name} di nota`}
                          >
                            +
                          </button>
                        </div>
                        <strong className="receipt-subtotal tabular-nums">
                          Rp {qty * variant.priceK}.000
                        </strong>
                      </div>
                    );
                  })}

                  <div className="receipt-add-pisang-wrap">
                    <button
                      type="button"
                      className="receipt-toggle-picker-btn"
                      aria-expanded={isReceiptPickerOpen}
                      onClick={() => setIsReceiptPickerOpen((open) => !open)}
                    >
                      <span>+ Pilih / Tambah Varian Paket Pisang Frozen</span>
                      <svg
                        className={`icon-svg dropdown-chevron ${
                          isReceiptPickerOpen ? 'is-open' : ''
                        }`}
                        viewBox="0 0 20 20"
                        fill="none"
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

                    {isReceiptPickerOpen && (
                      <div className="receipt-variant-pills">
                        {PISANG_VARIANTS.map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            className="receipt-variant-chip"
                            onClick={() => handleAdjustQuantity(v.id, 1)}
                          >
                            <span>+ {v.name}</span>
                            <strong className="tabular-nums">
                              {v.priceDisplay}
                            </strong>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="receipt-total-row">
                  <span>Total Tagihan ({totalItems} item)</span>
                  <strong className="tabular-nums">
                    Rp {totalItems > 0 ? `${totalPriceK}.000` : '0'}
                  </strong>
                </div>

                <button type="submit" className="dispatch-wa-button">
                  <span>Beli Sekarang / Lanjut Pembayaran</span>
                  <svg
                    className="icon-svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10h12m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <p className="receipt-security-foot">
                  Pembayaran melalui Transfer Rekening Bank Syariah Indonesia
                  (BSI).
                </p>
              </div>
            </form>
          </section>
        </main>

        <footer className="enamel-footer">
          <a className="brand" href="#home">
            <span className="brand-stamp">P&amp;F</span>
            <span className="brand-title">
              Puff <em>&amp;</em> Fry
            </span>
          </a>
          <p>Made warm, shared happy · Dapur Panggangan &amp; Wajan Jakarta.</p>
          <small className="tabular-nums">© 2026 Puff &amp; Fry</small>
        </footer>
      </div>

      <PaymentGatewayModal
        key={activeOrderId}
        isOpen={isPaymentModalOpen}
        orderId={activeOrderId}
        quantities={quantities}
        totalPriceK={totalPriceK}
        customer={customer}
        selectedPackageName={null}
        merchantWhatsApp={WHATSAPP_NUMBER}
        onClose={() => setIsPaymentModalOpen(false)}
        onResetOrder={handleResetOrder}
      />
    </div>
  );
};

export default LandingPage;