import type { Database } from "./database.types";

// db의 public 스키마의 tables 중 post 테이블의 row 타입을 정의한다.
export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

// db의 public 스키마의 tables 중 profile 테이블의 row 타입을 정의한다.
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];

// PostEntity와 ProfileEntity를 합친 타입을 정의한다.
export type Post = PostEntity & { author: ProfileEntity; isLiked: boolean };

// 뮤테이션 훅에서 사용할 콜백 타입을 정의한다.
export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
