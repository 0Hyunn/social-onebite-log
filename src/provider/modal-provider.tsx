import PostEditorModal from "@/components/modal/post-editor-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

// 모달 프로바이더
export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
