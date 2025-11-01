import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

// 포스트 작성 모달 스토어
const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

// 포스트 작성 모달 여는 함수 내보내기
export const useOpenPostEditorModal = () => {
  const open = usePostEditorModalStore((store) => store.actions.open);

  return open;
};

// 포스트 작성 모달 상태 조회 함수 내보내기
export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorModalStore();

  return { isOpen, open, close };
};
