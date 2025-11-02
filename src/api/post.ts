import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types";

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성
  const post = await createPost(content);

  // 포스트 생성 및 이미지 업로드 과정에서 성공 또는 실패시에 따른 예외 처리
  try {
    // 1-1. 이미지가 없으면 포스트 생성 종료
    if (images.length === 0) return post;

    // 2. 이미지 업로드
    const imageUrls = await Promise.all(
      images.map((image) => {
        // 이미지 파일 확장자 추출 (ex. "image.png" -> "png")
        const fileExtension = image.name.split(".").pop() || "webp";

        // 이미지 파일 이름 생성
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

        // 이미지 파일 경로 생성
        const filePath = `${userId}/${post.id}/${fileName}`;
        // 이미지 업로드
        return uploadImage({ file: image, filePath });
      }),
    );

    // 3. 포스트 테이블 업데이트
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    // 실패 시, 포스트 삭제
    await deletePost(post.id);
    throw error;
  }
}

// post 테이블 내에 모든 데이터가 바뀔 필요가 없으니, partial 타입을 사용하며, 추가로 id값은 필수로 받아야하므로 & 연산자 사용
export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
