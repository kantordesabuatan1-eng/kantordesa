import type { Metadata } from "next";
import Container from "@/components/Container";
import { getSingleton, markdownToHtml } from "@/lib/content";

export const metadata: Metadata = { title: "Profil Desa" };

export default async function ProfilDesa() {
  const profil = getSingleton("profil.md");
  const html = await markdownToHtml(profil?.content || "");

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">Profil</p>
      <h1 className="mt-2 font-display text-4xl text-sawah">
        {profil?.data.judul_halaman || "Profil Desa"}
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-sawah/15 bg-surface p-6">
          <h2 className="font-display text-xl text-sawah">Visi</h2>
          <p className="mt-2 text-ink/80">{profil?.data.visi}</p>
        </div>
        <div className="rounded-2xl border border-sawah/15 bg-surface p-6">
          <h2 className="font-display text-xl text-sawah">Misi</h2>
          <ul className="mt-2 list-disc pl-5 text-ink/80">
            {(profil?.data.misi || []).map((m: string, i: number) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      <article
        className="prose-desa mt-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Container>
  );
}