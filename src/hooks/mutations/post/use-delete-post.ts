import { deleteImageInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 포스트 삭제 시, 이미지가 있으면 스토리지에 저장된 이미지 삭제
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImageInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 포스트 삭제 시, 포스트 목록 캐시 무효화 (invalidateQueries -> resetQueries 로 변경 이유: 무한 스크롤 시 데이터 손실 방지)
      queryClient.resetQueries({ queryKey: QUERY_KEYS.post.list });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
