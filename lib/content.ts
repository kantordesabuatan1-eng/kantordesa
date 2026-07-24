import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Frontmatter = Record<string, any>;

export interface ContentItem {
  slug: string;
  data: Frontmatter;
  content: string;
}

function dirPath(collection: string) {
  return path.join(CONTENT_DIR, collection);
}

/** Ambil semua item dalam satu koleksi (folder), misal "berita", "struktur", dst. */
export function getCollection(collection: string): ContentItem[] {
  const dir = dirPath(collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

/** Ambil satu item berdasarkan slug */
export function getItem(collection: string, slug: string): ContentItem | null {
  const filePath = path.join(dirPath(collection), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, data, content };
}

/** Ambil satu file konfigurasi tunggal, misal content/profil.md */
export function getSingleton(fileRelativePath: string): ContentItem | null {
  const filePath = path.join(CONTENT_DIR, fileRelativePath);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug: fileRelativePath, data, content };
}

/** Ubah markdown body jadi HTML aman untuk dirender */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown || "");
  return result.toString();
}

/** Baca file pengaturan umum (content/settings/umum.yml) */
export function getSettings(): Frontmatter {
  const filePath = path.join(CONTENT_DIR, "settings", "umum.yml");
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf-8");
  return (yaml.load(raw) as Frontmatter) || {};
}

/** Urutkan koleksi berdasarkan field tanggal (terbaru dulu) */
export function sortByDateDesc(items: ContentItem[], field = "tanggal") {
  return [...items].sort((a, b) => {
    const da = new Date(a.data[field] || 0).getTime();
    const db = new Date(b.data[field] || 0).getTime();
    return db - da;
  });
}

/** Urutkan berdasarkan field angka "urutan" (untuk struktur organisasi) */
export function sortByOrder(items: ContentItem[], field = "urutan") {
  return [...items].sort((a, b) => (a.data[field] ?? 999) - (b.data[field] ?? 999));
}
