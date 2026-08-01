"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import MobileNav from "./MobileNav";
import { NAV } from "@/lib/nav";
import type { Frontmatter } from "@/lib/content";

export default function HeaderClient({ settings }: { settings: Frontmatter }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-sawah/10 bg-paper/95 shadow-sm backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <Container className="relative flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex items-center gap-2.5">
            {settings.logo ? (
              <span className="relative h-11 w-9 shrink-0 sm:h-12 sm:w-10">
                <Image
                  src={settings.logo}
                  alt={`Logo ${settings.nama_desa || "Desa"}`}
                  fill
                  className="object-contain"
                />
              </span>
            ) : (
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg transition-colors ${
                  scrolled ? "bg-sawah text-paper" : "bg-paper text-sawah"
                }`}
              >
                {settings.nama_desa?.[0] ?? "D"}
              </span>
            )}

            {settings.logo_kedua && (
              <>
                <span
                  className={`h-8 w-px transition-colors ${scrolled ? "bg-sawah/25" : "bg-paper/40"}`}
                  aria-hidden="true"
                />
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-paper/10">
                  <Image
                    src={settings.logo_kedua}
                    alt="Logo kedua"
                    fill
                    className="object-cover"
                  />
                </span>
              </>
            )}
          </span>

          <span
            className={`font-display text-lg leading-tight transition-colors ${
              scrolled ? "text-ink" : "text-paper"
            }`}
          >
            {settings.nama_desa || "Nama Desa"}
            <span
              className={`block font-body text-xs font-normal uppercase tracking-wide transition-colors ${
                scrolled ? "text-muted" : "text-paper/70"
              }`}
            >
              {settings.kecamatan}
            </span>
          </span>
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-sm transition-colors ${
                scrolled ? "text-ink/80 hover:text-sawah" : "text-paper/90 hover:text-paper"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNav dark={!scrolled} />
      </Container>
    </header>
  );
}