"use client";

import { useState } from "react";
import { X, MessageCircle, Loader2, ImagePlus } from "lucide-react";

type Props = {
  nomorWa: string;
  cloudName?: string;
  uploadPreset?: string;
};

const JENIS_PENGADUAN = [
  "Infrastruktur & Jalan",
  "Pelayanan Publik",
  "Sosial & Kemasyarakatan",
  "Lingkungan & Kebersihan",
  "Lainnya",
];

export default function PengaduanModal({ nomorWa, cloudName, uploadPreset }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [jenis, setJenis] = useState(JENIS_PENGADUAN[0]);
  const [keterangan, setKeterangan] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const bisaUploadFoto = Boolean(cloudName && uploadPreset);

  async function uploadFoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset as string);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    if (!res.ok) throw new Error("Upload foto gagal");
    const data = await res.json();
    return data.secure_url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!nama.trim() || !noWa.trim()) {
      setError("Nama dan No. WhatsApp wajib diisi.");
      return;
    }

    // Buka tab kosong SEKARANG JUGA (masih dalam siklus klik pengguna),
    // supaya browser HP tidak menganggapnya pop-up mencurigakan.
    // URL-nya baru diisi setelah upload foto selesai.
    const waWindow = window.open("", "_blank");

    setLoading(true);
    try {
      let fotoUrl = "";
      if (foto && bisaUploadFoto) {
        fotoUrl = await uploadFoto(foto);
      }

      const baris = [
        "Halo Admin Desa, saya ingin menyampaikan pengaduan:",
        "",
        `Nama: ${nama}`,
        `No. WhatsApp: ${noWa}`,
        `Jenis Pengaduan: ${jenis}`,
        `Keterangan: ${keterangan.trim() || "(tidak ada)"}`,
        fotoUrl ? `Foto Pengaduan: ${fotoUrl}` : "Foto Pengaduan: (tidak ada)",
      ];
      const pesan = encodeURIComponent(baris.join("\n"));
      // api.whatsapp.com lebih konsisten langsung buka aplikasi WhatsApp
      // di HP dibanding wa.me, yang kadang menampilkan halaman perantara.
      const url = `https://api.whatsapp.com/send?phone=${nomorWa}&text=${pesan}`;

      if (waWindow) {
        waWindow.location.href = url;
      } else {
        // Kalau tab sempat gagal dibuka (pop-up benar-benar diblokir total),
        // pindah langsung di tab yang sama sebagai jalan terakhir.
        window.location.href = url;
      }

      setNama("");
      setNoWa("");
      setJenis(JENIS_PENGADUAN[0]);
      setKeterangan("");
      setFoto(null);
      setOpen(false);
    } catch {
      waWindow?.close();
      setError("Gagal mengunggah foto. Coba lagi, atau kirim tanpa foto dulu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka form pengaduan via WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 md:bottom-6 md:right-6"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden="true">
          <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.91 6.478L4 29l7.72-1.874A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.98 0-3.826-.54-5.412-1.478l-.388-.23-4.58 1.112 1.132-4.462-.253-.406A9.77 9.77 0 0 1 5.2 15c0-5.964 4.84-10.818 10.804-10.818S26.808 9.036 26.808 15 21.968 24.818 16.004 24.818Zm5.94-8.104c-.325-.163-1.92-.947-2.218-1.056-.297-.108-.514-.163-.73.163-.216.325-.838 1.056-1.028 1.273-.19.216-.379.244-.703.081-.325-.163-1.372-.505-2.613-1.611-.966-.861-1.618-1.925-1.808-2.25-.19-.325-.02-.5.143-.663.146-.146.325-.379.487-.569.163-.19.216-.325.325-.542.108-.216.054-.407-.027-.569-.081-.163-.73-1.758-1-2.408-.263-.633-.53-.548-.73-.558l-.622-.011c-.216 0-.568.081-.865.407-.297.325-1.135 1.11-1.135 2.706 0 1.596 1.162 3.138 1.324 3.354.163.216 2.287 3.49 5.542 4.895.774.334 1.378.534 1.849.684.777.247 1.484.212 2.043.129.623-.093 1.92-.785 2.19-1.543.27-.759.27-1.408.19-1.543-.081-.136-.297-.217-.622-.38Z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-sawah" strokeWidth={1.5} />
                <h2 className="font-display text-xl text-sawah">Form Pengaduan</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="rounded-full p-1.5 text-ink/50 transition hover:bg-sawah/10 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-5 text-sm text-ink/60">
              Isi form ini, pesan Anda akan otomatis terkirim lewat WhatsApp ke admin desa.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-ink/80">Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="w-full rounded-lg border border-sawah/20 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-sawah"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink/80">Nomor WhatsApp</label>
                <input
                  type="tel"
                  value={noWa}
                  onChange={(e) => setNoWa(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full rounded-lg border border-sawah/20 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-sawah"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink/80">Jenis Pengaduan</label>
                <select
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  className="w-full rounded-lg border border-sawah/20 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-sawah"
                >
                  {JENIS_PENGADUAN.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink/80">Keterangan</label>
                <textarea
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  placeholder="Jelaskan detail pengaduan Anda di sini..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-sawah/20 bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-sawah"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink/80">
                  Foto Pengaduan {!bisaUploadFoto && "(belum aktif)"}
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-sawah/30 bg-surface px-3 py-3 text-sm text-ink/60 transition hover:border-sawah/50">
                  <ImagePlus className="h-4 w-4 shrink-0" />
                  <span className="truncate">{foto ? foto.name : "Pilih foto (opsional)"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={!bisaUploadFoto}
                    onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-sawah px-6 py-3 text-sm font-medium text-paper transition hover:bg-sawah-dark disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Mengirim...
                  </>
                ) : (
                  "Kirim ke WhatsApp Desa"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}