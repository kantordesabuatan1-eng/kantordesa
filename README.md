# Website Desa — Next.js + Tailwind + Decap CMS

Situs ini dibangun bebas dengan React (Next.js) dan Tailwind CSS, tapi semua konten
(berita, struktur organisasi, layanan, potensi desa, galeri foto) bisa diedit oleh
siapa saja lewat halaman **/admin** — tanpa sentuh kode sama sekali. Semuanya gratis.

## Struktur singkat

```
app/            → halaman-halaman situs (React/Next.js)
components/     → komponen tampilan (Header, Footer, dst.)
content/        → SEMUA isi situs (berita, struktur, layanan, dst.) — inilah yang diedit lewat admin
public/admin/   → halaman & konfigurasi CMS (Decap CMS)
public/images/  → tempat foto tersimpan
```

Setiap folder di `content/` = satu "jenis" konten:
- `content/berita/` — berita & pengumuman
- `content/struktur/` — perangkat desa (struktur organisasi)
- `content/layanan/` — layanan publik / persyaratan surat
- `content/potensi/` — produk UMKM & potensi desa
- `content/galeri/` — foto kegiatan
- `content/profil.md` — halaman profil desa (visi, misi, sejarah)
- `content/settings/umum.yml` — info umum (nama desa, kontak, dsb) yang tampil di header/footer

---

## Langkah 1 — Jalankan di komputer Anda (opsional, untuk cek dulu)

Perlu **Node.js** terpasang (unduh gratis di nodejs.org), lalu:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk lihat situs, dan `http://localhost:3000/admin`
untuk lihat tampilan CMS (login belum berfungsi sebelum di-deploy, lihat Langkah 3).

---

## Langkah 2 — Unggah ke GitHub (gratis)

