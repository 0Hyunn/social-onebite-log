import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

// FEED에서 호출된건지, 상세페이지(DETAIL)에서 호출된건지 구분
export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () =>
      fetchPostById({
        postId,
        userId: session!.user.id,
      }),
    enabled: type === "FEED" ? false : true,
  });
}
