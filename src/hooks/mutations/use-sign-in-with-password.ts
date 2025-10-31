import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

// auth.ts에 로그인 요청하는 함수(signInWithPassword)를 호출하는 훅
export function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
