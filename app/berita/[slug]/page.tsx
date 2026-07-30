import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getCollection, getItem, markdownToHtml } from "@/lib/content";

export function generateStaticParams() {
  return getCollection("berita").map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getItem("berita", params.slug);
  return { title: item?.data.judul || "Berita" };
}

export default async function BeritaDetail({ params }: { params: { slug: string } }) {
  const item = getItem("berita", params.slug);
  if (!item) notFound();

  const html = await markdownToHtml(item.content);

  return (
    <Container className="py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-gabah-dark">
        {item.data.kategori} ·{" "}
        {new Date(item.data.tanggal).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="mt-2 font-display text-4xl text-sawah">{item.data.judul}</h1>

      {item.data.gambar_sampul && (
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-2xl bg-sawah/10 md:h-96">
          <Image
            src={item.data.gambar_sampul}
            alt={item.data.judul}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article
        className="prose-desa mt-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Container>
  );
}