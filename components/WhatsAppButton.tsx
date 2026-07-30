import { getSettings } from "@/lib/content";
import PengaduanModal from "./PengaduanModal";

export default function WhatsAppButton() {
  const s = getSettings();
  if (!s.nomor_wa_pengaduan) return null;

  return (
    <PengaduanModal
      nomorWa={s.nomor_wa_pengaduan}
      cloudName={s.cloudinary_cloud_name}
      uploadPreset={s.cloudinary_upload_preset}
    />
  );
}