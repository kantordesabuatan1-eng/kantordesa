import { getSettings } from "@/lib/content";

export default function WhatsAppButton() {
  const s = getSettings();
  if (!s.nomor_wa_pengaduan) return null;

  const pesan = encodeURIComponent(
    "Halo Admin Desa, saya ingin menyampaikan pengaduan/informasi terkait pelayanan desa."
  );
  const href = `https://wa.me/${s.nomor_wa_pengaduan}?text=${pesan}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi Admin Desa via WhatsApp untuk pengaduan"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 md:bottom-6 md:right-6"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.91 6.478L4 29l7.72-1.874A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818c-1.98 0-3.826-.54-5.412-1.478l-.388-.23-4.58 1.112 1.132-4.462-.253-.406A9.77 9.77 0 0 1 5.2 15c0-5.964 4.84-10.818 10.804-10.818S26.808 9.036 26.808 15 21.968 24.818 16.004 24.818Zm5.94-8.104c-.325-.163-1.92-.947-2.218-1.056-.297-.108-.514-.163-.73.163-.216.325-.838 1.056-1.028 1.273-.19.216-.379.244-.703.081-.325-.163-1.372-.505-2.613-1.611-.966-.861-1.618-1.925-1.808-2.25-.19-.325-.02-.5.143-.663.146-.146.325-.379.487-.569.163-.19.216-.325.325-.542.108-.216.054-.407-.027-.569-.081-.163-.73-1.758-1-2.408-.263-.633-.53-.548-.73-.558l-.622-.011c-.216 0-.568.081-.865.407-.297.325-1.135 1.11-1.135 2.706 0 1.596 1.162 3.138 1.324 3.354.163.216 2.287 3.49 5.542 4.895.774.334 1.378.534 1.849.684.777.247 1.484.212 2.043.129.623-.093 1.92-.785 2.19-1.543.27-.759.27-1.408.19-1.543-.081-.136-.297-.217-.622-.38Z" />
      </svg>
    </a>
  );
}
