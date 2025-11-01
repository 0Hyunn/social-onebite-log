import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  //비밀번호 변경 훅
  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("비밀번호가 변경되었습니다.", { position: "top-center" });
        Navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });

        setPassword("");
      },
    });

  //비밀번호 변경 버튼 클릭 시 요청 함수
  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;

    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">
          새로운 비밀번호를 입력하세요
        </div>
      </div>
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="py-6"
        placeholder="password"
        type="password"
        disabled={isUpdatePasswordPending}
      />
      <Button
        className="w-full"
        onClick={handleUpdatePasswordClick}
        disabled={isUpdatePasswordPending}
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
