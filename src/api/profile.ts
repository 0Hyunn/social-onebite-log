import supabase from "@/lib/supabase";
import { getRandomNickname } from "@/lib/utils";
import { deleteImageInPath, uploadImage } from "./image";

// userId를 기반으로 프로필 정보를 조회하는 비동기 함수
export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function createProfile(userId: string) {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      id: userId,
      nickname: getRandomNickname(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile({
  userId,
  nickname,
  bio,
  avatarImageFile,
}: {
  userId: string;
  nickname: string;
  bio: string;
  avatarImageFile?: File;
}) {
  // 1. 기존 아바타 이미지 삭제
  if (avatarImageFile) {
    await deleteImageInPath(`${userId}/avatar`);
  }

  // 2. 새로운 아바타 이미지 업로드

  let newAvatarImageUrl;

  if (avatarImageFile) {
    // 이미지 파일 확장자 추출 (ex. "image.png" -> "png")
    const fileExtension = avatarImageFile.name.split(".").pop() || "webp";
    const filePath = `${userId}/avatar.${new Date().getTime()}-${crypto.randomUUID()}.${fileExtension}`;

    newAvatarImageUrl = await uploadImage({
      file: avatarImageFile,
      filePath,
    });
  }

  // 3. 프로필 테이블
  const { data, error } = await supabase
    .from("profile")
    .update({
      nickname,
      bio,
      avatar_url: newAvatarImageUrl,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
