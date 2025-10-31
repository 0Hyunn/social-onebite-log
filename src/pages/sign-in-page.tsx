import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutations/use-sign-in-with-oauth";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일 로그인 요청 훅
  const { mutate: signInWithPassword } = useSignInWithPassword({
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
      setPassword("");
    },
  });

  // OAuth 로그인 요청 훅
  const { mutate: signInWithOAuth } = useSignInWithOAuth();

  // 이메일 로그인 버튼 클릭 시 요청 함수
  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  // GitHub 로그인 버튼 클릭 시 요청 함수
  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        {/* 이메일 입력 */}
        <Input
          className="py-6"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 비밀번호 입력 */}
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* 로그인 버튼 */}
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSignInWithPasswordClick}>
          로그인
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={handleSignInWithGitHubClick}
        >
          <img src={gitHubLogo} className="h-4 w-4" />
          Github 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link
          className="text-muted-foreground text-sm hover:underline"
          to="/sign-up"
        >
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
