import Container from "./Container";
import TerraceMotif from "./TerraceMotif";
import { getSettings } from "@/lib/content";

export default function Footer() {
  const s = getSettings();

  return (
    <footer className="mt-24 bg-sawah-dark text-paper">
      <TerraceMotif flip />
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">{s.nama_desa}</p>
          <p className="mt-2 text-sm text-paper/70">{s.tagline}</p>
        </div>
        <div className="text-sm text-paper/80">
          <p className="mb-2 font-body font-semibold uppercase tracking-wide text-paper/50">
            Kantor Desa
          </p>
          <p>{s.alamat_kantor}</p>
          <p className="mt-1">{s.jam_layanan}</p>
        </div>
        <div className="text-sm text-paper/80">
          <p className="mb-2 font-body font-semibold uppercase tracking-wide text-paper/50">
            Kontak
          </p>
          <p>{s.telepon}</p>
          <p className="mt-1">{s.email}</p>
        </div>
      </Container>

      {s.maps_embed_url && (
        <Container className="pb-14">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-paper/50">
            Lokasi Kantor Desa
          </p>
          <div className="overflow-hidden rounded-2xl border border-paper/10">
            <iframe
              src={s.maps_embed_url}
              width="100%"
              height="280"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Kantor Desa"
            />
          </div>
        </Container>
      )}

      <Container className="border-t border-paper/10 py-6 text-xs text-paper/50">
        © {new Date().getFullYear()} {s.nama_desa}. Situs resmi pemerintah desa.
      </Container>
    </footer>
  );
}
