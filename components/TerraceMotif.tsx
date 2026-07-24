type Props = {
  className?: string;
  flip?: boolean;
};

/**
 * Motif garis kontur terasering sawah — elemen visual khas yang dipakai
 * berulang sebagai pembatas antar-seksi, pengganti divider generik.
 */
export default function TerraceMotif({ className = "", flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 1200 120"
      className={`w-full h-auto ${flip ? "rotate-180" : ""} ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,100 C150,60 250,110 400,80 C550,50 650,100 800,70 C950,40 1050,90 1200,60 L1200,120 L0,120 Z"
        fill="#1F4D3A"
        opacity="0.9"
      />
      <path
        d="M0,105 C150,75 250,115 400,95 C550,70 650,110 800,90 C950,60 1050,100 1200,80 L1200,120 L0,120 Z"
        fill="#3B7357"
        opacity="0.6"
      />
      <path
        d="M0,112 C150,95 250,118 400,108 C550,90 650,115 800,105 C950,85 1050,112 1200,100 L1200,120 L0,120 Z"
        fill="#C9962C"
        opacity="0.35"
      />
    </svg>
  );
}
