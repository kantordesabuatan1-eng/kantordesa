import { MetadataRoute } from "next";
import { getCollection } from "@/lib/content";

const BASE_URL = "https://kantordesa.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/profil-desa",
    "/struktur-organisasi",
    "/berita",
    "/layanan",
    "/potensi",
    "/galeri",
    "/kontak",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const berita = getCollection("berita").map((item) => ({
    url: `${BASE_URL}/berita/${item.slug}`,
    lastModified: new Date(item.data.tanggal || Date.now()),
  }));

  const layanan = getCollection("layanan").map((item) => ({
    url: `${BASE_URL}/layanan/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...berita, ...layanan];
}
