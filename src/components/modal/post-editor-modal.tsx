import { ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState } from "react";

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCloseModal = () => {
    close();
  };

  // 내용 변경 시 텍스트 영역 높이 자동 조절
  // 초기에는 auto로 설정하고, 내용이 변경되면 scrollHeight를 사용하여 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  // 모달 열릴 때 텍스트 영역에 포커스
  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus();

    setContent("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button variant="outline" className="cursor-pointer">
          <ImageIcon />
          이미지 추가
        </Button>
        <Button className="cursor-pointer">저장</Button>
      </DialogContent>
    </Dialog>
  );
}
