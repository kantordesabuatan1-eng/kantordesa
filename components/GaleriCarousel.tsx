"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentItem } from "@/lib/content";

export default function GaleriCarousel({ items }: { items: ContentItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (items.length === 0) {
    return <p className="mt-12 text-muted">Belum ada foto di galeri.</p>;
  }

  return (
    <div className="relative mt-12">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.slug}
            className="relative aspect-[4/3] w-[80%] shrink-0 snap-center overflow-hidden rounded-2xl bg-sawah/10 sm:w-[45%] lg:w-[31%]"
          >
            {item.data.gambar && (
              <Image
                src={item.data.gambar}
                alt={item.data.judul}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 31vw"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sawah-dark/80 to-transparent p-4">
              <p className="text-sm text-paper">{item.data.judul}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        aria-label="Geser ke kiri"
        className="absolute -left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-sawah/20 bg-paper p-2 shadow-md transition hover:bg-sawah/10 sm:flex"
      >
        <ChevronLeft className="h-5 w-5 text-sawah" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Geser ke kanan"
        className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-sawah/20 bg-paper p-2 shadow-md transition hover:bg-sawah/10 sm:flex"
      >
        <ChevronRight className="h-5 w-5 text-sawah" />
      </button>
    </div>
  );
}