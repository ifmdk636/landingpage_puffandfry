---
name: Puff & Fry
description: Enamel Tin & Gingham Bake-Rack design system for Puff & Fry Jakarta
colors:
  enamel-cobalt: "#1b3b73"
  enamel-rim: "#0f254a"
  enamel-milk: "#f7f2e7"
  enamel-cream: "#fffdf8"
  stamp-red: "#d9381e"
  stamp-red-dark: "#b32812"
  crust-amber: "#d88c27"
  led-amber: "#ffb000"
  led-red: "#ff3b2f"
  ink-charcoal: "#161412"
  ink-cocoa: "#453c35"
  cobalt-tint: "#2d4d85"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(3.25rem, 5.2vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.1rem, 3.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Chivo Mono, monospace"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.03em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "18px"
  tray: "26px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "36px"
  xl: "84px"
components:
  button-primary:
    backgroundColor: "{colors.stamp-red}"
    textColor: "{colors.enamel-cream}"
    rounded: "{rounded.md}"
    padding: "15px 18px"
  button-primary-hover:
    backgroundColor: "{colors.stamp-red-dark}"
  button-tactile:
    backgroundColor: "{colors.enamel-milk}"
    textColor: "{colors.ink-charcoal}"
    rounded: "{rounded.md}"
    padding: "13px 16px"
  button-tactile-active:
    backgroundColor: "{colors.ink-charcoal}"
    textColor: "{colors.enamel-cream}"
---

# Design System: Puff & Fry

## Overview

**Creative North Star: "Enamel Tin & Gingham Bake-Rack"**

Puff & Fry menerjemahkan suasana dapur panggangan pagi di Jakarta ke dalam satu objek fisik utuh: loyang enamel berpinggiran biru kobalt (`#1b3b73`) yang dialasi kertas roti kotak-kotak (*gingham*) tempat dua spesialis camilan hangat—*Butter Croissant* dan *Pisang Goreng*—disajikan berdampingan. Alih-alih menggunakan layout hero split generik atau kartu e-commerce yang dingin, seluruh halaman bekerja sebagai nampan interaktif tempat pengunjung langsung merakit porsi loyang dan mengirim slip pesanan ke WhatsApp.

Sistem ini memadukan kehangatan tekstur artisanal dengan ketegasan instrumen dapur: garis sobekan tiket putus-putus (*perforated tear-lines*), cap harga miring seperti stempel basah, papan indikator jam panggangan bergaya 7-segmen, dan tombol taktil yang berinversi penuh saat ditekan.

**Key Characteristics:**
- Bingkai loyang enamel satu halaman penuh dengan pinggiran kobalt pekat dan bidang kertas susu hangat.
- Alas pola *gingham* diagonal tipis pada area pamer utama untuk membedakan slot produk dari bagian naratif.
- Penggabungan dua menu utama secara setara (View A: Butter Croissant & View B: Pisang Goreng) langsung di layar pertama.
- Slip nota interaktif dengan garis perforasi (`2px dashed`) yang langsung memformat pesan WhatsApp otomatis.

## Colors

Palet warna berakar pada material loyang enamel panggangan, kertas roti *unbleached*, tinta stempel merah, dan indikator lampu oven pagi hari.

### Primary
- **Enamel Cobalt** (`#1b3b73`): Warna struktural utama untuk latar luar halaman, garis tepi loyang, judul utama, dan status pilihan aktif.
- **Enamel Rim** (`#0f254a`): Biru malam pekat untuk bibir luar bingkai loyang dan aksen kontras terdalam.

### Secondary
- **Stamp Vermilion** (`#d9381e`): Aksen utama untuk cap harga, penekanan kata kunci pada judul, dan tombol konversi utama ke WhatsApp.
- **Stamp Vermilion Dark** (`#b32812`): Warna kondisi `:hover` pada tombol konversi utama.

### Tertiary
- **LED Batch Amber** (`#ffb000`): Digunakan khusus pada indikator angka jam batch panggangan pagi dan label suhu di atas latar gelap.
- **Crust Golden Amber** (`#d88c27`): Aksen pendukung yang merepresentasikan kulit croissant dan kerenyahan pisang goreng.

### Neutral
- **Enamel Milk** (`#f7f2e7`): Bidang dasar bagian dalam loyang dan permukaan kertas roti.
- **Enamel Cream** (`#fffdf8`): Permukaan kartu slot produk, header, dan slip nota pesanan.
- **Oven Charcoal** (`#161412`): Warna tinta teks utama, latar indikator LED, dan warna inversi tombol taktil.
- **Warm Cocoa** (`#453c35`): Warna teks deskripsi sekunder di atas permukaan terang (rasio kontras >7:1).

### Named Rules
**The Enamel Rim Rule.** Setiap kontainer utama dibatasi oleh garis tegas (`2px solid #1b3b73`) atau garis perforasi (`2px dashed #1b3b73`), tidak pernah mengambang dengan bayangan abu-abu kabur tanpa tepi.

**The Warm Ground Rule.** Jangan pernah menggunakan putih murni (`#ffffff`) atau abu-abu dingin sebagai latar permukaan; selalu gunakan *Enamel Milk* (`#f7f2e7`) atau *Enamel Cream* (`#fffdf8`).

## Typography

**Display Font:** Bricolage Grotesque (dengan fallback sans-serif)
**Body Font:** Work Sans (dengan fallback sans-serif)
**Label/Mono Font:** Chivo Mono (monospace dengan `tabular-nums`)

**Character:** *Bricolage Grotesque* memberikan karakter ekspresif, padat, dan hangat khas papan toko roti modern, sedangkan *Chivo Mono* menjaga presisi angka harga, waktu panggangan, dan kalkulasi slip nota.

### Hierarchy
- **Display** (800, `clamp(3.25rem, 5.2vw, 4.75rem)`, line-height `0.95`): Judul utama di layar pertama.
- **Headline** (800, `clamp(2.1rem, 3.6vw, 3.5rem)`, line-height `0.98`): Judul tiap bagian utama.
- **Title** (800, `28px`, line-height `1.15`): Nama produk di dalam slot kertas roti dan lembar inspeksi.
- **Body** (400, `16px`, line-height `1.62`): Paragraf penjelasan produk dengan lebar baca optimal `60–65ch`.
- **Label** (700, `12px`, letter-spacing `0.03em`): Penanda spesifikasi batch, harga, dan kode slot.

### Named Rules
**The Tabular Price Rule.** Seluruh harga (`18K`, `15K`), jam panggangan (`07:00 WIB`), suhu (`200°C`), dan perhitungan kuantitas wajib menggunakan `Chivo Mono` dengan `font-variant-numeric: tabular-nums`.

**The Self-Sufficient Heading Rule.** Judul bagian berdiri sendiri dengan bobot visualnya tanpa tambahan *eyebrow* atau *kicker* kecil di atasnya.

## Layout

Seluruh antarmuka dibungkus di dalam `.enamel-world` (`padding: 20px`) dan `.enamel-tray-frame` (`max-width: 1380px`) yang membentuk siluet loyang enamel.
- **First Viewport (`.hero-rack`):** Grid 3 kolom asimetris (`1.08fr 1fr 1fr`) yang menyatukan panel manifesto + slip tiket di kiri dan dua slot kertas roti interaktif di kanan.
- **Craft Anatomy (`.craft-anatomy-section`):** Grid 2 kolom (`0.85fr 1.15fr`) yang menyandingkan filosofi dapur dengan jadwal kronologis panggangan pagi.
- **Responsive Breakpoints:** Pada `≤1080px`, panel manifesto mengambil lebar penuh di atas dua slot produk berdampingan; pada `≤760px`, seluruh grid bertumpuk menjadi 1 kolom vertikal yang rapi.

## Elevation & Depth

Kedalaman dibangun melalui perpaduan bingkai berlapis (*inset enamel rim*) dan bayangan lembut berwarna biru tua yang memiliki offset vertikal jelas.

### Shadow Vocabulary
- **Tray Frame Shadow** (`inset 0 0 0 3px #fffdf8, 0 24px 48px rgba(9, 22, 46, 0.42)`): Memberikan efek bibir loyang enamel tiga dimensi terhadap latar kobalt.
- **Parchment Slot Lift** (`0 14px 30px rgba(27, 59, 115, 0.11)`): Mengangkat kartu slot kertas roti dari alas gingham.
- **Primary Button Glow** (`0 8px 20px rgba(217, 56, 30, 0.25)`): Memberikan penekanan hangat pada tombol aksi utama.

## Shapes

Bahasa bentuk menggabungkan sudut melengkung khas loyang logam (`26px` pada bingkai utama, `18px` pada kartu kertas roti, `10px` pada tombol) dengan garis potong putus-putus (`2px dashed #1b3b73`) yang menandakan area slip pesanan yang dapat disobek. Cap harga (`stamp-price`) dimiringkan sedikit (`rotate(-3deg)` dan `rotate(2.5deg)`) untuk menghadirkan kesan stempel tangan.

## Components

### Buttons
- **Shape:** Sudut tegas namun ramah (`10px` radius) dengan garis tepi `2px solid`.
- **Primary (`.button-enamel-primary`):** Latar `#d9381e`, teks `#fffdf8`, padding `15px 18px`, dengan ikon SVG panah diagonal.
- **Tactile Slot Button (`.tactile-add-btn`):** Latar `#f7f2e7` dengan teks `#161412`; berinversi penuh menjadi latar `#161412` dan teks `#fffdf8` saat `:hover` atau ketika item sudah masuk ke loyang (`.is-inverted`).

### Cards / Containers (`.parchment-slot`)
- **Corner Style:** `18px` radius.
- **Background:** `#fffdf8` di atas bidang gingham.
- **Border:** `2px solid #1b3b73` dengan header internal berbatas `2px dashed #1b3b73`.
- **Internal Padding:** `20px`.

### Inputs / Fields
- **Style:** Border `2px solid #fffdf8` di atas latar `#0f254a`, radius `10px`, padding `14px 16px`, teks `#fffdf8`.
- **Focus:** `outline: 2px dashed #d9381e` dengan `outline-offset: 4px`.

### Navigation (`.site-header`)
- **Style:** Sticky bar di bagian atas loyang (`min-height: 78px`, latar `#fffdf8`, border bawah `2px solid #1b3b73`), memuat identitas brand, indikator LED Batch Pagi, tautan bagian, dan tombol ringkasan *Tray Loyang*.

### Interactive Bake-Rack Slip (`.dispatch-receipt`)
- **Description:** Komponen slip nota pesanan tempat pengguna mengatur kuantitas *Butter Croissant* dan *Pisang Goreng* dengan kalkulasi harga otomatis yang langsung terhubung ke tautan pesan WhatsApp.

## Do's and Don'ts

### Do:
- **Do** tampilkan kedua produk utama (*Butter Croissant* dan *Pisang Goreng*) secara berdampingan dan setara sejak layar pertama.
- **Do** gunakan `Chivo Mono` dengan `tabular-nums` pada setiap harga, kuantitas, suhu, dan jam batch.
- **Do** gunakan garis putus-putus (`2px dashed #1b3b73`) untuk memisahkan bagian tiket atau nota pesanan.

### Don't:
- **Don't** menambahkan teks *kicker* atau *eyebrow* kecil di atas judul `h1` atau `h2`.
- **Don't** menggunakan karakter emoji atau simbol Unicode sebagai pengganti ikon; gunakan SVG dengan ketebalan garis yang konsisten.
- **Don't** mengaburkan fokus spesialis dua produk dengan menambahkan katalog menu fiktif yang tidak ada di dapur.
