import { useOpenCreatePostModal } from "@/store/post-editor-modal";
import { PlusCircleIcon } from "lucide-react";

export default function CreatePostButton() {
  const openCreatePostModal = useOpenCreatePostModal();

  return (
    <div
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
      onClick={openCreatePostModal}
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <PlusCircleIcon className="size-5" />
      </div>
    </div>
  );
}