1. Buat akun di [github.com](https://github.com) kalau belum punya.
2. Buat repository baru (boleh **Private** kalau tidak ingin kode terlihat publik).
3. Unggah seluruh folder project ini ke repository tersebut caranya:
   ```bash
   git init
   git add .
   git commit -m "Website desa awal"
   git branch -M main
   git remote add origin <URL_REPO_ANDA>
   git push -u origin main
   ```
   (Kalau belum familiar dengan Git, GitHub Desktop — aplikasi gratis — punya tombol
   drag-and-drop untuk upload folder tanpa perintah baris.)

---

## Langkah 3 — Deploy ke Netlify (gratis) + aktifkan login admin

Kami pakai **Netlify** (bukan Vercel) khusus untuk hosting, karena Netlify punya fitur
**Identity + Git Gateway** yang membuat login admin (`/admin`) langsung jalan tanpa
perlu bikin aplikasi OAuth sendiri di GitHub — jauh lebih sederhana untuk perangkat
desa yang tidak paham teknis.

1. Daftar gratis di [netlify.com](https://netlify.com) (bisa pakai akun GitHub).
2. Klik **Add new site → Import an existing project**, pilih repository GitHub Anda.
3. Build command `npm run build`, biarkan pengaturan lain default (netlify.toml
   sudah mengatur sisanya) → klik **Deploy**.
4. Setelah situs jadi, buka menu **Site configuration → Identity** → klik **Enable Identity**.
5. Di halaman Identity, buka **Registration** → set ke **Invite only** (supaya tidak
   sembarang orang bisa daftar admin).
6. Buka tab **Services → Git Gateway** → klik **Enable Git Gateway**.
7. Kembali ke tab **Identity → Invite users**, masukkan email perangkat desa yang
   akan mengelola konten. Mereka akan menerima email undangan, klik link-nya, buat
   password, lalu otomatis diarahkan ke halaman `/admin`.

Selesai — mulai sekarang siapa pun yang diundang bisa login ke `namasitus.netlify.app/admin`
dan mengedit berita, foto, struktur organisasi, dll langsung dari browser, tanpa kode.

---

## Cara pakai halaman admin (untuk perangkat desa)

1. Buka `namasitus.netlify.app/admin`, login pakai email & password yang sudah dibuat.
2. Di sisi kiri ada daftar jenis konten: Berita, Struktur Organisasi, Layanan Publik, dst.
3. Klik jenis konten → klik **New [nama konten]** untuk menambah, atau klik salah satu
   item yang ada untuk mengedit.
4. Isi kolom-kolom yang tersedia (judul, tanggal, foto — tinggal klik "Choose an image"
   untuk unggah foto dari HP/komputer).
5. Klik **Publish** di kanan atas. Situs otomatis ter-update dalam 1–2 menit, tanpa
   perlu bantuan siapa pun.

---

## Foto & gambar — update gratis

Secara default, foto yang diunggah lewat admin disimpan otomatis di repository GitHub
Anda (folder `public/images/uploads`) — ini **gratis selamanya**, cocok untuk puluhan
hingga ratusan foto (kegiatan desa, struktur organisasi, produk UMKM, dll).

### Upgrade media ke Cloudinary (opsional, kalau foto sangat banyak)

Kalau suatu saat jumlah foto sangat banyak (ratusan+) dan ingin loading lebih cepat,
Anda bisa memakai [Cloudinary](https://cloudinary.com) — layanan hosting gambar
dengan paket gratis yang sangat besar (25GB penyimpanan, CDN otomatis):

1. Daftar gratis di cloudinary.com, catat **Cloud name** Anda.
2. Di dashboard Cloudinary, buat **Upload preset** baru dengan mode **Unsigned**.
3. Di `public/admin/config.yml`, tambahkan di bagian atas (ganti `media_folder` lama):
   ```yaml
   media_library:
     name: cloudinary
     config:
       cloud_name: "nama-cloud-anda"
       api_key: "api-key-anda"
   ```
4. Commit & push perubahan ini — selesai, admin sekarang unggah gambar ke Cloudinary.

Ini opsional — untuk kebanyakan website desa, cara default (gratis via GitHub) sudah lebih dari cukup.

---

## Domain resmi `.desa.id` (opsional, bisa menyusul)

Situs ini bisa langsung dipakai dengan alamat gratis `namasitus.netlify.app`. Kalau
nanti ingin alamat resmi seperti `sukamakmur.desa.id`:

1. Ajukan domain gratis (tahun pertama) di [domain.go.id](https://domain.go.id) dengan
   dokumen: SK Kepala Desa, surat permohonan dari Sekdes/Kades, surat kuasa pejabat
   pengelola domain.
2. Setelah domain aktif, di Netlify buka **Domain management → Add a domain**,
   masukkan `sukamakmur.desa.id`, lalu ikuti instruksi mengatur DNS yang diberikan.
3. Situs otomatis pakai domain baru, konten & CMS tidak berubah sama sekali.

---

## Tombol WhatsApp pengaduan

Lewat admin: **Pengaturan Umum → Info Desa → Nomor WhatsApp Pengaduan**, isi nomor
WA admin desa dengan format `62` di depan (tanpa `0`, tanpa spasi/strip), contoh:
`6281234567890`. Setelah **Publish**, tombol WhatsApp hijau akan otomatis muncul
mengambang di pojok kanan bawah pada **semua halaman**, dan saat diklik langsung
membuka chat WhatsApp dengan pesan pembuka otomatis. Kalau nomor dikosongkan,
tombolnya tidak ditampilkan sama sekali.

## Mengganti logo desa

Lewat admin: **Pengaturan Umum → Info Desa → Logo Desa**, unggah gambar logo
(disarankan bentuk persegi, misal 200×200px), lalu **Publish**. Logo langsung
muncul di navbar menggantikan lambang huruf otomatis. Kalau kolom logo dikosongkan,
situs otomatis kembali memakai lambang huruf inisial nama desa.

Kalau ingin menampilkan 2 logo sekaligus (misal logo Desa + logo Kabupaten/Pemda),
isi juga field **Logo Kedua** — otomatis tampil di sebelah logo desa, dipisah garis
vertikal "|". Kalau field ini dikosongkan, hanya logo pertama yang tampil.

## Animasi halaman

Situs ini memakai **Framer Motion** (library animasi React, gratis & open-source) untuk:
- Transisi smooth setiap kali berpindah halaman (`components/PageTransition.tsx`)
- Efek "muncul saat di-scroll" pada kartu berita, struktur organisasi, potensi desa, dan galeri (`components/FadeIn.tsx`)

Kalau ingin menambah animasi serupa di halaman lain, tinggal bungkus elemen dengan
`<FadeIn>...</FadeIn>` — tidak perlu mengubah apa pun di admin/CMS, ini murni bagian tampilan.

## Foto latar Beranda

Lewat admin: **Pengaturan Umum → Info Desa → Foto Latar Belakang Beranda**, unggah
foto (misalnya pemandangan desa/sawah), lalu **Publish**. Foto ditampilkan penuh
(hampir tanpa lapisan penutup), dengan panel semi-transparan hanya di belakang teks
judul supaya tetap mudah dibaca, dan motif ombak hijau menyatu langsung di ujung
bawah foto tanpa garis batas. Kalau dikosongkan, Beranda kembali memakai motif garis
polos seperti semula.

## Ikon tab browser (favicon)

Ikon yang muncul di tab browser otomatis memakai **Logo Kedua** kalau diisi (lihat
bagian "Mengganti logo desa" di bawah), atau **Logo Desa** kalau Logo Kedua kosong.
Tidak perlu pengaturan tambahan — cukup isi salah satu logo di admin, favicon
otomatis mengikuti.

## Menyematkan peta lokasi kantor desa di footer

1. Buka [Google Maps](https://maps.google.com), cari lokasi kantor desa Anda.
2. Klik **Bagikan** → tab **Sematkan peta** (Embed a map).
3. Salin hanya bagian URL di dalam `src="..."` dari kode iframe yang muncul
   (contoh: `https://www.google.com/maps/embed?pb=...`).
4. Di admin: **Pengaturan Umum → Info Desa → Link Embed Google Maps**, tempel URL
   tadi, lalu **Publish**. Peta otomatis muncul di footer setiap halaman.

## Mengubah tampilan (opsional, perlu skill React/Tailwind)

- Warna & font: edit `tailwind.config.ts`.
- Layout halaman: file di folder `app/` (misal `app/page.tsx` untuk Beranda).
- Menu navigasi: `components/Header.tsx`.

Struktur data di setiap halaman sengaja dipisah dari kontennya (`content/`), jadi
perubahan desain tidak akan menghapus atau merusak data yang sudah diisi admin.
