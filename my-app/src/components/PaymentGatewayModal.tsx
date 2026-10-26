import { useEffect, useState } from 'react';
import { PISANG_VARIANTS, type TrayQuantities } from './orderTypes';

export interface CustomerDetails {
  fullName: string;
  whatsappNumber: string;
  address: string;
  note: string;
}

interface PaymentGatewayModalProps {
  isOpen: boolean;
  orderId: string;
  quantities: TrayQuantities;
  totalPriceK: number;
  customer: CustomerDetails;
  selectedPackageName: string | null;
  merchantWhatsApp: string;
  onClose: () => void;
  onResetOrder: () => void;
}

const BSI_ACCOUNT = {
  bankName: 'Bank Syariah Indonesia (BSI)',
  number: '1313624055',
  holder: 'Ibrahim Faris',
};

const PaymentGatewayModal = ({
  isOpen,
  orderId,
  quantities,
  totalPriceK,
  customer,
  selectedPackageName,
  merchantWhatsApp,
  onClose,
  onResetOrder,
}: PaymentGatewayModalProps) => {
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [paidAt, setPaidAt] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedPisangItems = PISANG_VARIANTS.filter(
    (v) => (quantities[v.id] || 0) > 0,
  );

  const handleSimulatePay = () => {
    setStep('processing');
    window.setTimeout(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const formattedDate = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      setPaidAt(`${formattedDate}, ${formattedTime} WIB`);
      setStep('success');
    }, 650);
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(BSI_ACCOUNT.number);
    setCopiedAccount(true);
    window.setTimeout(() => setCopiedAccount(false), 2000);
  };

  const buildOrderSummaryLabel = () => {
    const itemParts: string[] = [];
    if (quantities.croissant > 0) {
      itemParts.push(`${quantities.croissant}x Butter Croissant`);
    }
    selectedPisangItems.forEach((variant) => {
      const qty = quantities[variant.id];
      itemParts.push(`${qty}x Pisang Goreng Frozen (${variant.name})`);
    });
    const itemsText = itemParts.join(' + ');
    if (selectedPackageName) {
      return `${selectedPackageName} (${itemsText})`;
    }
    return itemsText;
  };

  const buildWhatsAppConfirmationUrl = () => {
    const orderLabel = buildOrderSummaryLabel();
    const lines = [
      `Halo, aku udah mesen ${orderLabel} dengan Order ID ${orderId}.`,
      '',
      'Detail Pesanan & Pengiriman:',
      `- Status Pembayaran: LUNAS (Transfer BSI ${BSI_ACCOUNT.number} a.n. ${BSI_ACCOUNT.holder})`,
      `- Total Bayar: Rp ${totalPriceK}.000`,
      `- Nama: ${customer.fullName}`,
      `- No. WhatsApp: ${customer.whatsappNumber}`,
      `- Alamat: ${customer.address}`,
    ];
    if (customer.note.trim()) {
      lines.push(`- Catatan: ${customer.note.trim()}`);
    }
    return `https://wa.me/${merchantWhatsApp}?text=${encodeURIComponent(
      lines.join('\n'),
    )}`;
  };

  return (
    <div
      className="pg-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pg-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pg-modal-card">
        {step !== 'success' ? (
          <>
            <header className="pg-modal-header">
              <div className="pg-header-brand">
                <span className="pg-badge-gate">P&amp;F PAY GATEWAY</span>
                <h3 id="pg-modal-title">Ringkasan Transaksi</h3>
              </div>
              <button
                type="button"
                className="pg-close-btn"
                onClick={onClose}
                aria-label="Tutup jendela pembayaran"
              >
                <svg className="icon-svg" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="pg-amount-banner">
              <div>
                <span className="pg-banner-label">ORDER ID OTOMATIS</span>
                <strong className="pg-order-id tabular-nums">{orderId}</strong>
              </div>
              <div className="pg-banner-right">
                <span className="pg-banner-label">TOTAL TAGIHAN</span>
                <strong className="pg-total-amount tabular-nums">
                  Rp {totalPriceK}.000
                </strong>
              </div>
            </div>

            <div className="pg-modal-body">
              <div className="pg-mini-summary">
                <span className="pg-summary-title">Rincian Item:</span>
                <span className="pg-summary-items tabular-nums">
                  {buildOrderSummaryLabel()}
                </span>
              </div>

              <div className="pg-va-panel">
                <div className="va-number-box">
                  <div>
                    <span className="va-label">
                      Nomor Rekening Tujuan · {BSI_ACCOUNT.bankName}
                    </span>
                    <strong className="va-digits tabular-nums">
                      {BSI_ACCOUNT.number}
                    </strong>
                    <small className="va-holder">
                      a.n. {BSI_ACCOUNT.holder}
                    </small>
                  </div>
                  <button
                    type="button"
                    className="va-copy-btn"
                    onClick={handleCopyAccount}
                  >
                    {copiedAccount ? 'Tersalin' : 'Salin No. Rek'}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="pg-simulate-pay-btn"
                disabled={step === 'processing'}
                onClick={handleSimulatePay}
              >
                {step === 'processing' ? (
                  <span>Memverifikasi Pembayaran...</span>
                ) : (
                  <>
                    <span>Bayar Sekarang (Simulasi)</span>
                    <strong className="tabular-nums">Rp {totalPriceK}.000</strong>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="pg-receipt-view">
            <div className="receipt-status-top">
              <div className="receipt-check-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="status-badge-lunas tabular-nums">
                STATUS PESANAN: LUNAS
              </span>
              <h3 id="pg-modal-title">Pesanan Berhasil Dibuat!</h3>
              <p>
                Terima kasih, <strong>{customer.fullName}</strong>. Pesananmu sudah
                tercatat di dapur Puff &amp; Fry.
              </p>
            </div>

            <div className="receipt-paper-box">
              <div className="receipt-meta-row">
                <div>
                  <span>ORDER ID</span>
                  <strong className="tabular-nums">{orderId}</strong>
                </div>
                <div>
                  <span>METODE BAYAR</span>
                  <strong>Transfer BSI</strong>
                </div>
                <div>
                  <span>WAKTU LUNAS</span>
                  <strong className="tabular-nums">{paidAt}</strong>
                </div>
              </div>

              <div className="receipt-section-block">
                <h4>Ringkasan Pesanan</h4>
                {quantities.croissant > 0 && (
                  <div className="receipt-item-line tabular-nums">
                    <span>{quantities.croissant}x Butter Croissant</span>
                    <strong>Rp {quantities.croissant * 18}.000</strong>
                  </div>
                )}
                {selectedPisangItems.map((variant) => {
                  const qty = quantities[variant.id];
                  return (
                    <div
                      className="receipt-item-line tabular-nums"
                      key={variant.id}
                    >
                      <span>
                        {qty}x Pisang Goreng Frozen — {variant.name}
                      </span>
                      <strong>Rp {qty * variant.priceK}.000</strong>
                    </div>
                  );
                })}
                <div className="receipt-total-paid tabular-nums">
                  <span>Total Dibayar</span>
                  <strong>Rp {totalPriceK}.000</strong>
                </div>
              </div>

              <div className="receipt-section-block">
                <h4>Data Pengiriman Pembeli</h4>
                <dl className="receipt-buyer-grid">
                  <div>
                    <dt>Nama Penerima</dt>
                    <dd>{customer.fullName}</dd>
                  </div>
                  <div>
                    <dt>No. WhatsApp</dt>
                    <dd className="tabular-nums">{customer.whatsappNumber}</dd>
                  </div>
                  <div className="buyer-full-row">
                    <dt>Alamat Lengkap</dt>
                    <dd>{customer.address}</dd>
                  </div>
                  {customer.note.trim() && (
                    <div className="buyer-full-row">
                      <dt>Catatan</dt>
                      <dd>{customer.note}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <div className="receipt-actions">
              <a
                className="pg-wa-confirm-btn"
                href={buildWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noreferrer"
              >
                <span>Konfirmasi via WhatsApp</span>
                <svg className="icon-svg" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 15L15 5M15 5H7.5M15 5V12.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <button
                type="button"
                className="pg-done-btn"
                onClick={() => {
                  onResetOrder();
                  onClose();
                }}
              >
                Selesai &amp; Buat Pesanan Baru
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGatewayModal;
