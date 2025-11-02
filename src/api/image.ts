import { BUCKET_NAME } from "@/lib/constants";
import supabase from "@/lib/supabase";

// 이미지 업로드 함수
// supabase storage에 이미지 업로드하고, 업로드된 이미지의 public URL 반환
export async function uploadImage({
  file,
  filePath,
}: {
  file: File;
  filePath: string;
}) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}
