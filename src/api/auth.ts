import supabase from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

// supabase에 회원가입 요청하는 함수
export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// supabase에 로그인 요청하는 함수
export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// supabase에 OAuth 로그인 요청하는 함수 (현재는 GitHub만 연결)
export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) throw error;

  return data;
}
