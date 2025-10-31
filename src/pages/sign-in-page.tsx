import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInWithPassword } from "@/hooks/mutations/use-sign-in-with-password";
import { useState } from "react";
import { Link } from "react-router";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword } = useSignInWithPassword();

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
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
      <div>
        <Button className="w-full" onClick={handleSignInWithPasswordClick}>
          로그인
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
