import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

// auth.ts에 회원가입 요청하는 함수(signUp)를 호출하는 훅
export function useSignup() {
  return useMutation({
    mutationFn: signUp,
  });
}
