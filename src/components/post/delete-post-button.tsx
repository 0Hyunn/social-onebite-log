import { useOpenAlertModal } from "@/store/alert-modal";
import { Button } from "../ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    // 포스트 삭제 성공 시, 포스트 상세 페이지에서 삭제된 경우 메인 페이지로 이동
    onSuccess: () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith(`/post/${id}`)) {
        navigate("/", { replace: true });
      }
    },
    onError: (error) => {
      toast.error("포스트 삭제에 실패했습니다.", { position: "top-center" });
    },
  });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "정말 포스트를 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      },
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleDeleteClick}
      disabled={isDeletePostPending}
    >
      삭제
    </Button>
  );
}
